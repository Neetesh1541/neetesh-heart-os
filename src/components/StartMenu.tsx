import React from 'react';
import { Heart, Monitor, Folder, User, Settings, Power, Search, Star, Code, Image, Calculator, FileText, Palette, Activity } from 'lucide-react';

interface StartMenuProps {
  onClose: () => void;
  onOpenWindow: (window: 'terminal' | 'fileExplorer' | 'about' | 'calculator' | 'textEditor' | 'paint' | 'taskManager' | 'systemSettings') => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ onClose, onOpenWindow }) => {
  
  const handleAppClick = (app: 'terminal' | 'fileExplorer' | 'about' | 'calculator' | 'textEditor' | 'paint' | 'taskManager' | 'systemSettings') => {
    onOpenWindow(app);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Start Menu */}
      <div className="fixed bottom-12 left-2 w-80 window-chrome z-50">
        
        {/* Header */}
        <div className="bg-window-header p-4 border-b border-window-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white heart-pulse" />
            </div>
            <div>
              <p className="font-semibold text-primary">Neetesh Kumar</p>
              <p className="text-xs text-muted-foreground">Full-Stack Developer 💻</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search for apps, files, and more..."
              className="w-full pl-10 pr-4 py-2 bg-muted/50 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Applications */}
        <div className="p-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3 flex items-center">
            <Star className="w-3 h-3 mr-1" />
            APPLICATIONS
          </h3>
          
          <div className="space-y-1">
            
            <button
              onClick={() => handleAppClick('terminal')}
              className="w-full flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors text-left"
            >
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <Monitor className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Terminal</p>
                <p className="text-xs text-muted-foreground">Command line interface</p>
              </div>
            </button>

            <button
              onClick={() => handleAppClick('fileExplorer')}
              className="w-full flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors text-left"
            >
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                <Folder className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium">File Explorer</p>
                <p className="text-xs text-muted-foreground">Browse files and folders</p>
              </div>
            </button>

            <button
              onClick={() => handleAppClick('about')}
              className="w-full flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors text-left"
            >
              <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">About Me</p>
                <p className="text-xs text-muted-foreground">Developer information</p>
              </div>
            </button>

            <button
              onClick={() => handleAppClick('calculator')}
              className="w-full flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors text-left"
            >
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Calculator className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Calculator</p>
                <p className="text-xs text-muted-foreground">Perform calculations</p>
              </div>
            </button>

            <button
              onClick={() => handleAppClick('textEditor')}
              className="w-full flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors text-left"
            >
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Notepad</p>
                <p className="text-xs text-muted-foreground">Text editor</p>
              </div>
            </button>

            <button
              onClick={() => handleAppClick('paint')}
              className="w-full flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors text-left"
            >
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Palette className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Paint</p>
                <p className="text-xs text-muted-foreground">Drawing application</p>
              </div>
            </button>

            <button
              onClick={() => handleAppClick('taskManager')}
              className="w-full flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors text-left"
            >
              <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Task Manager</p>
                <p className="text-xs text-muted-foreground">Monitor system processes</p>
              </div>
            </button>

            {/* Divider */}
            <div className="my-3 border-t border-border"></div>

            {/* Additional Apps */}
            <button className="w-full flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors text-left">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Code Editor</p>
                <p className="text-xs text-muted-foreground">Development environment</p>
              </div>
            </button>

            <button className="w-full flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors text-left">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Image className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Gallery</p>
                <p className="text-xs text-muted-foreground">View images and media</p>
              </div>
            </button>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            
            <button 
              onClick={() => handleAppClick('systemSettings')}
              className="flex items-center space-x-2 px-3 py-2 hover:bg-muted/50 rounded-lg transition-colors text-sm"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>

            <button className="flex items-center space-x-2 px-3 py-2 hover:bg-destructive/20 hover:text-destructive rounded-lg transition-colors text-sm">
              <Power className="w-4 h-4" />
              <span>Shutdown</span>
            </button>

          </div>
        </div>

        {/* Cute Footer Message */}
        <div className="px-4 pb-3 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center">
            Made with <Heart className="w-3 h-3 mx-1 text-primary heart-pulse" /> in NeeteshOS
          </p>
        </div>

      </div>
    </>
  );
};