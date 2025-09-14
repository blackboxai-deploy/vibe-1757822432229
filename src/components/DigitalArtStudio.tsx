'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { InGameCopyright } from '@/components/CopyrightNotice';

interface DigitalArtStudioProps {
  onBack: () => void;
  userProfile: any;
}

interface DrawingTool {
  type: 'brush' | 'pencil' | 'eraser' | 'fill';
  size: number;
  color: string;
  opacity: number;
}

export default function DigitalArtStudio({ onBack }: DigitalArtStudioProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<DrawingTool>({
    type: 'brush',
    size: 5,
    color: '#000000',
    opacity: 100
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [artworkTitle, setArtworkTitle] = useState('My Artwork');
  const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [lastTouchPos, setLastTouchPos] = useState<{x: number, y: number} | null>(null);

  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#FF8000', '#8000FF', '#0080FF', '#80FF00',
    '#FF0080', '#808080', '#C0C0C0', '#800000', '#008000', '#000080',
    '#808000', '#800080', '#008080', '#FF4500', '#32CD32', '#4169E1',
    '#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#9370DB', '#20B2AA'
  ];

  useEffect(() => {
    // Check if mobile
    setIsMobile(window.innerWidth <= 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Set canvas size based on device
        canvas.width = isMobile ? 400 : 800;
        canvas.height = isMobile ? 300 : 600;
        
        // Fill with white background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Save initial state
        saveToHistory();
      }
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const newHistory = drawingHistory.slice(0, historyStep + 1);
        newHistory.push(imageData);
        setDrawingHistory(newHistory);
        setHistoryStep(newHistory.length - 1);
      }
    }
  };

  const undo = () => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx && drawingHistory[historyStep - 1]) {
          ctx.putImageData(drawingHistory[historyStep - 1], 0, 0);
        }
      }
    }
  };

  const redo = () => {
    if (historyStep < drawingHistory.length - 1) {
      setHistoryStep(historyStep + 1);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx && drawingHistory[historyStep + 1]) {
          ctx.putImageData(drawingHistory[historyStep + 1], 0, 0);
        }
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveToHistory();
      }
    }
  };

  const getMousePos = (canvas: HTMLCanvasElement, e: MouseEvent | React.MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const getTouchPos = (canvas: HTMLCanvasElement, e: React.TouchEvent) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const touch = e.touches[0];
    
    return {
      x: (touch.clientX - rect.left) * scaleX,
      y: (touch.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const pos = getMousePos(canvas, e);
      draw(pos.x, pos.y, true);
    }
  };

  const draw = (x: number, y: number, isStart: boolean = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalAlpha = currentTool.opacity / 100;
    ctx.lineWidth = currentTool.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    switch (currentTool.type) {
      case 'brush':
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = currentTool.color;
        break;
      case 'pencil':
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = currentTool.color;
        ctx.lineWidth = Math.max(1, currentTool.size / 2);
        break;
      case 'eraser':
        ctx.globalCompositeOperation = 'destination-out';
        break;
    }

    if (isStart) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const pos = getMousePos(canvas, e);
      draw(pos.x, pos.y);
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setLastTouchPos(null);
      saveToHistory();
    }
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const pos = getTouchPos(canvas, e);
      setLastTouchPos(pos);
      draw(pos.x, pos.y, true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const pos = getTouchPos(canvas, e);
      if (lastTouchPos) {
        draw(pos.x, pos.y);
      }
      setLastTouchPos(pos);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    stopDrawing();
  };

  const downloadArtwork = (format: 'png' | 'jpg' | 'pdf') => {
    const canvas = canvasRef.current;
    if (canvas) {
      if (format === 'pdf') {
        // Create PDF download
        downloadAsPDF();
      } else {
        // Clean download without watermark
        const link = document.createElement('a');
        link.download = `${artworkTitle}.${format}`;
        link.href = canvas.toDataURL(`image/${format}`, 0.95);
        link.click();
      }
    }
  };

  const downloadAsPDF = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Create multiple frames for animated effect
      const frames: string[] = [];
      const originalData = canvas.toDataURL('image/png');
      
      // Create animated frames by applying different movement effects
      for (let i = 0; i < 8; i++) {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d')!;
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        
        const img = new Image();
        img.onload = () => {
          // Clear canvas
          tempCtx.fillStyle = '#FFFFFF';
          tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
          
          // Apply different movement transformations
          const movements = [
            { x: 0, y: 0, scale: 1, rotation: 0 },
            { x: 5, y: -3, scale: 1.02, rotation: 0.05 },
            { x: -3, y: 5, scale: 0.98, rotation: -0.03 },
            { x: 8, y: 2, scale: 1.05, rotation: 0.08 },
            { x: -5, y: -5, scale: 0.95, rotation: -0.05 },
            { x: 3, y: 8, scale: 1.03, rotation: 0.03 },
            { x: -8, y: -2, scale: 0.97, rotation: -0.08 },
            { x: 0, y: 0, scale: 1, rotation: 0 }
          ];
          
          const movement = movements[i];
          
          tempCtx.save();
          tempCtx.translate(tempCanvas.width / 2 + movement.x, tempCanvas.height / 2 + movement.y);
          tempCtx.rotate(movement.rotation);
          tempCtx.scale(movement.scale, movement.scale);
          tempCtx.translate(-tempCanvas.width / 2, -tempCanvas.height / 2);
          tempCtx.drawImage(img, 0, 0);
          tempCtx.restore();
          
          frames.push(tempCanvas.toDataURL('image/png'));
          
          if (frames.length === 8) {
            generateAnimatedPDF(frames);
          }
        };
        img.src = originalData;
      }
    }
  };

  const generateAnimatedPDF = (frames: string[]) => {
    // Detect if mobile device
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Create mobile-optimized printable PDF
    const pdf = window.open('', '_blank');
    if (pdf) {
      pdf.document.write(`
        <html>
          <head>
            <title>${artworkTitle} - Movement Art - © 2025 Justin Devon Mitchell</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              @page { 
                size: ${isMobileDevice ? 'A5' : 'A4'}; 
                margin: ${isMobileDevice ? '10mm' : '15mm'}; 
              }
              body { 
                margin: 0; 
                padding: ${isMobileDevice ? '10px' : '20px'}; 
                font-family: Arial, sans-serif;
                background: white;
                line-height: 1.4;
              }
              .title { 
                text-align: center; 
                font-size: ${isMobileDevice ? '18px' : '24px'}; 
                font-weight: bold; 
                margin-bottom: 15px;
                color: #333;
                border: 3px solid #007bff;
                padding: 10px;
                border-radius: 8px;
                background: #f8f9fa;
              }
              .frames-container { 
                display: grid; 
                grid-template-columns: repeat(${isMobileDevice ? '2' : '4'}, 1fr); 
                gap: ${isMobileDevice ? '8px' : '12px'}; 
                margin: 15px 0;
                page-break-inside: avoid;
              }
              .frame { 
                border: 3px dashed #007bff; 
                padding: 5px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,123,255,0.3);
                position: relative;
              }
              .frame img { 
                width: 100%; 
                height: auto; 
                border-radius: 4px;
                border: 1px solid #ddd;
              }
              .frame-label { 
                text-align: center; 
                font-size: ${isMobileDevice ? '8px' : '10px'}; 
                margin-top: 5px;
                color: #007bff;
                font-weight: bold;
                background: #e3f2fd;
                padding: 2px 4px;
                border-radius: 4px;
              }
              .cut-line {
                position: absolute;
                top: -5px;
                left: -5px;
                right: -5px;
                bottom: -5px;
                border: 1px dashed #ff6b6b;
                pointer-events: none;
              }
              .instructions {
                background: #fff3cd;
                border: 2px solid #ffc107;
                padding: ${isMobileDevice ? '10px' : '15px'};
                margin: 15px 0;
                border-radius: 8px;
                font-size: ${isMobileDevice ? '10px' : '12px'};
                color: #856404;
                page-break-inside: avoid;
              }
              .movement-guide {
                background: #d1ecf1;
                border: 2px solid #17a2b8;
                padding: ${isMobileDevice ? '10px' : '15px'};
                margin: 15px 0;
                border-radius: 8px;
                font-size: ${isMobileDevice ? '10px' : '12px'};
                color: #0c5460;
                page-break-inside: avoid;
              }
              .phone-tips {
                background: #f8d7da;
                border: 2px solid #dc3545;
                padding: ${isMobileDevice ? '10px' : '15px'};
                margin: 15px 0;
                border-radius: 8px;
                font-size: ${isMobileDevice ? '10px' : '12px'};
                color: #721c24;
                page-break-inside: avoid;
              }
              .copyright { 
                margin-top: 20px; 
                font-size: ${isMobileDevice ? '8px' : '10px'}; 
                color: #666; 
                text-align: center;
                border-top: 2px solid #007bff;
                padding-top: 10px;
                page-break-inside: avoid;
              }
              @media print {
                .no-print { display: none; }
                body { background: white !important; }
                .frame { box-shadow: none; }
              }
              @media screen and (max-width: 768px) {
                .frames-container { grid-template-columns: repeat(2, 1fr); }
                body { padding: 10px; }
              }
            </style>
          </head>
          <body>
            <div class="title">
              📱🎨 ${artworkTitle}<br>
              <small>Mobile-Friendly Movement Art</small>
            </div>
            
            <div class="instructions">
              <strong>🎨 MOVEMENT ART CREATION:</strong><br>
              Your artwork has been transformed into 8 movement frames that create animation when flipped quickly.
              Each frame shows subtle position, rotation, and scale changes for realistic movement effects.
            </div>

            ${isMobileDevice ? `
            <div class="phone-tips">
              <strong>📱 MOBILE PRINTING TIPS:</strong><br>
              1. Use your phone's print option or save as PDF<br>
              2. Best printed on regular 8.5x11" paper<br>
              3. Use scissors or craft knife for clean cuts<br>
              4. Stack in numerical order for best effect<br>
              5. Flip like pages of a book for animation!
            </div>
            ` : ''}

            <div class="frames-container">
              ${frames.map((frame, index) => `
                <div class="frame">
                  <div class="cut-line"></div>
                  <img src="${frame}" alt="Movement Frame ${index + 1}" />
                  <div class="frame-label">✂️ CUT HERE - Frame ${index + 1}/8</div>
                </div>
              `).join('')}
            </div>

            <div class="movement-guide">
              <strong>📄 CREATING MOVEMENT ON PAPER:</strong><br>
              1. 🖨️ Print this page (color recommended)<br>
              2. ✂️ Cut out each frame along the dashed lines<br>
              3. 📚 Stack frames in numerical order (1-8)<br>
              4. 👆 Hold stack firmly and flip through quickly<br>
              5. 🎬 Watch your artwork animate and move!<br>
              <br>
              <strong>🎯 Pro Tips:</strong><br>
              • Use thicker paper for better flipping<br>
              • Align frames carefully for smooth movement<br>
              • Try flipping forwards and backwards<br>
              • Create multiple copies for friends!<br>
              ${isMobileDevice ? '• Use phone flashlight to backlight for cool effects!' : ''}
            </div>
            
            <div class="copyright">
              <strong>© 2025 JUSTIN DEVON MITCHELL</strong><br>
              Digital Art Studio - Movement Animation Technology<br>
              510 Bazinsky Rd Apt 1D • justinmitchell6789@gmail.com<br>
              <strong>Original Movement Art Creation System</strong><br>
              All Rights Reserved ® ™<br>
              <small>Printed: ${new Date().toLocaleString()}</small>
            </div>
            
            <div class="no-print" style="text-align: center; margin-top: 30px;">
              <button onclick="window.print()" style="
                background: #007bff; 
                color: white; 
                border: none; 
                padding: ${isMobileDevice ? '12px 24px' : '15px 30px'}; 
                font-size: ${isMobileDevice ? '14px' : '16px'}; 
                border-radius: 8px; 
                cursor: pointer;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                margin: 5px;
              ">
                🖨️ PRINT MOVEMENT ART
              </button>
              ${isMobileDevice ? `
              <button onclick="window.location.href='data:text/html;charset=utf-8,' + encodeURIComponent(document.documentElement.outerHTML)" style="
                background: #28a745; 
                color: white; 
                border: none; 
                padding: 12px 24px; 
                font-size: 14px; 
                border-radius: 8px; 
                cursor: pointer;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                margin: 5px;
              ">
                📱 SAVE TO PHONE
              </button>
              ` : ''}
            </div>
            
            <script>
              // Auto-print after 3 seconds for mobile compatibility
              setTimeout(() => {
                if (confirm('Ready to print your movement art? Click OK to print or Cancel to review.')) {
                  window.print();
                }
              }, 3000);
            </script>
          </body>
        </html>
      `);
      pdf.document.close();
    }
  };

  const generateShareableLink = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      const blob = dataURLToBlob(dataURL);
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link for sharing
      const shareData = {
        title: artworkTitle,
        text: `Check out my digital artwork: ${artworkTitle}`,
        url: url
      };

      if (navigator.share) {
        navigator.share(shareData);
      } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(`Check out my artwork: ${url}`).then(() => {
          alert('Shareable link copied to clipboard!');
        });
      }
    }
  };

  const dataURLToBlob = (dataURL: string) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
              JUSTIN DEVON MITCHELL ART STUDIO
            </h1>
            <input 
              type="text"
              value={artworkTitle}
              onChange={(e) => setArtworkTitle(e.target.value)}
              className="mt-2 px-3 py-1 bg-gray-800 text-white rounded border border-gray-600"
              placeholder="Artwork Title"
            />
          </div>
          <Button 
            onClick={onBack}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            ← Back to Hub
          </Button>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-12'} gap-4`}>
          {/* Tools Panel */}
          <Card className={`${isMobile ? 'col-span-1' : 'col-span-3'} p-4 bg-gray-900/95 border-green-700`}>
            <h3 className="text-lg font-bold text-green-400 mb-4">🎨 Tools</h3>
            
            {/* Tool Selection */}
            <div className="space-y-3 mb-6">
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={currentTool.type === 'brush' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentTool({...currentTool, type: 'brush'})}
                  className="text-xs"
                >
                  🖌️ Brush
                </Button>
                <Button 
                  variant={currentTool.type === 'pencil' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentTool({...currentTool, type: 'pencil'})}
                  className="text-xs"
                >
                  ✏️ Pencil
                </Button>
                <Button 
                  variant={currentTool.type === 'eraser' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentTool({...currentTool, type: 'eraser'})}
                  className="text-xs"
                >
                  🧹 Eraser
                </Button>
              </div>
            </div>

            {/* Brush Size */}
            <div className="space-y-2 mb-4">
              <label className="text-sm text-gray-300">Size: {currentTool.size}px</label>
              <Slider
                value={[currentTool.size]}
                onValueChange={(value) => setCurrentTool({...currentTool, size: value[0]})}
                min={1}
                max={50}
                step={1}
                className="w-full"
              />
            </div>

            {/* Opacity */}
            <div className="space-y-2 mb-4">
              <label className="text-sm text-gray-300">Opacity: {currentTool.opacity}%</label>
              <Slider
                value={[currentTool.opacity]}
                onValueChange={(value) => setCurrentTool({...currentTool, opacity: value[0]})}
                min={10}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            {/* Color Picker */}
            <div className="space-y-2 mb-6">
              <label className="text-sm text-gray-300">Color</label>
              <div 
                className="w-full h-10 rounded border-2 border-gray-600 cursor-pointer"
                style={{ backgroundColor: currentTool.color }}
                onClick={() => setShowColorPicker(!showColorPicker)}
              />
              
              {showColorPicker && (
                <div className="grid grid-cols-6 gap-1 p-2 bg-gray-800 rounded">
                  {colors.map((color) => (
                    <div
                      key={color}
                      className="w-8 h-8 rounded cursor-pointer border-2 border-gray-600 hover:border-white"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setCurrentTool({...currentTool, color});
                        setShowColorPicker(false);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" onClick={undo} variant="outline" className="text-xs">
                  ↶ Undo
                </Button>
                <Button size="sm" onClick={redo} variant="outline" className="text-xs">
                  ↷ Redo
                </Button>
              </div>
              <Button size="sm" onClick={clearCanvas} variant="outline" className="w-full text-xs">
                🗑️ Clear
              </Button>
            </div>
          </Card>

          {/* Canvas Area */}
          <Card className={`${isMobile ? 'col-span-1 order-first' : 'col-span-6'} p-4 bg-gray-900/95 border-green-700 relative`}>
            <div className="flex justify-center">
              <canvas
                ref={canvasRef}
                className="border-2 border-gray-600 rounded cursor-crosshair bg-white touch-none"
                style={{ maxWidth: '100%', maxHeight: isMobile ? '300px' : '600px' }}
                onMouseDown={startDrawing}
                onMouseMove={handleMouseMove}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
            </div>
            <InGameCopyright />
          </Card>

          {/* Export Panel */}
          <Card className={`${isMobile ? 'col-span-1' : 'col-span-3'} p-4 bg-gray-900/95 border-green-700`}>
            <h3 className="text-lg font-bold text-green-400 mb-4">💾 Export</h3>
            
            <div className="space-y-3">
              <Button 
                onClick={() => downloadArtwork('png')}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="sm"
              >
                📥 Download PNG
              </Button>
              <Button 
                onClick={() => downloadArtwork('jpg')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                📥 Download JPG
              </Button>
              <Button 
                onClick={() => downloadArtwork('pdf')}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                size="sm"
              >
                📄 Download PDF
              </Button>
              <Button 
                onClick={generateShareableLink}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                size="sm"
              >
                🔗 Share Artwork
              </Button>
            </div>

            <div className="mt-6 p-3 bg-green-900/30 rounded text-xs text-gray-300">
              <h4 className="font-semibold text-green-400 mb-2">✨ Features</h4>
              <ul className="space-y-1">
                <li>• Multiple brush tools</li>
                <li>• Adjustable size & opacity</li>
                <li>• 30 color palette</li>
                <li>• Undo/Redo system</li>
                <li>• Free downloads</li>
                <li>• Shareable links</li>
              </ul>
            </div>

            <div className="mt-4 p-3 bg-yellow-900/30 rounded text-xs text-gray-300">
              <h4 className="font-semibold text-yellow-400 mb-2">🎯 Tips</h4>
              <ul className="space-y-1">
                <li>• Use low opacity for blending</li>
                <li>• Try different brush sizes</li>
                <li>• Save frequently with downloads</li>
                <li>• Share your masterpieces!</li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="p-4 bg-gray-900/95 border-green-700">
          <div className="text-center text-gray-300">
            <h4 className="font-semibold text-green-400 mb-2">🎨 How to Use Digital Art Studio</h4>
            <p className="text-sm">
              Select your tool and color, then click and drag on the canvas to create your artwork. 
              Use different brush sizes and opacity levels for varied effects. 
              Download your finished artwork as PNG or JPG, or generate a shareable link to showcase your creation!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}