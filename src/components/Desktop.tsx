import React, { useState } from 'react';
import { Taskbar } from './Taskbar';
import { Terminal } from './Terminal';
import { FileExplorer } from './FileExplorer';
import { AboutDialog } from './AboutDialog';
import { Heart, Folder, Monitor, Star } from 'lucide-react';

export const Desktop: React.FC = () => {
  const [openWindows, setOpenWindows] = useState<{
    terminal: boolean;
    fileExplorer: boolean;
    about: boolean;
  }>({
    terminal: false,
    fileExplorer: false,
    about: false
  });

  const [minimizedWindows, setMinimizedWindows] = useState<{
    terminal: boolean;
    fileExplorer: boolean;
    about: boolean;
  }>({
    terminal: false,
    fileExplorer: false,
    about: false
  });

  const openWindow = (window: keyof typeof openWindows) => {
    setOpenWindows(prev => ({ ...prev, [window]: true }));
    setMinimizedWindows(prev => ({ ...prev, [window]: false }));
  };

  const closeWindow = (window: keyof typeof openWindows) => {
    setOpenWindows(prev => ({ ...prev, [window]: false }));
    setMinimizedWindows(prev => ({ ...prev, [window]: false }));
  };

  const toggleMinimize = (window: keyof typeof minimizedWindows) => {
    setMinimizedWindows(prev => ({ ...prev, [window]: !prev[window] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 relative overflow-hidden">
      
      {/* Floating Desktop Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <Heart 
            key={`heart-${i}`}
            className="absolute text-pink-200/30 heart-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <Star 
            key={`star-${i}`}
            className="absolute text-yellow-300/40 sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 15 + 8}px`
            }}
          />
        ))}
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-8 left-8 space-y-6 z-10">
        <div 
          className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-110 transition-transform duration-200"
          onClick={() => openWindow('fileExplorer')}
        >
          <div className="p-4 bg-card/80 rounded-2xl glow-border">
            <Folder className="w-8 h-8 text-primary" />
          </div>
          <span className="text-xs text-center text-muted-foreground font-medium">
            My Computer
          </span>
        </div>

        <div 
          className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-110 transition-transform duration-200"
          onClick={() => openWindow('terminal')}
        >
          <div className="p-4 bg-card/80 rounded-2xl glow-border">
            <Monitor className="w-8 h-8 text-primary" />
          </div>
          <span className="text-xs text-center text-muted-foreground font-medium">
            Terminal
          </span>
        </div>

        <div 
          className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-110 transition-transform duration-200"
          onClick={() => openWindow('about')}
        >
          <div className="p-4 bg-card/80 rounded-2xl glow-border">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <span className="text-xs text-center text-muted-foreground font-medium">
            About Me
          </span>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-5">
        <h1 className="text-4xl font-bold text-primary glow-text mb-2">
          Welcome to NeeteshOS 💖
        </h1>
        <p className="text-muted-foreground">
          A cute and loveable operating system made with passion!
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Double-click icons to open applications ✨
        </p>
      </div>

      {/* Windows */}
      {openWindows.terminal && (
        <Terminal 
          onClose={() => closeWindow('terminal')}
          isMinimized={minimizedWindows.terminal}
          onToggleMinimize={() => toggleMinimize('terminal')}
        />
      )}

      {openWindows.fileExplorer && (
        <FileExplorer 
          onClose={() => closeWindow('fileExplorer')}
          isMinimized={minimizedWindows.fileExplorer}
          onToggleMinimize={() => toggleMinimize('fileExplorer')}
        />
      )}

      {openWindows.about && (
        <AboutDialog 
          onClose={() => closeWindow('about')}
          isMinimized={minimizedWindows.about}
          onToggleMinimize={() => toggleMinimize('about')}
        />
      )}

      {/* Taskbar */}
      <Taskbar 
        openWindows={openWindows}
        minimizedWindows={minimizedWindows}
        onOpenWindow={openWindow}
        onToggleMinimize={toggleMinimize}
      />
    </div>
  );
};