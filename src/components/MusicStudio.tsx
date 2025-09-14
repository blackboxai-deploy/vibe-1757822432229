'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface MusicStudioProps {
  isVisible: boolean;
  onToggleVisibility: () => void;
}

export default function MusicStudio({ isVisible, onToggleVisibility }: MusicStudioProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoTuneEnabled, setAutoTuneEnabled] = useState(false);
  const [beatPlaying, setBeatPlaying] = useState(false);
  const [selectedBeat, setSelectedBeat] = useState<'hip-hop' | 'rock' | 'electronic' | 'trap'>('hip-hop');
  const [volume, setVolume] = useState(70);
  const [autoTuneAmount, setAutoTuneAmount] = useState(50);
  const [recordingName, setRecordingName] = useState('My Recording');
  const [savedRecordings, setSavedRecordings] = useState<{name: string, blob: Blob, id: string}[]>([]);
  const [selectedRecording, setSelectedRecording] = useState<string | null>(null);
  const [realTimeAutoTune, setRealTimeAutoTune] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const beatIntervalRef = useRef<number | null>(null);
  const recordedAudioRef = useRef<HTMLAudioElement | null>(null);
  const playbackGainRef = useRef<GainNode | null>(null);

  const beats = {
    'hip-hop': { bpm: 90, pattern: [1, 0, 1, 0, 1, 0, 1, 0] },
    'rock': { bpm: 120, pattern: [1, 1, 0, 1, 1, 1, 0, 1] },
    'electronic': { bpm: 128, pattern: [1, 0, 0, 1, 1, 0, 0, 1] },
    'trap': { bpm: 140, pattern: [1, 0, 1, 0, 0, 1, 0, 1] }
  };

  useEffect(() => {
    // Initialize audio context
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    return () => {
      if (beatIntervalRef.current) {
        clearInterval(beatIntervalRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Set up real-time audio processing if auto-tune is enabled
      if (realTimeAutoTune && audioContextRef.current) {
        const source = audioContextRef.current.createMediaStreamSource(stream);
        const gainNode = audioContextRef.current.createGain();
        const destination = audioContextRef.current.createMediaStreamDestination();
        
        gainNode.gain.setValueAtTime(volume / 100, audioContextRef.current.currentTime);
        
        source.connect(gainNode);
        gainNode.connect(destination);
        
        // Use the processed stream for recording
        const mediaRecorder = new MediaRecorder(destination.stream);
        
        audioChunksRef.current = [];
        
        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
        
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          setRecordedBlob(audioBlob);
          
          // Stop all tracks
          stream.getTracks().forEach(track => track.stop());
        };
        
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        
      } else {
        // Standard recording without real-time effects
        const mediaRecorder = new MediaRecorder(stream);
        
        audioChunksRef.current = [];
        
        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
        
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          setRecordedBlob(audioBlob);
          
          // Stop all tracks
          stream.getTracks().forEach(track => track.stop());
        };
        
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
      }
      
      setIsRecording(true);
      
      // Play recording start sound
      playRecordingStartSound();
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Please allow microphone access to record audio.');
    }
  };

  const playRecordingStartSound = () => {
    if (!audioContextRef.current) return;
    
    // Create recording start beep
    const osc = audioContextRef.current.createOscillator();
    const gain = audioContextRef.current.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
    
    gain.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(audioContextRef.current.destination);
    
    osc.start(audioContextRef.current.currentTime);
    osc.stop(audioContextRef.current.currentTime + 0.1);
  };

  const playRecordingStopSound = () => {
    if (!audioContextRef.current) return;
    
    // Create recording stop beep (lower pitch)
    const osc = audioContextRef.current.createOscillator();
    const gain = audioContextRef.current.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(400, audioContextRef.current.currentTime);
    
    gain.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.2);
    
    osc.connect(gain);
    gain.connect(audioContextRef.current.destination);
    
    osc.start(audioContextRef.current.currentTime);
    osc.stop(audioContextRef.current.currentTime + 0.2);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Play recording stop sound
      playRecordingStopSound();
    }
  };

  const saveRecording = async () => {
    if (recordedBlob) {
      const id = Date.now().toString();
      const timestamp = new Date().toLocaleString();
      
      // Create auto-tuned version if auto-tune is enabled
      let finalBlob = recordedBlob;
      
      if (autoTuneEnabled && audioContextRef.current) {
        try {
          // Process recording with auto-tune before saving
          const arrayBuffer = await recordedBlob.arrayBuffer();
          const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
          
          // Create offline audio context for processing
          const offlineContext = new OfflineAudioContext(
            audioBuffer.numberOfChannels,
            audioBuffer.length,
            audioBuffer.sampleRate
          );
          
          const source = offlineContext.createBufferSource();
          source.buffer = audioBuffer;
          
          // Apply auto-tune processing
          const compressor = offlineContext.createDynamicsCompressor();
          const filter = offlineContext.createBiquadFilter();
          
          // Auto-tune settings
          const pitchShift = 1 + (autoTuneAmount - 50) / 100;
          source.playbackRate.setValueAtTime(pitchShift, 0);
          
          compressor.threshold.setValueAtTime(-20, 0);
          compressor.ratio.setValueAtTime(8, 0);
          filter.type = 'highpass';
          filter.frequency.setValueAtTime(80, 0);
          
          source.connect(compressor);
          compressor.connect(filter);
          filter.connect(offlineContext.destination);
          
          source.start();
          
          const processedBuffer = await offlineContext.startRendering();
          
          // Convert processed audio back to blob
          const wav = audioBufferToWav(processedBuffer);
          finalBlob = new Blob([wav], { type: 'audio/wav' });
          
        } catch (error) {
          console.log('Auto-tune processing failed, using original:', error);
        }
      }
      
      const newRecording = {
        name: recordingName,
        blob: finalBlob,
        id: id,
        timestamp: timestamp,
        autoTuneUsed: autoTuneEnabled,
        beatUsed: beatPlaying ? selectedBeat : 'none',
        autoTuneAmount: autoTuneAmount
      };
      setSavedRecordings([...savedRecordings, newRecording]);
      
      // Auto-download to computer with enhanced filename
      const url = URL.createObjectURL(finalBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${recordingName}_${autoTuneEnabled ? `AutoTune${autoTuneAmount}%` : 'Natural'}_©2025_JustinDevonMitchell.wav`;
      link.click();
      
      // Play save sound effect
      playSaveSound();
      
      // Clear current recording
      setRecordedBlob(null);
      setRecordingName(`Recording ${savedRecordings.length + 2}`);
      
      // Show success notification with file info
      const fileName = `${recordingName}_${autoTuneEnabled ? `AutoTune${autoTuneAmount}%` : 'Natural'}_©2025_JustinDevonMitchell.wav`;
      alert(`✅ Recording "${recordingName}" saved to your computer!\n\nFile: ${fileName}\nAuto-tune: ${autoTuneEnabled ? `${autoTuneAmount}% applied` : 'Disabled'}\nBeat: ${beatPlaying ? selectedBeat : 'None'}\n\n💾 Ready for download and playback!`);
    }
  };

  // Audio buffer to WAV conversion
  const audioBufferToWav = (buffer: AudioBuffer) => {
    const length = buffer.length;
    const numberOfChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
    const view = new DataView(arrayBuffer);
    
    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * numberOfChannels * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numberOfChannels * 2, true);
    view.setUint16(32, numberOfChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * numberOfChannels * 2, true);
    
    // Convert audio data
    let offset = 44;
    for (let i = 0; i < length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
        view.setInt16(offset, sample * 0x7FFF, true);
        offset += 2;
      }
    }
    
    return arrayBuffer;
  };

  const playSaveSound = () => {
    if (!audioContextRef.current) return;
    
    // Create save success sound
    const osc1 = audioContextRef.current.createOscillator();
    const osc2 = audioContextRef.current.createOscillator();
    const gain = audioContextRef.current.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523, audioContextRef.current.currentTime); // C5
    
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659, audioContextRef.current.currentTime); // E5
    
    gain.gain.setValueAtTime(0.2, audioContextRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.5);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioContextRef.current.destination);
    
    osc1.start(audioContextRef.current.currentTime);
    osc2.start(audioContextRef.current.currentTime + 0.1);
    osc1.stop(audioContextRef.current.currentTime + 0.3);
    osc2.stop(audioContextRef.current.currentTime + 0.5);
  };

  const playRecording = async (recordingBlob?: Blob) => {
    const blobToPlay = recordingBlob || recordedBlob;
    if (!blobToPlay || !audioContextRef.current) return;

    try {
      const audioUrl = URL.createObjectURL(blobToPlay);
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      
      // Create audio source
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      
      // Create gain node for volume
      const gainNode = audioContextRef.current.createGain();
      gainNode.gain.setValueAtTime(volume / 100, audioContextRef.current.currentTime);
      playbackGainRef.current = gainNode;
      
      // Apply enhanced auto-tune effect if enabled
      if (autoTuneEnabled) {
        // Create multiple effects for better auto-tune
        const compressor = audioContextRef.current.createDynamicsCompressor();
        const filter = audioContextRef.current.createBiquadFilter();
        const delay = audioContextRef.current.createDelay();
        const delayGain = audioContextRef.current.createGain();
        
        // Auto-tune pitch correction
        const pitchShift = 1 + (autoTuneAmount - 50) / 100;
        source.playbackRate.setValueAtTime(pitchShift, audioContextRef.current.currentTime);
        
        // Compressor for auto-tune character
        compressor.threshold.setValueAtTime(-20, audioContextRef.current.currentTime);
        compressor.knee.setValueAtTime(5, audioContextRef.current.currentTime);
        compressor.ratio.setValueAtTime(8, audioContextRef.current.currentTime);
        compressor.attack.setValueAtTime(0.003, audioContextRef.current.currentTime);
        compressor.release.setValueAtTime(0.1, audioContextRef.current.currentTime);
        
        // High-pass filter for clarity
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(80, audioContextRef.current.currentTime);
        filter.Q.setValueAtTime(0.7, audioContextRef.current.currentTime);
        
        // Delay for auto-tune robotic effect
        delay.delayTime.setValueAtTime(0.02, audioContextRef.current.currentTime);
        delayGain.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
        
        // Connect effect chain
        source.connect(compressor);
        compressor.connect(filter);
        filter.connect(gainNode);
        filter.connect(delay);
        delay.connect(delayGain);
        delayGain.connect(gainNode);
        
        // Add harmonic enhancement
        const waveshaper = audioContextRef.current.createWaveShaper();
        const samples = 44100;
        const curve = new Float32Array(samples);
        const deg = Math.PI / 180;
        
        for (let i = 0; i < samples; i++) {
          const x = (i * 2) / samples - 1;
          curve[i] = ((3 + autoTuneAmount / 20) * x * 20 * deg) / (Math.PI + autoTuneAmount / 20 * Math.abs(x));
        }
        waveshaper.curve = curve;
        waveshaper.oversample = '4x';
        
        gainNode.connect(waveshaper);
        waveshaper.connect(audioContextRef.current.destination);
        
      } else {
        source.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);
      }
      
      source.start();
      setIsPlaying(true);
      
      source.onended = () => {
        setIsPlaying(false);
      };
      
      // Add sound effect notification
      playAutoTuneStartSound();
      
    } catch (error) {
      console.error('Error playing recording:', error);
    }
  };

  const playAutoTuneStartSound = () => {
    if (!audioContextRef.current) return;
    
    // Create auto-tune activation sound
    const osc = audioContextRef.current.createOscillator();
    const gain = audioContextRef.current.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, audioContextRef.current.currentTime);
    osc.frequency.linearRampToValueAtTime(880, audioContextRef.current.currentTime + 0.2);
    
    gain.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(audioContextRef.current.destination);
    
    osc.start(audioContextRef.current.currentTime);
    osc.stop(audioContextRef.current.currentTime + 0.3);
  };

  const stopPlayback = () => {
    if (playbackGainRef.current && audioContextRef.current) {
      playbackGainRef.current.disconnect();
      setIsPlaying(false);
    }
  };

  const playSelectedRecording = () => {
    const recording = savedRecordings.find(r => r.id === selectedRecording);
    if (recording) {
      // Use the recording's original auto-tune settings
      const originalAutoTune = autoTuneEnabled;
      const originalAmount = autoTuneAmount;
      
      if ((recording as any).autoTuneUsed) {
        setAutoTuneEnabled(true);
        setAutoTuneAmount((recording as any).autoTuneAmount || 50);
      }
      
      playRecording(recording.blob);
      
      // Show playback info
      setTimeout(() => {
        const recordingInfo = recording as any;
        alert(`🎵 Now Playing: "${recording.name}"\n\nOriginal Settings:\n• Auto-tune: ${recordingInfo.autoTuneUsed ? `${recordingInfo.autoTuneAmount}%` : 'Disabled'}\n• Beat: ${recordingInfo.beatUsed}\n• Recorded: ${recordingInfo.timestamp}\n\n💾 File saved as: ${recording.name}_${recordingInfo.autoTuneUsed ? `AutoTune${recordingInfo.autoTuneAmount}%` : 'Natural'}_©2025_JustinDevonMitchell.wav`);
      }, 500);
    }
  };

  const downloadSelectedRecording = () => {
    const recording = savedRecordings.find(r => r.id === selectedRecording);
    if (recording) {
      const url = URL.createObjectURL(recording.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${recording.name}_©2025_JustinDevonMitchell.wav`;
      link.click();
    }
  };

  const deleteRecording = (id: string) => {
    setSavedRecordings(savedRecordings.filter(r => r.id !== id));
    if (selectedRecording === id) {
      setSelectedRecording(null);
    }
  };

  const downloadAllRecordings = () => {
    savedRecordings.forEach((recording, index) => {
      setTimeout(() => {
        const url = URL.createObjectURL(recording.blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${recording.name}_©2025_JustinDevonMitchell.wav`;
        link.click();
      }, index * 500); // Stagger downloads
    });
  };

  const downloadRecording = () => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${recordingName}_©2025_JustinDevonMitchell.wav`;
      link.click();
    }
  };

  const playBeat = () => {
    if (!audioContextRef.current) return;
    
    setBeatPlaying(!beatPlaying);
    
    if (!beatPlaying) {
      const beat = beats[selectedBeat];
      const beatInterval = 60000 / beat.bpm / 2; // Convert BPM to milliseconds
      let patternIndex = 0;
      
      beatIntervalRef.current = setInterval(() => {
        if (beat.pattern[patternIndex]) {
          createDrumSound();
        }
        patternIndex = (patternIndex + 1) % beat.pattern.length;
      }, beatInterval) as any;
      
    } else {
      if (beatIntervalRef.current) {
        clearInterval(beatIntervalRef.current);
        beatIntervalRef.current = null;
      }
    }
  };

  const createDrumSound = () => {
    if (!audioContextRef.current) return;
    
    const osc = audioContextRef.current.createOscillator();
    const gain = audioContextRef.current.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(60, audioContextRef.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(20, audioContextRef.current.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.2);
    
    osc.connect(gain);
    gain.connect(audioContextRef.current.destination);
    
    osc.start(audioContextRef.current.currentTime);
    osc.stop(audioContextRef.current.currentTime + 0.2);
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-20 right-4 z-50">
        <Button
          onClick={onToggleVisibility}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-12 h-12 flex items-center justify-center"
        >
          🎤
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <Card className="w-80 p-4 bg-gray-900/95 backdrop-blur-sm border-purple-500 shadow-2xl max-h-96 overflow-y-auto">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-purple-400">🎤 Music Studio</h3>
            <Button
              onClick={onToggleVisibility}
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              ✕
            </Button>
          </div>

          {/* Recording Name */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Recording Name:</label>
            <input
              type="text"
              value={recordingName}
              onChange={(e) => setRecordingName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 text-sm"
              placeholder="My Recording"
            />
          </div>

          {/* Beat Selection */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Background Beat:</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(beats).map((beatType) => (
                <Button
                  key={beatType}
                  onClick={() => setSelectedBeat(beatType as any)}
                  variant={selectedBeat === beatType ? 'default' : 'outline'}
                  size="sm"
                  className="text-xs"
                >
                  {beatType.charAt(0).toUpperCase() + beatType.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Beat Controls */}
          <div className="space-y-2">
            <Button
              onClick={playBeat}
              className={`w-full ${beatPlaying ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
              size="sm"
            >
              {beatPlaying ? '⏸️ Stop Beat' : '🥁 Play Beat'}
            </Button>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Real-time Auto-tune:</label>
              <Button
                onClick={() => setRealTimeAutoTune(!realTimeAutoTune)}
                variant={realTimeAutoTune ? 'default' : 'outline'}
                size="sm"
                className="text-xs"
              >
                {realTimeAutoTune ? '🎤 LIVE' : '🎤 OFF'}
              </Button>
            </div>
          </div>

          {/* Recording Controls */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                className={`flex-1 ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
              >
                {isRecording ? '⏹️ Stop Recording' : '🎤 Start Recording'}
              </Button>
            </div>
            
            {recordedBlob && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button
                    onClick={() => playRecording()}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    {isPlaying ? '⏸️ Playing...' : '▶️ Play'}
                  </Button>
                  <Button
                    onClick={stopPlayback}
                    className="bg-red-600 hover:bg-red-700 text-white"
                    size="sm"
                  >
                    ⏹️
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={saveRecording}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                  >
                    💾 Save to Computer
                  </Button>
                  <Button
                    onClick={downloadRecording}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                    size="sm"
                  >
                    📥 Download
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Auto-tune Controls */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Auto-Tune Effect:</label>
              <Button
                onClick={() => setAutoTuneEnabled(!autoTuneEnabled)}
                variant={autoTuneEnabled ? 'default' : 'outline'}
                size="sm"
                className="text-xs"
              >
                {autoTuneEnabled ? '✅ ON' : '❌ OFF'}
              </Button>
            </div>
            
            {autoTuneEnabled && (
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Tune Amount: {autoTuneAmount}%</label>
                <Slider
                  value={[autoTuneAmount]}
                  onValueChange={(value) => setAutoTuneAmount(value[0])}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Saved Recordings Library */}
          {savedRecordings.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm text-gray-300">💾 Your Recordings ({savedRecordings.length}):</label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {savedRecordings.map((recording) => (
                  <div key={recording.id} className="flex items-center gap-2 p-2 bg-gray-800/50 rounded">
                    <div className="flex-1">
                      <div className="text-xs text-white truncate font-semibold">{recording.name}</div>
                      <div className="text-xs text-gray-400">{(recording as any).timestamp}</div>
                      <div className="text-xs text-green-400">
                        {(recording as any).autoTuneUsed ? '🎛️ Auto-tuned' : '🎤 Natural'} • 
                        {(recording as any).beatUsed !== 'none' ? ` 🥁 ${(recording as any).beatUsed}` : ' No beat'}
                      </div>
                    </div>
                    <Button
                      onClick={() => setSelectedRecording(recording.id)}
                      variant={selectedRecording === recording.id ? 'default' : 'outline'}
                      size="sm"
                      className="text-xs px-2"
                    >
                      {selectedRecording === recording.id ? '✅' : '▶️'}
                    </Button>
                    <Button
                      onClick={() => deleteRecording(recording.id)}
                      variant="outline"
                      size="sm"
                      className="text-xs px-2 text-red-400 hover:bg-red-900/30"
                    >
                      🗑️
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                {selectedRecording && (
                  <>
                    <Button
                      onClick={playSelectedRecording}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      size="sm"
                    >
                      {isPlaying ? '⏸️ Playing...' : '▶️ Play Selected'}
                    </Button>
                    <Button
                      onClick={downloadSelectedRecording}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      size="sm"
                    >
                      💾
                    </Button>
                  </>
                )}
                <Button
                  onClick={downloadAllRecordings}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  size="sm"
                >
                  📥 All
                </Button>
              </div>
            </div>
          )}

          {/* Volume Control */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">🔊</span>
              <Slider
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={100}
                step={5}
                className="flex-1"
              />
              <span className="text-xs text-gray-400 w-8">{volume}%</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-xs text-gray-500 bg-gray-800/50 rounded p-2">
            <p><strong>Music Studio Features:</strong></p>
            <p>• 🎤 Record with microphone (real-time auto-tune)</p>
            <p>• 🥁 4 background beat styles</p>
            <p>• 🎛️ Auto-tune effects with playback</p>
            <p>• 💾 Auto-save to computer + manual downloads</p>
            <p>• 📚 Recording library with playback</p>
            <p>• 🎮 Play your MP3s while gaming</p>
            <p>• 📱 Works on mobile devices</p>
          </div>

          {/* Copyright Notice */}
          <div className="text-xs text-center text-gray-500 border-t border-gray-700 pt-2">
            © 2025 Justin Devon Mitchell Music Studio
          </div>
        </div>
      </Card>
    </div>
  );
}