import React, { useState } from 'react';
import { Heart, Monitor, Folder, User, Menu, Search, Clock } from 'lucide-react';
import { StartMenu } from './StartMenu';

interface TaskbarProps {
  openWindows: {
    terminal: boolean;
    fileExplorer: boolean;
    about: boolean;
  };
  minimizedWindows: {
    terminal: boolean;
    fileExplorer: boolean;
    about: boolean;
  };
  onOpenWindow: (window: keyof TaskbarProps['openWindows']) => void;
  onToggleMinimize: (window: keyof TaskbarProps['minimizedWindows']) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  openWindows,
  minimizedWindows,
  onOpenWindow,
  onToggleMinimize
}) => {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu 
          onClose={() => setShowStartMenu(false)}
          onOpenWindow={onOpenWindow}
        />
      )}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 taskbar h-12 flex items-center justify-between px-2 z-30">
        
        {/* Start Button */}
        <button
          onClick={() => setShowStartMenu(!showStartMenu)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors duration-200 glow-border"
        >
          <Heart className="w-5 h-5 text-primary heart-pulse" />
          <span className="text-sm font-medium text-primary">Start</span>
        </button>

        {/* Quick Access & Running Apps */}
        <div className="flex items-center space-x-2">
          
          {/* Search */}
          <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Running Applications */}
          <div className="flex items-center space-x-1">
            
            {/* Terminal */}
            {openWindows.terminal && (
              <button
                onClick={() => onToggleMinimize('terminal')}
                className={`p-2 rounded-lg transition-colors ${
                  minimizedWindows.terminal 
                    ? 'bg-muted/50 hover:bg-muted/70' 
                    : 'bg-primary/20 hover:bg-primary/30 glow-border'
                }`}
              >
                <Monitor className="w-5 h-5 text-primary" />
              </button>
            )}

            {/* File Explorer */}
            {openWindows.fileExplorer && (
              <button
                onClick={() => onToggleMinimize('fileExplorer')}
                className={`p-2 rounded-lg transition-colors ${
                  minimizedWindows.fileExplorer 
                    ? 'bg-muted/50 hover:bg-muted/70' 
                    : 'bg-primary/20 hover:bg-primary/30 glow-border'
                }`}
              >
                <Folder className="w-5 h-5 text-primary" />
              </button>
            )}

            {/* About */}
            {openWindows.about && (
              <button
                onClick={() => onToggleMinimize('about')}
                className={`p-2 rounded-lg transition-colors ${
                  minimizedWindows.about 
                    ? 'bg-muted/50 hover:bg-muted/70' 
                    : 'bg-primary/20 hover:bg-primary/30 glow-border'
                }`}
              >
                <User className="w-5 h-5 text-primary" />
              </button>
            )}

          </div>
        </div>

        {/* System Tray */}
        <div className="flex items-center space-x-3">
          
          {/* System Icons */}
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4 text-primary heart-pulse" />
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>

          {/* Clock */}
          <div className="text-sm font-medium text-taskbar-foreground flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <div className="text-right">
              <div>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              <div className="text-xs opacity-75">
                {currentTime.toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};