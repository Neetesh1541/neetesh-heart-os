import React, { useState } from 'react';
import { X, Minus, Plus, Equal, Divide, Asterisk, Delete } from 'lucide-react';

interface CalculatorProps {
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onClose, isMinimized, onToggleMinimize }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  if (isMinimized) return null;

  return (
    <div className="fixed top-20 left-20 w-80 window-chrome z-20">
      {/* Title Bar */}
      <div className="window-title-bar flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary rounded-full"></div>
          <span className="text-sm font-medium">Calculator</span>
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

      {/* Calculator Content */}
      <div className="p-4 bg-window-content">
        {/* Display */}
        <div className="bg-muted/50 p-4 rounded-lg mb-4 text-right">
          <div className="text-2xl font-mono text-primary">{display}</div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <button
            onClick={clearAll}
            className="p-3 bg-destructive/20 hover:bg-destructive/30 rounded-lg text-destructive font-medium transition-colors"
          >
            C
          </button>
          <button
            onClick={clearEntry}
            className="p-3 bg-muted hover:bg-muted/80 rounded-lg font-medium transition-colors"
          >
            CE
          </button>
          <button
            onClick={() => setDisplay(display.slice(0, -1) || '0')}
            className="p-3 bg-muted hover:bg-muted/80 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <Delete className="w-4 h-4" />
          </button>
          <button
            onClick={() => inputOperation('/')}
            className="p-3 bg-accent/20 hover:bg-accent/30 rounded-lg text-accent font-medium transition-colors flex items-center justify-center"
          >
            <Divide className="w-4 h-4" />
          </button>

          {/* Row 2 */}
          <button
            onClick={() => inputNumber('7')}
            className="p-3 bg-card hover:bg-muted/50 rounded-lg font-medium transition-colors"
          >
            7
          </button>
          <button
            onClick={() => inputNumber('8')}
            className="p-3 bg-card hover:bg-muted/50 rounded-lg font-medium transition-colors"
          >
            8
          </button>
          <button
            onClick={() => inputNumber('9')}
            className="p-3 bg-card hover:bg-muted/50 rounded-lg font-medium transition-colors"
          >
            9
          </button>
          <button
            onClick={() => inputOperation('*')}
            className="p-3 bg-accent/20 hover:bg-accent/30 rounded-lg text-accent font-medium transition-colors flex items-center justify-center"
          >
            <Asterisk className="w-4 h-4" />
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputNumber('4')}
            className="p-3 bg-card hover:bg-muted/50 rounded-lg font-medium transition-colors"
          >
            4
          </button>
          <button
            onClick={() => inputNumber('5')}
            className="p-3 bg-card hover:bg-muted/50 rounded-lg font-medium transition-colors"
          >
            5
          </button>
          <button
            onClick={() => inputNumber('6')}
            className="p-3 bg-card hover:bg-muted/50 rounded-lg font-medium transition-colors"
          >
            6
          </button>
          <button
            onClick={() => inputOperation('-')}
            className="p-3 bg-accent/20 hover:bg-accent/30 rounded-lg text-accent font-medium transition-colors flex items-center justify-center"
          >
            <Minus className="w-4 h-4" />
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputNumber('1')}
            className="p-3 bg-card hover:bg-muted/50 rounded-lg font-medium transition-colors"
          >
            1
          </button>
          <button
            onClick={() => inputNumber('2')}
            className="p-3 bg-card hover:bg-muted/50 rounded-lg font-medium transition-colors"
          >
            2
          </button>
          <button
            onClick={() => inputNumber('3')}
            className="p-3 bg-card hover:bg-muted/50 rounded-lg font-medium transition-colors"
          >
            3
          </button>
          <button
            onClick={() => inputOperation('+')}
            className="p-3 bg-accent/20 hover:bg-accent/30 rounded-lg text-accent font-medium transition-colors flex items-center justify-center"
          >
            <Plus className="w-4 h-4" />
          </button>

          {/* Row 5 */}
          <button
            onClick={() => inputNumber('0')}
            className="p-3 bg-card hover:bg-muted/50 rounded-lg font-medium transition-colors col-span-2"
          >
            0
          </button>
          <button
            onClick={() => inputNumber('.')}
            className="p-3 bg-card hover:bg-muted/50 rounded-lg font-medium transition-colors"
          >
            .
          </button>
          <button
            onClick={performCalculation}
            className="p-3 bg-primary/20 hover:bg-primary/30 rounded-lg text-primary font-medium transition-colors flex items-center justify-center"
          >
            <Equal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};