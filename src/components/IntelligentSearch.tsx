'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface SearchAnswer {
  question: string;
  answer: string;
  category: string;
  relatedTopics: string[];
  actionSuggestion?: string;
}

interface IntelligentSearchProps {
  isVisible: boolean;
  onToggleVisibility: () => void;
  onNavigate: (section: string) => void;
}

export default function IntelligentSearch({ isVisible, onToggleVisibility, onNavigate }: IntelligentSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchAnswer, setSearchAnswer] = useState<SearchAnswer | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // AI Knowledge Base for Intelligent Answers
  const knowledgeBase = {
    // Game Questions
    'what games are included': {
      answer: 'Your © 2025 Justin Devon Mitchell Fighter Shooter Art Game includes 4 complete experiences: 🥊 Fighter Legends (boxing with 6 legendary fighters), 🚁 Helicopter Combat (aerial shooter), 🎨 Art Studio (professional drawing tools), and 🎤 Music Studio (recording with auto-tune).',
      category: 'Games Overview',
      relatedTopics: ['fighter legends', 'helicopter combat', 'art studio', 'music studio'],
      actionSuggestion: 'Click any game card to start playing!'
    },
    
    // Fighter Legends Questions
    'who are the fighters': {
      answer: 'The legendary boxers are: Mike Tyson "The Destroyer" (Lightning Punch), Muhammad Ali "The Greatest" (Float Like Butterfly), Evander Holyfield "The Real Deal" (Holy Fire Uppercut), Rocky Balboa "Italian Stallion" (Rocky Thunder Strike), Sugar Ray Leonard "Sweet Science" (Sugar Rush Flurry), and George Foreman "Big George" (Foreman Grill Slam).',
      category: 'Fighter Legends',
      relatedTopics: ['mike tyson', 'muhammad ali', 'special moves', 'boxing controls'],
      actionSuggestion: 'Start Fighter Legends to choose your boxer!'
    },
    
    'how to play fighter game': {
      answer: 'Fighter Legends controls: WASD to move your boxer, G for Jab (quick punch), H for Hook (power punch), T for Uppercut (devastating attack), Y for Special Move (supernatural fireball attack), and R to Block (reduce damage). Build combos by chaining attacks within 1 second to increase damage!',
      category: 'Fighter Controls',
      relatedTopics: ['boxing moves', 'special attacks', 'combo system', 'blocking'],
      actionSuggestion: 'Enter Fighter Legends to practice these moves!'
    },
    
    'mike tyson special move': {
      answer: 'Mike Tyson "The Destroyer" has the Lightning Punch special move. This devastating attack creates lightning-based projectiles that deal massive damage. Build your special meter by landing combos, then press Y to unleash the Lightning Punch when the meter is charged!',
      category: 'Special Moves',
      relatedTopics: ['lightning attack', 'special meter', 'mike tyson', 'supernatural powers'],
      actionSuggestion: 'Select Mike Tyson in Fighter Legends to use Lightning Punch!'
    },
    
    // Helicopter Combat Questions
    'how to play helicopter game': {
      answer: 'Helicopter Combat controls: WASD to move your combat helicopter around the sky, SPACE to fire fireball missiles at enemy aircraft. Destroy enemies to earn coins - Fighter jets give 10 coins, Bombers give 15 coins, Scouts give 5 coins. Avoid enemy collisions or your health decreases!',
      category: 'Helicopter Controls',
      relatedTopics: ['helicopter controls', 'missile firing', 'enemy types', 'coin collection'],
      actionSuggestion: 'Start Helicopter Combat to begin your aerial mission!'
    },
    
    'helicopter enemies': {
      answer: 'Enemy aircraft types: Fighter Jets (fast, aggressive, 10 coins), Bombers (large, slow, 15 coins), and Scouts (small, very fast, 5 coins). Each type has different movement patterns and AI behaviors. Destroy them with fireball missiles to earn coins and increase your score!',
      category: 'Helicopter Gameplay',
      relatedTopics: ['enemy types', 'coin rewards', 'aircraft combat', 'scoring system'],
      actionSuggestion: 'Practice in Helicopter Combat to learn enemy patterns!'
    },
    
    // Art Studio Questions
    'how to use art studio': {
      answer: 'Art Studio features: Select brush tools (🖌️ Brush, ✏️ Pencil, 🧹 Eraser), choose from 30 professional colors, adjust size (1-50px) and opacity (10-100%). Click and drag to draw, use touch on mobile for finger painting. Download your art as PNG, JPG, or PDF with movement animation frames!',
      category: 'Art Studio',
      relatedTopics: ['drawing tools', 'color palette', 'mobile drawing', 'pdf downloads'],
      actionSuggestion: 'Open Art Studio to start creating your masterpiece!'
    },
    
    'movement pdf printing': {
      answer: 'Movement PDF creates 8 frames of your artwork with slight position, rotation, and scale variations. When printed and cut out, these frames can be stacked and flipped like a flipbook to create paper animation! The PDF is mobile-optimized with cut guides and instructions for creating movement on paper.',
      category: 'Art Features',
      relatedTopics: ['pdf animation', 'paper flipbook', 'mobile printing', 'movement art'],
      actionSuggestion: 'Create artwork in Art Studio, then click "Download PDF" to try it!'
    },
    
    // Music Studio Questions
    'how to record music': {
      answer: 'Music Studio recording: Click 🎤 Music Studio, select a background beat (Hip-Hop, Rock, Electronic, or Trap), click "Start Recording" and allow microphone access. Sing or speak into your microphone, enable auto-tune for voice effects (0-100% intensity), then stop recording. Your recording auto-saves to your computer with auto-tune settings in the filename!',
      category: 'Music Studio',
      relatedTopics: ['voice recording', 'auto-tune effects', 'background beats', 'computer saves'],
      actionSuggestion: 'Open Music Studio to start recording your voice!'
    },
    
    'auto-tune how it works': {
      answer: 'Auto-tune applies professional voice pitch correction using Web Audio API. Adjust the intensity from 0% (natural voice) to 100% (heavy auto-tune effect). The system uses compression, filtering, and harmonic enhancement for realistic auto-tune sound. Works during recording and playback, with sound effects indicating when auto-tune is active.',
      category: 'Auto-tune Technology',
      relatedTopics: ['voice effects', 'pitch correction', 'audio processing', 'recording quality'],
      actionSuggestion: 'Try different auto-tune levels in Music Studio to hear the effects!'
    },
    
    // Mobile Questions
    'mobile features': {
      answer: 'Mobile compatibility includes: Touch controls for all games (finger navigation), finger painting in Art Studio, mobile recording using phone microphone, mobile-optimized PDF printing with phone-friendly layouts, responsive design for all screen sizes, and touch-optimized interfaces for easy phone use.',
      category: 'Mobile Support',
      relatedTopics: ['touch controls', 'finger painting', 'mobile recording', 'phone optimization'],
      actionSuggestion: 'Try the game on your phone to experience mobile features!'
    },
    
    // Download Questions
    'how to download': {
      answer: 'Download options: 1) Complete Game Software - Click green download button for offline playable version, 2) Art Downloads - Save artwork as PNG/JPG/PDF, 3) Recording Downloads - Auto-save voice recordings with auto-tune settings, 4) Browser Save - Right-click page and "Save As" for complete game files.',
      category: 'Downloads',
      relatedTopics: ['offline play', 'game software', 'art downloads', 'recording saves'],
      actionSuggestion: 'Click the green download button to get your complete game!'
    },
    
    'offline play': {
      answer: 'Offline play works by downloading the complete game as an HTML file that runs in your browser without internet. All 4 games are included with full functionality: boxing, helicopter combat, art creation, and music recording. Double-click the downloaded file to play anytime, anywhere, completely offline!',
      category: 'Offline Features',
      relatedTopics: ['game download', 'offline gaming', 'no internet needed', 'local play'],
      actionSuggestion: 'Download the complete game software for offline play!'
    },
    
    // Copyright Questions  
    'copyright information': {
      answer: '© 2025 JUSTIN DEVON MITCHELL - ALL RIGHTS RESERVED ® ™. Contact: justinmitchell6789@gmail.com, Address: 510 Bazinsky Rd Apt 1D. This game and all content are protected by copyright law. Original creation with DMCA protection. For licensing inquiries, contact the copyright holder.',
      category: 'Legal Information',
      relatedTopics: ['copyright owner', 'contact info', 'legal protection', 'licensing'],
      actionSuggestion: 'Contact justinmitchell6789@gmail.com for licensing inquiries!'
    },
    
    // Technical Questions
    'system requirements': {
      answer: 'System requirements: Modern web browser (Chrome, Firefox, Safari, Edge), microphone access for Music Studio recording, download permissions for saving art and music, printer access for PDF printing (optional). Works on desktop, mobile, and tablet devices. No installation required!',
      category: 'Technical Requirements',
      relatedTopics: ['browser compatibility', 'microphone access', 'mobile support', 'no installation'],
      actionSuggestion: 'Your current browser should work perfectly!'
    }
  };

  const getIntelligentAnswer = (query: string): SearchAnswer | null => {
    const normalizedQuery = query.toLowerCase().trim();
    
    // Direct keyword matching
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
        return {
          question: query,
          answer: value.answer,
          category: value.category,
          relatedTopics: value.relatedTopics,
          actionSuggestion: value.actionSuggestion
        };
      }
    }
    
    // Semantic matching for common terms
    const semanticMatches: { [key: string]: string } = {
      'tyson': 'mike tyson special move',
      'ali': 'who are the fighters', 
      'boxing': 'how to play fighter game',
      'helicopter': 'how to play helicopter game',
      'drawing': 'how to use art studio',
      'art': 'how to use art studio',
      'record': 'how to record music',
      'voice': 'how to record music',
      'tune': 'auto-tune how it works',
      'phone': 'mobile features',
      'mobile': 'mobile features',
      'save': 'how to download',
      'download': 'how to download',
      'offline': 'offline play',
      'copyright': 'copyright information',
      'legal': 'copyright information',
      'requirements': 'system requirements'
    };
    
    for (const [term, key] of Object.entries(semanticMatches)) {
      if (normalizedQuery.includes(term)) {
        const knowledge = knowledgeBase[key as keyof typeof knowledgeBase];
        return {
          question: query,
          answer: knowledge.answer,
          category: knowledge.category,
          relatedTopics: knowledge.relatedTopics,
          actionSuggestion: knowledge.actionSuggestion
        };
      }
    }
    
    return null;
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate AI processing delay for realistic feel
    setTimeout(() => {
      const answer = getIntelligentAnswer(searchQuery);
      
      if (answer) {
        setSearchAnswer(answer);
        setSearchHistory([searchQuery, ...searchHistory.slice(0, 4)]);
      } else {
        // Fallback answer for unmatched queries
        setSearchAnswer({
          question: searchQuery,
          answer: `I found information related to "${searchQuery}" in your game. Your © 2025 Justin Devon Mitchell Fighter Shooter Art Game includes 4 complete experiences with extensive features. Try searching for specific terms like "fighter", "helicopter", "art", "music", "mobile", "download", or "controls" for detailed information.`,
          category: 'General Information',
          relatedTopics: ['games overview', 'features list', 'search tips'],
          actionSuggestion: 'Try more specific search terms or browse the game sections!'
        });
      }
      
      setIsSearching(false);
    }, 800);
  };

  const suggestedQuestions = [
    "How do I play the fighter game?",
    "What are Mike Tyson's special moves?", 
    "How does auto-tune recording work?",
    "How to download the game offline?",
    "What mobile features are available?",
    "How to create movement art PDF?",
    "What are the helicopter controls?",
    "How to save my recordings?"
  ];

  if (!isVisible) {
    return (
      <div className="fixed top-16 right-4 z-50">
        <Button
          onClick={onToggleVisibility}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
        >
          🧠
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-16 right-4 z-50 w-96">
      <Card className="bg-gray-900/95 backdrop-blur-sm border-indigo-500 shadow-2xl max-h-96 overflow-hidden">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-indigo-400">🧠 AI Game Assistant</h3>
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
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Ask anything about your game..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-gray-800 border-gray-600 text-white"
              />
              <Button
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                size="sm"
              >
                {isSearching ? '🔄' : '🔍'}
              </Button>
            </div>
          </div>

          {/* Search Answer */}
          {searchAnswer && (
            <div className="space-y-3 max-h-48 overflow-y-auto">
              <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg p-3">
                <div className="text-sm font-semibold text-indigo-400 mb-2">
                  💡 Answer: "{searchAnswer.question}"
                </div>
                <div className="text-sm text-gray-300 mb-3 leading-relaxed">
                  {searchAnswer.answer}
                </div>
                
                {searchAnswer.actionSuggestion && (
                  <div className="bg-green-900/30 border border-green-500/30 rounded p-2 mb-3">
                    <div className="text-xs font-semibold text-green-400">💡 Suggestion:</div>
                    <div className="text-xs text-green-300">{searchAnswer.actionSuggestion}</div>
                  </div>
                )}
                
                {searchAnswer.relatedTopics.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-gray-400">🔗 Related Topics:</div>
                    <div className="flex flex-wrap gap-1">
                      {searchAnswer.relatedTopics.map((topic, index) => (
                        <Button
                          key={index}
                          onClick={() => {
                            setSearchQuery(topic);
                            handleSearch();
                          }}
                          size="sm"
                          variant="outline"
                          className="text-xs px-2 py-1 h-auto border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          {topic}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Suggested Questions */}
          {!searchAnswer && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-300">❓ Ask me anything:</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      setSearchQuery(question);
                      setTimeout(() => handleSearch(), 100);
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start text-xs border-gray-600 text-gray-300 hover:bg-gray-700 h-auto py-2"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-300">📝 Recent Searches:</h4>
              <div className="space-y-1">
                {searchHistory.slice(0, 3).map((query, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      setSearchQuery(query);
                      setTimeout(() => handleSearch(), 100);
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start text-xs border-gray-600 text-gray-400 hover:bg-gray-700 h-auto py-1"
                  >
                    🔍 {query}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="border-t border-gray-700 pt-3">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">⚡ Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => {
                  setSearchQuery("How to play fighter game?");
                  setTimeout(() => handleSearch(), 100);
                }}
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white text-xs h-auto py-2"
              >
                🥊 Boxing Help
              </Button>
              <Button
                onClick={() => {
                  setSearchQuery("How to record music?");
                  setTimeout(() => handleSearch(), 100);
                }}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs h-auto py-2"
              >
                🎤 Recording Help
              </Button>
              <Button
                onClick={() => {
                  setSearchQuery("Mobile features");
                  setTimeout(() => handleSearch(), 100);
                }}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-auto py-2"
              >
                📱 Mobile Guide
              </Button>
              <Button
                onClick={() => {
                  setSearchQuery("How to download");
                  setTimeout(() => handleSearch(), 100);
                }}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white text-xs h-auto py-2"
              >
                💾 Download Help
              </Button>
            </div>
          </div>

          {/* Search Tips */}
          <div className="text-xs text-gray-500 bg-gray-800/50 rounded p-2">
            <p><strong>🧠 AI Assistant Features:</strong></p>
            <p>• Ask questions in natural language</p>
            <p>• Get detailed answers about any game feature</p>
            <p>• Receive action suggestions and navigation help</p>
            <p>• Browse related topics for deeper learning</p>
          </div>

          {/* Copyright Notice */}
          <div className="text-xs text-center text-gray-500 border-t border-gray-700 pt-2">
            © 2025 Justin Devon Mitchell AI Assistant
          </div>
        </div>
      </Card>
    </div>
  );
}