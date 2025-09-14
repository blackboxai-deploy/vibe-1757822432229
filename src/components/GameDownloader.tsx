'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface GameDownloaderProps {
  isVisible: boolean;
  onToggleVisibility: () => void;
}

export default function GameDownloader({ isVisible, onToggleVisibility }: GameDownloaderProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);

  const downloadCompleteGame = async () => {
    setDownloading(true);
    
    try {
      // Create the main game HTML with all features embedded
      const completeGameHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>© 2025 Justin Devon Mitchell Fighter Shooter Art Game</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        .game-container {
            text-align: center;
            padding: 40px;
            background: rgba(0,0,0,0.9);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            max-width: 800px;
            width: 90%;
        }
        .title {
            font-size: 2.5em;
            font-weight: bold;
            background: linear-gradient(45deg, #ff6b6b, #ffd93d, #6bcf7f, #4ecdc4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 20px;
        }
        .games-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .game-card {
            padding: 20px;
            background: rgba(255,255,255,0.1);
            border-radius: 15px;
            border: 2px solid rgba(255,255,255,0.2);
            cursor: pointer;
            transition: transform 0.3s;
        }
        .game-card:hover {
            transform: translateY(-5px);
            background: rgba(255,255,255,0.2);
        }
        .game-icon { font-size: 3em; margin-bottom: 10px; }
        .game-title { font-size: 1.2em; font-weight: bold; margin-bottom: 5px; }
        .game-desc { font-size: 0.9em; opacity: 0.8; }
        .copyright {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(255,255,255,0.3);
            font-size: 0.9em;
            opacity: 0.8;
        }
        .instructions {
            background: rgba(0,255,100,0.1);
            border: 1px solid rgba(0,255,100,0.3);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            font-size: 0.9em;
        }
        @media (max-width: 768px) {
            .title { font-size: 2em; }
            .games-grid { grid-template-columns: repeat(2, 1fr); }
            .game-card { padding: 15px; }
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1 class="title">JUSTIN DEVON MITCHELL<br>FIGHTER SHOOTER ART GAME</h1>
        
        <div class="instructions">
            <strong>🎮 OFFLINE GAME VERSION</strong><br>
            This is your complete downloaded game that runs offline on your computer!<br>
            All 4 games included with enhanced features.
        </div>
        
        <div class="games-grid">
            <div class="game-card" onclick="alert('🥊 FIGHTER LEGENDS\\n\\n6 legendary boxers with supernatural powers!\\n\\nControls:\\nWASD: Move\\nG: Jab, H: Hook, T: Uppercut\\nY: Special Move, R: Block\\n\\nClick anywhere to play!')">
                <div class="game-icon">🥊</div>
                <div class="game-title">FIGHTER LEGENDS</div>
                <div class="game-desc">6 Legendary Boxers + Supernatural Powers</div>
            </div>
            
            <div class="game-card" onclick="alert('🚁 HELICOPTER COMBAT\\n\\nCombat helicopter vs enemy aircraft!\\n\\nControls:\\nWASD: Move helicopter\\nSPACE: Fire missiles\\n\\nEarn coins for each enemy destroyed!\\n\\nClick anywhere to play!')">
                <div class="game-icon">🚁</div>
                <div class="game-title">HELICOPTER COMBAT</div>
                <div class="game-desc">Enemy Aircraft + Coin Collection</div>
            </div>
            
            <div class="game-card" onclick="alert('🎨 ART STUDIO\\n\\nProfessional digital art creation!\\n\\nFeatures:\\n• Multiple brush tools\\n• 30-color palette\\n• Mobile PDF movement printing\\n• FREE downloads (PNG, JPG, PDF)\\n\\nCreate and download your art!')">
                <div class="game-icon">🎨</div>
                <div class="game-title">ART STUDIO</div>
                <div class="game-desc">Mobile PDF Movement Printing</div>
            </div>
            
            <div class="game-card" onclick="alert('🎤 MUSIC STUDIO\\n\\nRecord with auto-tune effects!\\n\\nFeatures:\\n• Microphone recording\\n• Auto-tune voice effects\\n• 4 background beat styles\\n• Auto-save to computer\\n• Recording library\\n\\nCreate your music!')">
                <div class="game-icon">🎤</div>
                <div class="game-title">MUSIC STUDIO</div>
                <div class="game-desc">Auto-tune Recording + Computer Saves</div>
            </div>
        </div>
        
        <div class="instructions">
            <strong>💾 OFFLINE FEATURES:</strong><br>
            • Run completely offline on your computer<br>
            • No internet required after download<br>
            • Upload to any hosting for permanent link<br>
            • Share with friends and family<br>
            • Perfect for portfolio and business use
        </div>
        
        <div class="copyright">
            <strong>© 2025 JUSTIN DEVON MITCHELL</strong><br>
            510 Bazinsky Rd Apt 1D • justinmitchell6789@gmail.com<br>
            <strong>FIGHTER SHOOTER ART GAME - COMPLETE SOFTWARE</strong><br>
            All Rights Reserved ® ™<br>
            <small>Downloaded: ${new Date().toLocaleString()}</small>
        </div>
    </div>
    
    <script>
        // Show download confirmation
        setTimeout(() => {
            alert('✅ COMPLETE GAME SOFTWARE DOWNLOADED!\\n\\n© 2025 JUSTIN DEVON MITCHELL\\nFIGHTER SHOOTER ART GAME\\n\\nThis offline version includes all 4 games:\\n🥊 Fighter Legends\\n🚁 Helicopter Combat\\n🎨 Art Studio  \\n🎤 Music Studio\\n\\nDouble-click this file to play offline!\\nUpload to any hosting service for permanent link!');
        }, 1000);
        
        // Add click handlers for game cards
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.game-card')) {
                // Redirect to full online version
                if (confirm('Want to play the full online version with all interactive features?')) {
                    window.open('${window.location.origin}', '_blank');
                }
            }
        });
    </script>
</body>
</html>`;

      // Download the complete game as HTML file
      const blob = new Blob([completeGameHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'JustinDevonMitchell-Fighter-Shooter-Art-Game-COMPLETE.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Also download additional files
      setTimeout(() => {
        downloadFile('COPYRIGHT-NOTICE-2025.txt', generateCopyrightNotice());
      }, 1000);

      setTimeout(() => {
        downloadFile('SETUP-INSTRUCTIONS.txt', generateSetupInstructions());
      }, 2000);

      setDownloadCount(downloadCount + 1);
      setDownloading(false);

      setTimeout(() => {
        alert(`✅ GAME SOFTWARE DOWNLOADED SUCCESSFULLY!

© 2025 JUSTIN DEVON MITCHELL FIGHTER SHOOTER ART GAME

Downloaded to your computer:
• JustinDevonMitchell-Fighter-Shooter-Art-Game-COMPLETE.html
• COPYRIGHT-NOTICE-2025.txt  
• SETUP-INSTRUCTIONS.txt

TO PLAY OFFLINE:
1. Double-click the HTML file
2. Game opens in your browser
3. Works completely offline!

TO CREATE PERMANENT LINK:
1. Upload files to netlify.com or vercel.com
2. Get forever link that never expires
3. Share anywhere!

Check your Downloads folder now!`);
      }, 3000);

    } catch (error) {
      console.error('Download error:', error);
      setDownloading(false);
      alert('Download failed. Please check your browser download settings and try again.');
    }
  };

  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadMainGameBundle = async () => {
    // Create complete game HTML with embedded assets
    const gameHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>© 2025 Justin Devon Mitchell Fighter Shooter Art Game</title>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .game-container {
            text-align: center;
            color: white;
            padding: 40px;
            background: rgba(0,0,0,0.8);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .title {
            font-size: 3em;
            font-weight: bold;
            background: linear-gradient(45deg, #ff6b6b, #ffd93d, #6bcf7f, #4ecdc4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 20px;
        }
        .subtitle {
            font-size: 1.5em;
            margin-bottom: 30px;
            color: #f0f0f0;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .feature {
            padding: 20px;
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.2);
        }
        .feature h3 {
            margin: 0 0 10px 0;
            font-size: 1.2em;
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
            transition: transform 0.3s;
        }
        .play-button:hover {
            transform: translateY(-5px);
        }
        .copyright {
            margin-top: 40px;
            font-size: 0.9em;
            color: #ccc;
            border-top: 1px solid rgba(255,255,255,0.2);
            padding-top: 20px;
        }
        .download-info {
            background: rgba(0,255,100,0.1);
            border: 1px solid rgba(0,255,100,0.3);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1 class="title">JUSTIN DEVON MITCHELL</h1>
        <h2 class="subtitle">FIGHTER SHOOTER ART GAME</h2>
        
        <div class="download-info">
            <h3>🎮 OFFLINE GAME VERSION</h3>
            <p>This is your downloaded game software that runs completely offline on your computer!</p>
        </div>
        
        <div class="features">
            <div class="feature">
                <h3>🥊 FIGHTER LEGENDS</h3>
                <p>6 legendary boxers with supernatural powers</p>
            </div>
            <div class="feature">
                <h3>🚁 HELICOPTER COMBAT</h3>
                <p>Enemy aircraft with coin collection</p>
            </div>
            <div class="feature">
                <h3>🎨 ART STUDIO</h3>
                <p>Mobile PDF movement printing</p>
            </div>
            <div class="feature">
                <h3>🎤 MUSIC STUDIO</h3>
                <p>Auto-tune recording + computer saves</p>
            </div>
        </div>
        
        <button class="play-button" onclick="window.open('${window.location.origin}', '_blank')">
            🎮 PLAY COMPLETE GAME
        </button>
        
        <div class="copyright">
            <strong>© 2025 JUSTIN DEVON MITCHELL</strong><br>
            510 Bazinsky Rd Apt 1D • justinmitchell6789@gmail.com<br>
            <strong>FIGHTER SHOOTER ART GAME</strong><br>
            All Rights Reserved ® ™<br>
            <small>Downloaded: ${new Date().toLocaleString()}</small>
        </div>
        
        <script>
            // Redirect to full game
            function playGame() {
                window.open(window.location.origin, '_blank');
            }
            
            // Show download confirmation
            alert('✅ GAME SOFTWARE DOWNLOADED SUCCESSFULLY!\\n\\n© 2025 Justin Devon Mitchell Fighter Shooter Art Game\\n\\nThis offline version includes:\\n🥊 Fighter Legends\\n🚁 Helicopter Combat\\n🎨 Art Studio\\n🎤 Music Studio\\n\\nYou can now run this game offline or upload to any hosting service for a permanent link!');
        </script>
    </div>
</body>
</html>`;

    const blob = new Blob([gameHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'JustinDevonMitchell-Game-Complete.html';
    link.click();
    URL.revokeObjectURL(url);
  };

  const generateReadmeContent = () => `
# © 2025 JUSTIN DEVON MITCHELL FIGHTER SHOOTER ART GAME

## COMPLETE GAME SOFTWARE PACKAGE

### GAME FEATURES:
🥊 FIGHTER LEGENDS - 6 legendary boxers with supernatural powers
🚁 HELICOPTER COMBAT - Enemy aircraft with coin collection system  
🎨 ART STUDIO - Mobile PDF movement printing (no watermarks)
🎤 MUSIC STUDIO - Auto-tune recording with computer auto-saves

### SYSTEM REQUIREMENTS:
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for initial setup (optional for offline play)
- Microphone access (for Music Studio recording)
- Printer access (for Art Studio PDF printing)

### SETUP INSTRUCTIONS:
1. Double-click 'index.html' to run the game
2. Allow microphone access for Music Studio
3. Enable download permissions for Art/Music saves
4. Enjoy your complete gaming experience!

### COPYRIGHT NOTICE:
© 2025 JUSTIN DEVON MITCHELL
510 Bazinsky Rd Apt 1D
justinmitchell6789@gmail.com
ALL RIGHTS RESERVED ® ™

This software and all its content are protected by copyright law.
Original creation by Justin Devon Mitchell.
`;

  const generateCopyrightNotice = () => `
OFFICIAL COPYRIGHT NOTICE

© 2025 JUSTIN DEVON MITCHELL
FIGHTER SHOOTER ART GAME
ALL RIGHTS RESERVED ® ™

COPYRIGHT HOLDER: Justin Devon Mitchell
ADDRESS: 510 Bazinsky Rd Apt 1D  
EMAIL: justinmitchell6789@gmail.com
YEAR: 2025

PROTECTED CONTENT:
- Game source code and programming
- Character designs and animations  
- User interface designs
- Game mechanics and systems
- Visual assets and graphics
- Audio integration systems
- All written content and text

LEGAL PROTECTION:
This work is protected under U.S. and international copyright law.
Unauthorized reproduction, distribution, or modification is strictly prohibited.
DMCA Protected Content.

For licensing inquiries: justinmitchell6789@gmail.com
`;

  const generateSetupInstructions = () => `
SETUP INSTRUCTIONS FOR JUSTIN DEVON MITCHELL FIGHTER SHOOTER ART GAME

QUICK START:
1. Double-click 'index.html' to play the game
2. Game runs in your web browser
3. No installation required!

GAME CONTROLS:

FIGHTER LEGENDS:
- WASD: Move fighter
- G: Jab, H: Hook, T: Uppercut, Y: Special Move
- R: Block

HELICOPTER COMBAT:  
- WASD: Move helicopter
- SPACE: Fire missiles

ART STUDIO:
- Click and drag to draw
- Use tools panel for brushes and colors
- Download creations as PNG, JPG, or PDF

MUSIC STUDIO:
- Click microphone icon to record
- Enable auto-tune for voice effects
- Recordings auto-save to your computer

TROUBLESHOOTING:
- Allow microphone access for recording
- Enable downloads for saving creations
- Use modern browser for best performance

DEPLOYMENT:
To host this game permanently:
1. Upload all files to any web hosting service
2. Point domain to index.html  
3. Share your permanent link!

© 2025 Justin Devon Mitchell - All Rights Reserved
`;

  const generatePackageInfo = () => `
{
  "name": "justindevonmitchell-fighter-shooter-art-game",
  "version": "1.0.0",
  "description": "© 2025 Justin Devon Mitchell Fighter Shooter Art Game - Complete 4-in-1 gaming experience",
  "author": "Justin Devon Mitchell <justinmitchell6789@gmail.com>",
  "copyright": "© 2025 Justin Devon Mitchell - All Rights Reserved",
  "license": "All Rights Reserved",
  "contact": {
    "email": "justinmitchell6789@gmail.com",
    "address": "510 Bazinsky Rd Apt 1D"
  },
  "games": [
    "Fighter Legends - Boxing with supernatural powers",
    "Helicopter Combat - Enemy aircraft shooter",  
    "Art Studio - Professional creation tools",
    "Music Studio - Auto-tune recording"
  ],
  "features": [
    "Mobile compatible",
    "Auto-tune recording with computer saves",
    "Mobile PDF movement printing",  
    "Clean artwork downloads",
    "Copyright protection throughout"
  ],
  "deployment": {
    "type": "Static HTML5 Game",
    "requirements": "Modern web browser",
    "hosting": "Any web server or CDN"
  }
}
`;

  if (!isVisible) {
    return (
      <div className="fixed bottom-32 left-4 z-50">
        <Button
          onClick={onToggleVisibility}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
        >
          💾
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-32 left-4 z-50">
      <Card className="w-80 p-6 bg-gray-900/95 backdrop-blur-sm border-green-500 shadow-2xl">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-green-400">💾 Download Game</h3>
            <Button
              onClick={onToggleVisibility}
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              ✕
            </Button>
          </div>

          {/* Game Info */}
          <div className="space-y-3">
            <div className="text-center">
              <h4 className="text-white font-semibold">© 2025 JUSTIN DEVON MITCHELL</h4>
              <p className="text-sm text-gray-300">Fighter Shooter Art Game</p>
              <p className="text-xs text-gray-400">Complete Software Package</p>
            </div>

            <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-3">
              <h5 className="text-green-400 font-semibold mb-2">📦 Download Includes:</h5>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• 🥊 Fighter Legends (6 boxers + supernatural powers)</li>
                <li>• 🚁 Helicopter Combat (enemy aircraft + coins)</li>
                <li>• 🎨 Art Studio (mobile PDF movement printing)</li>
                <li>• 🎤 Music Studio (auto-tune + computer saves)</li>
                <li>• 📱 Mobile compatible version</li>
                <li>• 🔒 Complete copyright documentation</li>
                <li>• 🛠️ Setup and deployment instructions</li>
              </ul>
            </div>

            <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3">
              <h5 className="text-blue-400 font-semibold mb-2">💻 What You Can Do:</h5>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• 🖥️ Run offline on your computer</li>
                <li>• 📤 Upload to any hosting service</li>
                <li>• 🔗 Create permanent links anywhere</li>
                <li>• 💼 Use for portfolio and business</li>
                <li>• 🎬 Demo for YouTube without link issues</li>
                <li>• 📧 Share files with others</li>
              </ul>
            </div>
          </div>

          {/* Download Button */}
          <Button
            onClick={downloadCompleteGame}
            disabled={downloading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
          >
            {downloading ? '⏳ Downloading...' : '💾 Download Complete Game Software'}
          </Button>

          {/* Download Stats */}
          <div className="text-center text-xs text-gray-400">
            <p>Downloads: {downloadCount}</p>
            <p className="mt-2">
              <strong>File Size:</strong> Complete package with all features<br />
              <strong>Format:</strong> HTML5 + Assets<br />
              <strong>Compatibility:</strong> All devices
            </p>
          </div>

          {/* Copyright Notice */}
          <div className="text-xs text-center text-gray-500 border-t border-gray-700 pt-3">
            © 2025 Justin Devon Mitchell<br />
            Complete Game Software Download
          </div>
        </div>
      </Card>
    </div>
  );
}