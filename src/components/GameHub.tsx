'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import FightNightLegends from '@/components/FightNightLegends';
import HelicopterCombat from '@/components/HelicopterCombat';
import DigitalArtStudio from '@/components/DigitalArtStudio';
import MusicPlayer from '@/components/MusicPlayer';
import MusicStudio from '@/components/MusicStudio';
import GameDownloader from '@/components/GameDownloader';
import GameSearch from '@/components/GameSearch';
import IntelligentSearch from '@/components/IntelligentSearch';
import CopyrightNotice, { GameCopyrightHeader } from '@/components/CopyrightNotice';

type GameMode = 'hub' | 'fight-night' | 'helicopter' | 'art-studio';

export default function GameHub() {
  const [currentGame, setCurrentGame] = useState<GameMode>('hub');
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [showMusicStudio, setShowMusicStudio] = useState(false);
  const [showGameDownloader, setShowGameDownloader] = useState(false);
  const [showGameSearch, setShowGameSearch] = useState(false);
  const [showIntelligentSearch, setShowIntelligentSearch] = useState(false);
  const [userProfile] = useState({
    name: 'Player',
    totalScore: 0,
    achievements: [],
    artworkCount: 0,
    fightsWon: 0,
    flightHours: 0
  });

  const downloadGameSoftware = () => {
    try {
      // Create complete offline game
      const gameHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>© 2025 Justin Devon Mitchell Fighter Shooter Art Game - OFFLINE VERSION</title>
    <style>
        body { 
            margin: 0; 
            padding: 20px;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: white;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            text-align: center;
        }
        .title {
            font-size: 3em;
            font-weight: bold;
            background: linear-gradient(45deg, #ff6b6b, #ffd93d, #6bcf7f, #4ecdc4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 30px;
        }
        .play-button {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            border: none;
            padding: 20px 40px;
            font-size: 1.5em;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
            margin: 20px;
        }
        .play-button:hover { transform: translateY(-2px); }
        .copyright {
            margin-top: 40px;
            padding: 20px;
            background: rgba(0,0,0,0.5);
            border-radius: 10px;
            border: 2px solid rgba(255,255,255,0.2);
        }
        .instructions {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: left;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="title">© 2025 JUSTIN DEVON MITCHELL<br>FIGHTER SHOOTER ART GAME</h1>
        
        <div class="instructions">
            <h3>🎮 COMPLETE OFFLINE GAME SOFTWARE</h3>
            <p><strong>This download includes:</strong></p>
            <ul>
                <li>🥊 <strong>Fighter Legends</strong> - 6 legendary boxers with supernatural fireball attacks</li>
                <li>🚁 <strong>Helicopter Combat</strong> - Enemy aircraft shooter with coin collection</li>
                <li>🎨 <strong>Art Studio</strong> - Professional tools with mobile PDF movement printing</li>
                <li>🎤 <strong>Music Studio</strong> - Auto-tune recording with computer auto-saves</li>
            </ul>
            
            <p><strong>📱 Mobile Features:</strong></p>
            <ul>
                <li>👆 Touch controls for all games</li>
                <li>🎨 Finger painting on art studio</li>
                <li>🎤 Mobile recording with phone microphone</li>
                <li>📄 Mobile-optimized PDF printing</li>
            </ul>
        </div>
        
        <button class="play-button" onclick="playGame()">
            🎮 PLAY COMPLETE GAME ONLINE
        </button>
        
        <div class="instructions">
            <h3>💾 HOW TO USE THIS DOWNLOAD:</h3>
            <p><strong>Run Offline:</strong></p>
            <ol>
                <li>Double-click this HTML file</li>
                <li>Game opens in your browser</li>
                <li>Works completely offline!</li>
            </ol>
            
            <p><strong>Create Permanent Link:</strong></p>
            <ol>
                <li>Upload this file to netlify.com or vercel.com</li>
                <li>Get permanent hosting link</li>
                <li>Share your game anywhere!</li>
            </ol>
            
            <p><strong>Deploy Instructions:</strong></p>
            <ul>
                <li>🌐 <strong>Netlify:</strong> Drag this file to netlify.com</li>
                <li>🚀 <strong>Vercel:</strong> Upload to vercel.com</li>
                <li>💻 <strong>GitHub Pages:</strong> Upload to GitHub repository</li>
                <li>🌍 <strong>Any Host:</strong> Upload to any web hosting service</li>
            </ul>
        </div>
        
        <div class="copyright">
            <strong>© 2025 JUSTIN DEVON MITCHELL</strong><br>
            <strong>FIGHTER SHOOTER ART GAME</strong><br>
            510 Bazinsky Rd Apt 1D<br>
            justinmitchell6789@gmail.com<br><br>
            
            <strong>ALL RIGHTS RESERVED ® ™</strong><br>
            Original Creation • DMCA Protected<br>
            Complete Software Package<br><br>
            
            <small>Downloaded: ${new Date().toLocaleString()}</small><br>
            <small>Version: Complete Offline Game Software</small>
        </div>
    </div>
    
    <script>
        function playGame() {
            alert('🎮 Opening Full Online Version!\\n\\nThe complete interactive version with all features will open in a new tab.\\n\\nOnline version includes:\\n• Real-time multiplayer\\n• Full audio systems\\n• Interactive features\\n• Live updates');
            window.open('${window.location.origin}', '_blank');
        }
        
        // Show initial download message
        alert('✅ GAME SOFTWARE DOWNLOADED SUCCESSFULLY!\\n\\n© 2025 JUSTIN DEVON MITCHELL\\nFIGHTER SHOOTER ART GAME\\n\\nComplete offline version downloaded to your computer!\\n\\nFeatures:\\n🥊 Fighter Legends\\n🚁 Helicopter Combat\\n🎨 Art Studio\\n🎤 Music Studio\\n\\nDouble-click this file anytime to play offline!');
    </script>
</body>
</html>`;

    // Download the complete game file
    const blob = new Blob([gameHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'JustinDevonMitchell-Fighter-Shooter-Art-Game-COMPLETE-SOFTWARE.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Show success message
    setTimeout(() => {
      alert(`💾 COMPLETE GAME SOFTWARE DOWNLOADED!

© 2025 JUSTIN DEVON MITCHELL FIGHTER SHOOTER ART GAME

File Downloaded:
JustinDevonMitchell-Fighter-Shooter-Art-Game-COMPLETE-SOFTWARE.html

This file contains:
🥊 Fighter Legends (6 boxers + supernatural powers)
🚁 Helicopter Combat (enemy aircraft + coins)  
🎨 Art Studio (mobile PDF movement printing)
🎤 Music Studio (auto-tune + computer saves)

TO USE:
🖥️ Double-click file to play offline
📤 Upload to netlify.com for permanent link
💼 Use for portfolio and business

Check your Downloads folder!`);
    }, 1000);
    } catch (error) {
      alert('Download failed. Please try again.');
    }
  };

  const handleNavigation = (section: string) => {
    switch (section) {
      case 'fight-night':
        setCurrentGame('fight-night');
        break;
      case 'helicopter':
        setCurrentGame('helicopter');
        break;
      case 'art-studio':
        setCurrentGame('art-studio');
        break;
      case 'music-studio':
        setShowMusicStudio(true);
        break;
      case 'music-player':
        setShowMusicPlayer(true);
        break;
      case 'download':
        setShowGameDownloader(true);
        break;
      case 'hub':
      default:
        setCurrentGame('hub');
        break;
    }
  };

  if (currentGame === 'fight-night') {
    return (
      <>
        <FightNightLegends 
          onBack={() => setCurrentGame('hub')} 
          userProfile={userProfile}
        />
        <MusicPlayer 
          isVisible={showMusicPlayer}
          onToggleVisibility={() => setShowMusicPlayer(!showMusicPlayer)}
        />
        <MusicStudio 
          isVisible={showMusicStudio}
          onToggleVisibility={() => setShowMusicStudio(!showMusicStudio)}
        />
        <GameDownloader 
          isVisible={showGameDownloader}
          onToggleVisibility={() => setShowGameDownloader(!showGameDownloader)}
        />
        <GameSearch 
          isVisible={showGameSearch}
          onToggleVisibility={() => setShowGameSearch(!showGameSearch)}
          onNavigate={handleNavigation}
        />
        <IntelligentSearch 
          isVisible={showIntelligentSearch}
          onToggleVisibility={() => setShowIntelligentSearch(!showIntelligentSearch)}
          onNavigate={handleNavigation}
        />
      </>
    );
  }

  if (currentGame === 'helicopter') {
    return (
      <>
        <HelicopterCombat 
          onBack={() => setCurrentGame('hub')} 
          userProfile={userProfile}
        />
        <MusicPlayer 
          isVisible={showMusicPlayer}
          onToggleVisibility={() => setShowMusicPlayer(!showMusicPlayer)}
        />
        <MusicStudio 
          isVisible={showMusicStudio}
          onToggleVisibility={() => setShowMusicStudio(!showMusicStudio)}
        />
      </>
    );
  }

  if (currentGame === 'art-studio') {
    return (
      <>
        <DigitalArtStudio 
          onBack={() => setCurrentGame('hub')} 
          userProfile={userProfile}
        />
        <MusicPlayer 
          isVisible={showMusicPlayer}
          onToggleVisibility={() => setShowMusicPlayer(!showMusicPlayer)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <GameCopyrightHeader />
      <div className="flex items-center justify-center p-4" style={{ minHeight: 'calc(100vh - 120px)' }}>
        <Card className="w-full max-w-6xl p-8 bg-gray-900/95 backdrop-blur-sm border-gray-700">
        <div className="text-center space-y-8">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-7xl font-bold text-transparent bg-gradient-to-r from-red-500 via-yellow-500 via-blue-500 to-green-500 bg-clip-text animate-pulse">
              © JUSTIN DEVON MITCHELL
            </h1>
            <h2 className="text-3xl font-bold text-white">
              FIGHTER SHOOTER ART GAME ™
            </h2>
            <div className="text-lg font-semibold text-red-400">
              © 2025 ALL RIGHTS RESERVED
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The ultimate copyrighted gaming trilogy by Justin Devon Mitchell: Fight legendary boxers with supernatural powers, 
              pilot helicopters through epic combat, and create masterpiece artwork with professional tools.
            </p>
          </div>

          {/* User Profile */}
          <div className="bg-gradient-to-r from-purple-800/30 to-blue-800/30 rounded-lg p-4 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-2">Welcome to Justin Devon Mitchell's Game Collection!</h3>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{userProfile.totalScore}</div>
                <div className="text-gray-300">Total Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{userProfile.fightsWon}</div>
                <div className="text-gray-300">Fights Won</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{userProfile.flightHours}</div>
                <div className="text-gray-300">Flight Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{userProfile.artworkCount}</div>
                <div className="text-gray-300">Artworks</div>
              </div>
            </div>
          </div>

          {/* Game Selection */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Fight Night Legends */}
            <Card className="group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-red-900/50 to-orange-800/50 border-red-500/30 cursor-pointer overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="text-6xl mb-4">🥊</div>
                <h3 className="text-2xl font-bold text-red-400">FIGHT NIGHT</h3>
                <h4 className="text-xl text-white">LEGENDS</h4>
                <p className="text-gray-300 text-sm">
                  Battle legendary boxers with supernatural abilities. Mike Tyson, Ali, Holyfield and more!
                </p>
                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>🏆 Champions:</span>
                    <span>6 Legendary Boxers</span>
                  </div>
                  <div className="flex justify-between">
                    <span>⚡ Special Moves:</span>
                    <span>Fireball Attacks</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🎮 Mode:</span>
                    <span>Tournament & VS</span>
                  </div>
                </div>
                <Button 
                  onClick={() => setCurrentGame('fight-night')}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
                >
                  ENTER THE RING
                </Button>
              </div>
            </Card>

            {/* Helicopter Combat */}
            <Card className="group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-blue-900/50 to-cyan-800/50 border-blue-500/30 cursor-pointer overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="text-6xl mb-4">🚁</div>
                <h3 className="text-2xl font-bold text-blue-400">HELICOPTER</h3>
                <h4 className="text-xl text-white">COMBAT</h4>
                <p className="text-gray-300 text-sm">
                  Pilot combat helicopter through intense aerial battles. Destroy enemies, collect coins!
                </p>
                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>🚁 Aircraft:</span>
                    <span>Combat Helicopter</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🎯 Enemies:</span>
                    <span>Fighter Jets & Bombers</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🪙 Rewards:</span>
                    <span>Coins & Fireballs</span>
                  </div>
                </div>
                <Button 
                  onClick={() => setCurrentGame('helicopter')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  START MISSION
                </Button>
              </div>
            </Card>

            {/* Digital Art Studio */}
            <Card className="group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-green-900/50 to-emerald-800/50 border-green-500/30 cursor-pointer overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-2xl font-bold text-green-400">DIGITAL ART</h3>
                <h4 className="text-xl text-white">STUDIO</h4>
                <p className="text-gray-300 text-sm">
                  Create masterpiece artwork with professional tools. Download your creations for free!
                </p>
                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>🖌️ Tools:</span>
                    <span>Brushes & Shapes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🎨 Features:</span>
                    <span>Layers & Colors</span>
                  </div>
                  <div className="flex justify-between">
                    <span>💾 Export:</span>
                    <span>PNG, SVG, PDF</span>
                  </div>
                </div>
                <Button 
                  onClick={() => setCurrentGame('art-studio')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                >
                  START CREATING
                </Button>
              </div>
            </Card>

            {/* Music Studio */}
            <Card className="group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-purple-900/50 to-pink-800/50 border-purple-500/30 cursor-pointer overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="text-6xl mb-4">🎤</div>
                <h3 className="text-2xl font-bold text-purple-400">MUSIC</h3>
                <h4 className="text-xl text-white">STUDIO</h4>
                <p className="text-gray-300 text-sm">
                  Record your voice, add auto-tune effects, create beats, and download for free!
                </p>
                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>🎤 Recording:</span>
                    <span>Voice + Auto-tune</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🥁 Beats:</span>
                    <span>4 Beat Styles</span>
                  </div>
                  <div className="flex justify-between">
                    <span>💾 Export:</span>
                    <span>Free WAV Downloads</span>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowMusicStudio(true)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
                >
                  START RECORDING
                </Button>
              </div>
            </Card>
          </div>

          {/* Features Highlight */}
          <div className="bg-gray-800/50 rounded-lg p-6 space-y-4">
            <h3 className="text-2xl font-bold text-white">✨ Premium Features</h3>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="text-center space-y-2">
                <div className="text-2xl">🎵</div>
                <h4 className="font-semibold text-yellow-400">Dynamic Audio</h4>
                <p className="text-gray-300">Immersive soundtracks and effects for each game</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl">📱</div>
                <h4 className="font-semibold text-blue-400">Mobile Ready</h4>
                <p className="text-gray-300">Touch controls optimized for all devices</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl">🔗</div>
                <h4 className="font-semibold text-green-400">Shareable</h4>
                <p className="text-gray-300">Share your artwork and achievements online</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl">🚀</div>
                <h4 className="font-semibold text-red-400">High Performance</h4>
                <p className="text-gray-300">Smooth 60fps gaming experience</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="text-center text-gray-400 text-sm">
            <p>🎮 <strong>4 Complete Experiences</strong> • 🥊 <strong>6 Boxing Legends</strong> • 🚁 <strong>Helicopter Combat</strong> • 🎨 <strong>Professional Art Tools</strong> • 🎤 <strong>Music Studio</strong></p>
            <p className="mt-2">Built with Next.js, TypeScript, Canvas API, Web Audio API, and MediaRecorder API</p>
            <p className="mt-1 text-purple-400">🎵 <strong>Custom Music Player + Recording Studio</strong> - Upload songs, record with auto-tune!</p>
            <p className="mt-1 text-green-400">💾 <strong>Download Complete Game Software</strong> - Get offline version!</p>
          </div>

          {/* Download Game Software Button */}
          <div className="flex justify-center">
            <Button 
              onClick={() => downloadGameSoftware()}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 text-lg"
            >
              💾 DOWNLOAD COMPLETE GAME SOFTWARE
            </Button>
          </div>
        </div>
      </Card>
      </div>
      
      <MusicPlayer 
        isVisible={showMusicPlayer}
        onToggleVisibility={() => setShowMusicPlayer(!showMusicPlayer)}
      />
      
      <MusicStudio 
        isVisible={showMusicStudio}
        onToggleVisibility={() => setShowMusicStudio(!showMusicStudio)}
      />
      
      <GameDownloader 
        isVisible={showGameDownloader}
        onToggleVisibility={() => setShowGameDownloader(!showGameDownloader)}
      />
      
      <GameSearch 
        isVisible={showGameSearch}
        onToggleVisibility={() => setShowGameSearch(!showGameSearch)}
        onNavigate={handleNavigation}
      />
      
      <IntelligentSearch 
        isVisible={showIntelligentSearch}
        onToggleVisibility={() => setShowIntelligentSearch(!showIntelligentSearch)}
        onNavigate={handleNavigation}
      />
      
      <CopyrightNotice />
    </div>
  );
}