import React, { useState, useRef, useEffect } from 'react';
import { X, Minimize2, Maximize2, Heart, Star } from 'lucide-react';

interface TerminalProps {
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ onClose, isMinimized, onToggleMinimize }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    '💖 Welcome to NeeteshOS Terminal! 💖',
    'Type "help" to see available commands.',
    ''
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const loveArts = [
    `
    ♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
    ♡  ♡(｡◕‿◕｡)♡  ♡
    ♡  Made with Love ♡
    ♡  by Neetesh! 💕 ♡
    ♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡`,
    `
         ♡♡    ♡♡
       ♡    ♡♡    ♡
      ♡  NeeteshOS  ♡
       ♡    ♡♡    ♡
         ♡♡    ♡♡
           ♡♡♡♡`,
    `
    ✧･ﾟ: *✧･ﾟ:* LOVE *:･ﾟ✧*:･ﾟ✧
         (♡˙︶˙♡)
    Keep coding with passion! 💖`
  ];

  const commands = {
    help: () => [
      '💕 Available Commands:',
      '  about    - Show creator info',
      '  love     - Display random love art',
      '  projects - List Neetesh\'s projects', 
      '  skills   - Show technical skills',
      '  achievements - Display achievements',
      '  clear   - Clear the terminal',
      '  neofetch - Show system info',
      '  help    - Show this help message',
      ''
    ],
    about: () => [
      '✨ About Neetesh Kumar ✨',
      '',
      '👨‍💻 3rd-year CSE student at Dr. A.P.J. Abdul Kalam Technical University',
      '📅 Academic Year: 2023-2027',
      '💝 Passionate about full-stack development and AI/ML',
      '',
      '🌟 Currently building amazing projects with love and dedication!',
      '💖 Believer in coding with passion and making tech accessible to all',
      ''
    ],
    projects: () => [
      '🚀 Neetesh\'s Amazing Projects:',
      '',
      '🛡️  FakeFact - AI cyber safety tool for misinformation detection',
      '👥 BhedChaal - AI crowd anomaly detection system',  
      '🍽️  Mummy Meals - Hackathon startup project (5th position!) 🏆',
      '💃 Body Dance Clone - Interactive dance application',
      '🤖 Net.ai - AI-powered networking tool',
      '📄 Portfolio Maker - Dynamic portfolio generation platform',
      '',
      '💡 Each project built with love, innovation, and technical excellence!',
      ''
    ],
    skills: () => [
      '💻 Technical Skills Arsenal:',
      '',
      '🌐 Frontend: HTML, CSS, JavaScript, React',
      '🔧 Backend: Python, Django, Flask', 
      '⚙️  Tools: Git, GitHub',
      '🧠 AI/ML: Machine Learning algorithms & implementations',
      '📱 Full-Stack Development',
      '',
      '🎯 Always learning and growing! 💪',
      ''
    ],
    achievements: () => [
      '🏆 Achievements & Community Involvement:',
      '',
      '🥉 5th position in startup hackathon with Mummy Meals',
      '👥 Member of GDG Gurgaon',
      '🌍 Member of GDG Noida', 
      '☁️  Azure Developer Community core team member',
      '🎓 Microsoft Learn Student Ambassador',
      '',
      '💫 Making impact through technology and community! ✨',
      ''
    ],
    love: () => [
      loveArts[Math.floor(Math.random() * loveArts.length)],
      ''
    ],
    clear: () => {
      setHistory(['💖 NeeteshOS Terminal - Cleared with Love! 💖', '']);
      return [];
    },
    neofetch: () => [
      '           ♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡',
      '           ♡  NeeteshOS v1.0  ♡     OS: NeeteshOS 💖',
      '           ♡    ◕    ◕     ♡     Host: Lovable Platform',
      '           ♡       ︶        ♡     Kernel: Cute Kernel 5.love',  
      '           ♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡     Uptime: Making dreams come true',
      '                                   Packages: Love, Passion, Code',
      '💝 Creator: Neetesh Kumar          Shell: CuteShell v1.0',
      '🎓 Student at AKTU (2023-2027)     Theme: Pastel Dreams',
      '💻 Full-Stack Dev & AI/ML          Terminal: NeeteshTerminal',
      '🌟 Microsoft Learn Ambassador      CPU: Heart Processor (Love cores)',
      '                                   Memory: Unlimited Dreams',
      ''
    ]
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const output = commands[trimmedCmd as keyof typeof commands];
    
    if (output) {
      const result = output();
      if (trimmedCmd !== 'clear') {
        setHistory(prev => [...prev, `💕 neetesh@cuteos:~$ ${cmd}`, ...result]);
      }
    } else if (trimmedCmd === '') {
      setHistory(prev => [...prev, `💕 neetesh@cuteos:~$ `]);
    } else {
      setHistory(prev => [...prev, 
        `💕 neetesh@cuteos:~$ ${cmd}`,
        `Command not found: ${cmd} 💔`,
        'Type "help" to see available commands!',
        ''
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  useEffect(() => {
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMinimized]);

  if (isMinimized) return null;

  return (
    <div className="window-chrome w-full max-w-4xl h-96 flex flex-col absolute top-20 left-1/2 transform -translate-x-1/2 z-20">
      {/* Window Header */}
      <div className="flex items-center justify-between p-2 bg-window-header border-b border-window-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="ml-2 text-sm font-medium flex items-center">
            <Heart className="w-4 h-4 mr-1 text-pink-500" />
            NeeteshOS Terminal
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

      {/* Terminal Content */}
      <div className="flex-1 terminal p-4 overflow-y-auto font-mono text-sm">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('💕') ? 'text-terminal-prompt' : 'text-terminal-text'}>
            {line}
          </div>
        ))}
        
        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className="text-terminal-prompt mr-2">💕 neetesh@cuteos:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-terminal-text outline-none"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};