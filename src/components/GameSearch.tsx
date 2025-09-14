'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  description: string;
  action: () => void;
  icon: string;
}

interface GameSearchProps {
  isVisible: boolean;
  onToggleVisibility: () => void;
  onNavigate: (section: string) => void;
}

export default function GameSearch({ isVisible, onToggleVisibility, onNavigate }: GameSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showAll, setShowAll] = useState(true);

  // Comprehensive index of all game features
  const gameIndex: SearchResult[] = [
    // Fighter Legends
    {
      id: 'fighter-game',
      title: 'Fighter Legends',
      category: 'Games',
      description: 'Boxing game with 6 legendary fighters: Mike Tyson, Muhammad Ali, Evander Holyfield, Rocky Balboa, Sugar Ray Leonard, George Foreman',
      action: () => onNavigate('fight-night'),
      icon: '🥊'
    },
    {
      id: 'mike-tyson',
      title: 'Mike Tyson "The Destroyer"',
      category: 'Fighters',
      description: 'Lightning Punch special move, devastating knockout power, youngest heavyweight champion',
      action: () => onNavigate('fight-night'),
      icon: '👑'
    },
    {
      id: 'muhammad-ali',
      title: 'Muhammad Ali "The Greatest"',
      category: 'Fighters',
      description: 'Float Like Butterfly special move, unmatched footwork, greatest boxer of all time',
      action: () => onNavigate('fight-night'),
      icon: '🦋'
    },
    {
      id: 'boxing-controls',
      title: 'Boxing Controls',
      category: 'Controls',
      description: 'WASD: Move, G: Jab, H: Hook, T: Uppercut, Y: Special Move, R: Block',
      action: () => onNavigate('fight-night'),
      icon: '🎮'
    },

    // Helicopter Combat
    {
      id: 'helicopter-game',
      title: 'Helicopter Combat',
      category: 'Games',
      description: 'Combat helicopter vs enemy aircraft, fireball missiles, coin collection system',
      action: () => onNavigate('helicopter'),
      icon: '🚁'
    },
    {
      id: 'helicopter-controls',
      title: 'Helicopter Controls',
      category: 'Controls',
      description: 'WASD: Move helicopter, SPACE: Fire missiles, destroy enemies to earn coins',
      action: () => onNavigate('helicopter'),
      icon: '🎮'
    },
    {
      id: 'enemy-aircraft',
      title: 'Enemy Aircraft',
      category: 'Gameplay',
      description: 'Fighter jets, bombers, and scouts with different attack patterns and rewards',
      action: () => onNavigate('helicopter'),
      icon: '✈️'
    },

    // Art Studio
    {
      id: 'art-studio',
      title: 'Digital Art Studio',
      category: 'Games',
      description: 'Professional drawing tools, 30-color palette, mobile PDF movement printing, free downloads',
      action: () => onNavigate('art-studio'),
      icon: '🎨'
    },
    {
      id: 'drawing-tools',
      title: 'Drawing Tools',
      category: 'Art Features',
      description: 'Brush, pencil, eraser with adjustable size and opacity, 30 professional colors',
      action: () => onNavigate('art-studio'),
      icon: '🖌️'
    },
    {
      id: 'pdf-printing',
      title: 'Mobile PDF Movement Printing',
      category: 'Art Features',
      description: '8-frame animation PDF for creating movement art on paper, mobile-optimized printing',
      action: () => onNavigate('art-studio'),
      icon: '📄'
    },
    {
      id: 'art-downloads',
      title: 'Free Art Downloads',
      category: 'Downloads',
      description: 'Download artwork as PNG, JPG, or PDF - no watermarks, clean downloads',
      action: () => onNavigate('art-studio'),
      icon: '💾'
    },

    // Music Studio
    {
      id: 'music-studio',
      title: 'Music Studio',
      category: 'Games',
      description: 'Record voice with auto-tune effects, background beats, computer auto-saves',
      action: () => onNavigate('music-studio'),
      icon: '🎤'
    },
    {
      id: 'auto-tune',
      title: 'Auto-tune Recording',
      category: 'Music Features',
      description: 'Professional voice pitch correction with adjustable intensity (0-100%)',
      action: () => onNavigate('music-studio'),
      icon: '🎛️'
    },
    {
      id: 'background-beats',
      title: 'Background Beats',
      category: 'Music Features',
      description: '4 beat styles: Hip-Hop (90 BPM), Rock (120 BPM), Electronic (128 BPM), Trap (140 BPM)',
      action: () => onNavigate('music-studio'),
      icon: '🥁'
    },
    {
      id: 'recording-saves',
      title: 'Recording Auto-saves',
      category: 'Downloads',
      description: 'Recordings automatically download to computer with auto-tune settings in filename',
      action: () => onNavigate('music-studio'),
      icon: '💾'
    },

    // Technical Features
    {
      id: 'mobile-support',
      title: 'Mobile Support',
      category: 'Technical',
      description: 'Touch controls, finger painting, mobile recording, phone-optimized interfaces',
      action: () => onNavigate('hub'),
      icon: '📱'
    },
    {
      id: 'offline-play',
      title: 'Offline Play',
      category: 'Technical',
      description: 'Download complete game software for offline play without internet connection',
      action: () => onNavigate('download'),
      icon: '💻'
    },
    {
      id: 'copyright-protection',
      title: 'Copyright Protection',
      category: 'Legal',
      description: '© 2025 Justin Devon Mitchell, 510 Bazinsky Rd Apt 1D, justinmitchell6789@gmail.com',
      action: () => onNavigate('copyright'),
      icon: '🔒'
    },

    // Music Player
    {
      id: 'music-player',
      title: 'Custom Music Player',
      category: 'Audio',
      description: 'Upload your own MP3 songs and play during gaming across all experiences',
      action: () => onNavigate('music-player'),
      icon: '🎵'
    },

    // Special Features
    {
      id: 'trophy-system',
      title: 'Trophy & Coin System',
      category: 'Rewards',
      description: 'Earn trophies for match victories and coins for successful attacks across all games',
      action: () => onNavigate('fight-night'),
      icon: '🏆'
    },
    {
      id: 'special-moves',
      title: 'Supernatural Special Moves',
      category: 'Combat',
      description: 'Fireball attacks unique to each fighter: Lightning, Butterfly, Holy Fire, Thunder, Sugar Rush',
      action: () => onNavigate('fight-night'),
      icon: '⚡'
    }
  ];

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults(showAll ? gameIndex : []);
    } else {
      const filtered = gameIndex.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchQuery, showAll]);

  const categories = [...new Set(gameIndex.map(item => item.category))];

  const filterByCategory = (category: string) => {
    const filtered = gameIndex.filter(item => item.category === category);
    setSearchResults(filtered);
    setSearchQuery('');
  };

  if (!isVisible) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={onToggleVisibility}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
        >
          🔍
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-96">
      <Card className="bg-gray-900/95 backdrop-blur-sm border-blue-500 shadow-2xl max-h-96 overflow-hidden">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-blue-400">🔍 Game Index Search</h3>
            <Button
              onClick={onToggleVisibility}
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              ✕
            </Button>
          </div>

          {/* Search Input */}
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Search games, features, controls..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => {
                setShowAll(true);
                setSearchQuery('');
              }}
              size="sm"
              variant={showAll ? 'default' : 'outline'}
              className="text-xs"
            >
              All ({gameIndex.length})
            </Button>
            {categories.map(category => {
              const count = gameIndex.filter(item => item.category === category).length;
              return (
                <Button
                  key={category}
                  onClick={() => filterByCategory(category)}
                  size="sm"
                  variant="outline"
                  className="text-xs border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  {category} ({count})
                </Button>
              );
            })}
          </div>

          {/* Search Results */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {searchResults.length === 0 && searchQuery.trim() !== '' ? (
              <div className="text-center text-gray-400 py-4">
                <p>No results found for "{searchQuery}"</p>
                <p className="text-sm">Try searching for: games, fighter, helicopter, art, music, controls</p>
              </div>
            ) : (
              searchResults.map((result) => (
                <div
                  key={result.id}
                  onClick={() => {
                    result.action();
                    onToggleVisibility();
                  }}
                  className="p-3 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{result.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-white text-sm">{result.title}</div>
                      <div className="text-xs text-blue-400 mb-1">{result.category}</div>
                      <div className="text-xs text-gray-400 line-clamp-2">{result.description}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Access */}
          <div className="border-t border-gray-700 pt-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">🚀 Quick Access</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => {
                  onNavigate('fight-night');
                  onToggleVisibility();
                }}
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white text-xs"
              >
                🥊 Boxing
              </Button>
              <Button
                onClick={() => {
                  onNavigate('helicopter');
                  onToggleVisibility();
                }}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
              >
                🚁 Helicopter
              </Button>
              <Button
                onClick={() => {
                  onNavigate('art-studio');
                  onToggleVisibility();
                }}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white text-xs"
              >
                🎨 Art Studio
              </Button>
              <Button
                onClick={() => {
                  onNavigate('music-studio');
                  onToggleVisibility();
                }}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs"
              >
                🎤 Music Studio
              </Button>
            </div>
          </div>

          {/* Search Tips */}
          <div className="text-xs text-gray-500 bg-gray-800/50 rounded p-2">
            <p><strong>🔍 Search Tips:</strong></p>
            <p>• Try: "mike tyson", "auto-tune", "mobile", "download"</p>
            <p>• Browse categories: Games, Controls, Features</p>
            <p>• Use quick access buttons for instant navigation</p>
          </div>

          {/* Copyright Notice */}
          <div className="text-xs text-center text-gray-500 border-t border-gray-700 pt-2">
            © 2025 Justin Devon Mitchell Game Index
          </div>
        </div>
      </Card>
    </div>
  );
}