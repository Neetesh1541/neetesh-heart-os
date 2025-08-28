import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Palette, Eraser, RotateCcw, Save } from 'lucide-react';

interface PaintProps {
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export const Paint: React.FC<PaintProps> = ({ onClose, isMinimized, onToggleMinimize }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);
  const [isEraser, setIsEraser] = useState(false);

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500',
    '#800080', '#FFC0CB', '#A52A2A', '#808080'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    
    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'neetesh-artwork.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  if (isMinimized) return null;

  return (
    <div className="fixed top-44 left-44 w-[500px] h-[400px] window-chrome z-20">
      {/* Title Bar */}
      <div className="window-title-bar flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          <Palette className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Paint</span>
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
        <div className="flex items-center space-x-2">
          {/* Tools */}
          <button
            onClick={() => setIsEraser(false)}
            className={`p-2 rounded ${!isEraser ? 'bg-primary/20 text-primary' : 'hover:bg-muted/50'} transition-colors`}
          >
            <Palette className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsEraser(true)}
            className={`p-2 rounded ${isEraser ? 'bg-primary/20 text-primary' : 'hover:bg-muted/50'} transition-colors`}
          >
            <Eraser className="w-4 h-4" />
          </button>
          
          {/* Brush Size */}
          <div className="flex items-center space-x-1">
            <span className="text-xs">Size:</span>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-16"
            />
            <span className="text-xs w-6">{brushSize}</span>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={clearCanvas}
            className="flex items-center space-x-1 px-2 py-1 hover:bg-muted/50 rounded text-xs transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
          <button
            onClick={saveCanvas}
            className="flex items-center space-x-1 px-2 py-1 hover:bg-muted/50 rounded text-xs transition-colors"
          >
            <Save className="w-3 h-3" />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Color Palette */}
      <div className="p-2 border-b border-border bg-muted/10">
        <div className="flex items-center space-x-1">
          <span className="text-xs mr-2">Colors:</span>
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded border-2 ${color === c ? 'border-primary' : 'border-border'} transition-colors`}
              style={{ backgroundColor: c }}
            />
          ))}
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-6 h-6 rounded border border-border ml-2"
          />
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-white">
        <canvas
          ref={canvasRef}
          width={500}
          height={300}
          className="cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseLeave={stopDrawing}
        />
      </div>
    </div>
  );
};