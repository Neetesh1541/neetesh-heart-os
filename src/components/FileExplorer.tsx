import React from 'react';
import { X, Minimize2, Folder, File, Heart, Star, Code, Image } from 'lucide-react';

interface FileExplorerProps {
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({ onClose, isMinimized, onToggleMinimize }) => {
  if (isMinimized) return null;

  const folders = [
    { name: '💕 My Projects', icon: Folder, items: 6 },
    { name: '✨ Documents', icon: Folder, items: 12 },
    { name: '🎨 Pictures', icon: Image, items: 25 },
    { name: '💻 Code', icon: Code, items: 8 }
  ];

  const files = [
    { name: 'FakeFact_AI_Tool.py', icon: File, size: '2.1 MB', type: 'Python' },
    { name: 'BhedChaal_Detection.js', icon: File, size: '1.8 MB', type: 'JavaScript' },
    { name: 'MummyMeals_Startup.jsx', icon: File, size: '950 KB', type: 'React' },
    { name: 'Portfolio_Maker.html', icon: File, size: '1.2 MB', type: 'HTML' },
    { name: 'Net_AI_Project.py', icon: File, size: '3.4 MB', type: 'Python' },
    { name: 'BodyDance_Clone.css', icon: File, size: '680 KB', type: 'CSS' }
  ];

  return (
    <div className="window-chrome w-full max-w-4xl h-96 flex flex-col absolute top-32 right-8 z-20">
      {/* Window Header */}
      <div className="flex items-center justify-between p-2 bg-window-header border-b border-window-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="ml-2 text-sm font-medium flex items-center">
            <Folder className="w-4 h-4 mr-1 text-primary" />
            My Computer - Neetesh's Files
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <button 
            onClick={onToggleMinimize}
            className="p-1 hover:bg-muted rounded"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-destructive hover:text-destructive-foreground rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* File Explorer Content */}
      <div className="flex-1 bg-card p-4">
        
        {/* Address Bar */}
        <div className="bg-muted/50 rounded-lg p-2 mb-4 flex items-center space-x-2">
          <Folder className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">C:\Users\Neetesh\</span>
        </div>

        <div className="grid grid-cols-2 gap-4 h-full">
          
          {/* Folders Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center text-primary">
              <Heart className="w-4 h-4 mr-1" />
              Folders
            </h3>
            <div className="space-y-2">
              {folders.map((folder, i) => (
                <div 
                  key={i}
                  className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                >
                  <folder.icon className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{folder.name}</div>
                    <div className="text-xs text-muted-foreground">{folder.items} items</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Files Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center text-primary">
              <Star className="w-4 h-4 mr-1" />
              Recent Projects
            </h3>
            <div className="space-y-2">
              {files.map((file, i) => (
                <div 
                  key={i}
                  className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                >
                  <file.icon className="w-5 h-5 text-accent" />
                  <div className="flex-1">
                    <div className="text-sm font-medium truncate">{file.name}</div>
                    <div className="text-xs text-muted-foreground">{file.type} • {file.size}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-4 pt-2 border-t border-border text-xs text-muted-foreground flex justify-between">
          <span>💖 Made with love by Neetesh Kumar</span>
          <span>✨ {folders.length + files.length} items total</span>
        </div>
      </div>
    </div>
  );
};