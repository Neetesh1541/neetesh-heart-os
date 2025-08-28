import React, { useState } from 'react';
import { X, Minus, Save, Copy, Clipboard, FileText } from 'lucide-react';

interface TextEditorProps {
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export const TextEditor: React.FC<TextEditorProps> = ({ onClose, isMinimized, onToggleMinimize }) => {
  const [content, setContent] = useState('Welcome to NeeteshOS Notepad! 💖\n\nStart typing your notes here...\n\n✨ This is a simple text editor with basic functionality.');
  const [fileName, setFileName] = useState('Untitled.txt');

  const handleSave = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setContent(prev => prev + text);
    } catch (err) {
      console.error('Failed to paste:', err);
    }
  };

  if (isMinimized) return null;

  return (
    <div className="fixed top-32 left-32 w-96 h-80 window-chrome z-20">
      {/* Title Bar */}
      <div className="window-title-bar flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{fileName}</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={onToggleMinimize}
            className="window-control-button"
            aria-label="Minimize"
          >
            <Minus className="w-3 h-3" />
          </button>
          <button
            onClick={onClose}
            className="window-control-button hover:bg-destructive hover:text-destructive-foreground"
            aria-label="Close"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-1">
          <button
            onClick={handleSave}
            className="flex items-center space-x-1 px-2 py-1 hover:bg-muted/50 rounded text-xs transition-colors"
          >
            <Save className="w-3 h-3" />
            <span>Save</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-2 py-1 hover:bg-muted/50 rounded text-xs transition-colors"
          >
            <Copy className="w-3 h-3" />
            <span>Copy</span>
          </button>
          <button
            onClick={handlePaste}
            className="flex items-center space-x-1 px-2 py-1 hover:bg-muted/50 rounded text-xs transition-colors"
          >
            <Clipboard className="w-3 h-3" />
            <span>Paste</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="text-xs bg-transparent border border-border rounded px-2 py-1 w-24"
            placeholder="File name"
          />
        </div>
      </div>

      {/* Text Area */}
      <div className="flex-1 h-full">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full p-4 bg-window-content border-none outline-none resize-none font-mono text-sm"
          placeholder="Start typing..."
        />
      </div>
    </div>
  );
};