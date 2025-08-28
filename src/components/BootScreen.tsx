import React, { useState, useEffect } from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';

interface BootScreenProps {
  onBootComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [bootStage, setBootStage] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    const stages = [
      () => setTimeout(() => setBootStage(1), 1000),
      () => setTimeout(() => setBootStage(2), 2000),
      () => setTimeout(() => setShowHearts(true), 3000),
      () => setTimeout(() => setBootStage(3), 4000),
      () => setTimeout(() => onBootComplete(), 5500)
    ];

    const timeouts = stages.map((stage, index) => 
      setTimeout(stage, index * 500)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [onBootComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 flex items-center justify-center relative overflow-hidden">
      
      {/* Floating Hearts Animation */}
      {showHearts && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <Heart 
              key={i}
              className={`absolute text-pink-300 heart-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${Math.random() * 20 + 10}px`
              }}
            />
          ))}
        </div>
      )}

      <div className="text-center space-y-8 z-10">
        
        {/* Main Boot Message */}
        {bootStage >= 1 && (
          <div className="glow-text">
            <h1 className="text-6xl font-bold text-white mb-4">
              ✨ Welcome to NeeteshOS ✨
            </h1>
            <p className="text-2xl text-pink-200">
              Made with Love 💕
            </p>
          </div>
        )}

        {/* ASCII Art */}
        {bootStage >= 2 && (
          <div className="font-mono text-sm text-pink-300 cute-bounce">
            <pre>{`
    ♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
    ♡  ･ﾟ✧*:･ﾟ✧ NEETESH ✧･ﾟ: *✧･ﾟ  ♡
    ♡           OS  v1.0          ♡
    ♡     ────────────────────    ♡
    ♡        ♡(｡◕‿◕｡)♡         ♡
    ♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
            `}</pre>
          </div>
        )}

        {/* Loading Animation */}
        {bootStage >= 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="text-yellow-300 sparkle" />
              <span className="text-pink-200">Initializing cute kernel...</span>
              <Sparkles className="text-yellow-300 sparkle" />
            </div>
            
            <div className="w-64 bg-purple-800/50 rounded-full h-3 mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse w-full"></div>
            </div>
            
            <p className="text-sm text-pink-300 glow-text">
              Loading with extra love and care... 💖
            </p>
          </div>
        )}

      </div>

      {/* Sparkle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <Star 
            key={i}
            className="absolute text-yellow-300 sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 15 + 5}px`
            }}
          />
        ))}
      </div>
    </div>
  );
};