import React from 'react';
import { X, Minimize2, Heart, Star, Award, Code, Users, ExternalLink } from 'lucide-react';

interface AboutDialogProps {
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export const AboutDialog: React.FC<AboutDialogProps> = ({ onClose, isMinimized, onToggleMinimize }) => {
  if (isMinimized) return null;

  return (
    <div className="window-chrome w-full max-w-2xl flex flex-col absolute top-24 left-1/4 z-20">
      {/* Window Header */}
      <div className="flex items-center justify-between p-2 bg-window-header border-b border-window-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="ml-2 text-sm font-medium flex items-center">
            <Heart className="w-4 h-4 mr-1 text-primary" />
            About Neetesh Kumar
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

      {/* Content */}
      <div className="flex-1 bg-card p-6 max-h-96 overflow-y-auto">
        
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center glow-border">
            <Heart className="w-12 h-12 text-white heart-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-primary glow-text">Neetesh Kumar</h2>
          <p className="text-muted-foreground">Full-Stack Developer & AI/ML Enthusiast 💖</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          
          {/* Education */}
          <div className="bg-muted/30 rounded-lg p-4 glow-border">
            <h3 className="font-semibold flex items-center text-primary mb-2">
              <Star className="w-4 h-4 mr-1" />
              Education
            </h3>
            <p className="text-sm text-muted-foreground">
              🎓 3rd-year CSE Student<br/>
              🏫 Dr. A.P.J. Abdul Kalam Technical University<br/>
              📅 2023-2027
            </p>
          </div>

          {/* Passion */}
          <div className="bg-muted/30 rounded-lg p-4 glow-border">
            <h3 className="font-semibold flex items-center text-primary mb-2">
              <Code className="w-4 h-4 mr-1" />
              Passion
            </h3>
            <p className="text-sm text-muted-foreground">
              💻 Full-Stack Development<br/>
              🤖 Artificial Intelligence<br/>
              📊 Machine Learning
            </p>
          </div>

        </div>

        {/* Technical Skills */}
        <div className="bg-muted/30 rounded-lg p-4 mb-4 glow-border">
          <h3 className="font-semibold flex items-center text-primary mb-3">
            <Code className="w-4 h-4 mr-1" />
            Technical Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {['HTML', 'CSS', 'JavaScript', 'Python', 'Django', 'Flask', 'React', 'Git'].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="bg-muted/30 rounded-lg p-4 mb-4 glow-border">
          <h3 className="font-semibold flex items-center text-primary mb-3">
            <Star className="w-4 h-4 mr-1" />
            Featured Projects
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>🛡️ FakeFact - AI cyber safety tool</span>
            </div>
            <div className="flex items-center justify-between">
              <span>👥 BhedChaal - AI crowd anomaly detection</span>
            </div>
            <div className="flex items-center justify-between">
              <span>🍽️ Mummy Meals - Hackathon startup project</span>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">5th Place 🏆</span>
            </div>
            <div className="flex items-center justify-between">
              <span>💃 Body Dance Clone</span>
            </div>
            <div className="flex items-center justify-between">
              <span>🤖 Net.ai</span>
            </div>
            <div className="flex items-center justify-between">
              <span>📄 Portfolio Maker</span>
            </div>
          </div>
        </div>

        {/* Community Involvement */}
        <div className="bg-muted/30 rounded-lg p-4 mb-4 glow-border">
          <h3 className="font-semibold flex items-center text-primary mb-3">
            <Users className="w-4 h-4 mr-1" />
            Community & Achievements
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2 text-yellow-500" />
              <span>Microsoft Learn Student Ambassador</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-blue-500" />
              <span>Azure Developer Community (Core Team)</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-green-500" />
              <span>GDG Gurgaon Member</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-green-500" />
              <span>GDG Noida Member</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground border-t border-border pt-4">
          <p className="flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-1 text-primary heart-pulse" /> and endless passion for technology
          </p>
          <p className="text-xs mt-2">
            ✨ "Keep coding with love and make the world a better place!" ✨
          </p>
        </div>
      </div>
    </div>
  );
};