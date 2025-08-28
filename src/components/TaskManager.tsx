import React, { useState, useEffect } from 'react';
import { X, Minus, Activity, Cpu, HardDrive, Wifi, Zap } from 'lucide-react';

interface TaskManagerProps {
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

interface Process {
  id: number;
  name: string;
  cpu: number;
  memory: number;
  status: 'Running' | 'Sleeping' | 'Stopped';
}

export const TaskManager: React.FC<TaskManagerProps> = ({ onClose, isMinimized, onToggleMinimize }) => {
  const [processes, setProcesses] = useState<Process[]>([
    { id: 1, name: 'NeeteshOS Kernel', cpu: 15.2, memory: 256, status: 'Running' },
    { id: 2, name: 'Desktop Manager', cpu: 8.7, memory: 128, status: 'Running' },
    { id: 3, name: 'Terminal', cpu: 2.1, memory: 64, status: 'Running' },
    { id: 4, name: 'File Explorer', cpu: 1.5, memory: 48, status: 'Running' },
    { id: 5, name: 'Heart Animation Service', cpu: 0.8, memory: 32, status: 'Running' },
    { id: 6, name: 'Taskbar', cpu: 0.5, memory: 24, status: 'Running' },
    { id: 7, name: 'Clock Widget', cpu: 0.3, memory: 16, status: 'Running' },
    { id: 8, name: 'Love Generator', cpu: 0.1, memory: 8, status: 'Sleeping' },
  ]);

  const [systemStats, setSystemStats] = useState({
    cpuUsage: 28.9,
    memoryUsage: 576,
    networkSpeed: 125.4,
    uptime: '2h 34m'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setProcesses(prev => prev.map(process => ({
        ...process,
        cpu: Math.max(0, process.cpu + (Math.random() - 0.5) * 2),
        memory: Math.max(8, process.memory + Math.floor((Math.random() - 0.5) * 8))
      })));

      setSystemStats(prev => ({
        ...prev,
        cpuUsage: Math.max(10, Math.min(95, prev.cpuUsage + (Math.random() - 0.5) * 5)),
        networkSpeed: Math.max(50, prev.networkSpeed + (Math.random() - 0.5) * 20)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const totalMemory = 1024;
  const memoryPercentage = (systemStats.memoryUsage / totalMemory) * 100;

  if (isMinimized) return null;

  return (
    <div className="fixed top-56 left-56 w-[600px] h-[450px] window-chrome z-20">
      {/* Title Bar */}
      <div className="window-title-bar flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Task Manager</span>
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

      <div className="flex flex-col h-full bg-window-content">
        {/* System Overview */}
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold mb-3 text-primary">System Performance</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-blue-500" />
              <div>
                <div className="text-xs text-muted-foreground">CPU</div>
                <div className="text-sm font-mono">{systemStats.cpuUsage.toFixed(1)}%</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <HardDrive className="w-4 h-4 text-green-500" />
              <div>
                <div className="text-xs text-muted-foreground">Memory</div>
                <div className="text-sm font-mono">{systemStats.memoryUsage}MB</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4 text-purple-500" />
              <div>
                <div className="text-xs text-muted-foreground">Network</div>
                <div className="text-sm font-mono">{systemStats.networkSpeed.toFixed(1)} KB/s</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <div>
                <div className="text-xs text-muted-foreground">Uptime</div>
                <div className="text-sm font-mono">{systemStats.uptime}</div>
              </div>
            </div>
          </div>

          {/* Usage Bars */}
          <div className="mt-3 space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>CPU Usage</span>
                <span>{systemStats.cpuUsage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${systemStats.cpuUsage}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Memory Usage</span>
                <span>{memoryPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${memoryPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Process List */}
        <div className="flex-1 overflow-hidden">
          <div className="p-4">
            <h3 className="text-sm font-semibold mb-3 text-primary">Running Processes</h3>
            <div className="overflow-auto max-h-64">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 text-xs font-medium text-muted-foreground">Process</th>
                    <th className="text-right p-2 text-xs font-medium text-muted-foreground">CPU %</th>
                    <th className="text-right p-2 text-xs font-medium text-muted-foreground">Memory (MB)</th>
                    <th className="text-center p-2 text-xs font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {processes.map((process) => (
                    <tr key={process.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="p-2 font-medium">{process.name}</td>
                      <td className="p-2 text-right font-mono">{process.cpu.toFixed(1)}</td>
                      <td className="p-2 text-right font-mono">{process.memory}</td>
                      <td className="p-2 text-center">
                        <span 
                          className={`px-2 py-1 rounded text-xs ${
                            process.status === 'Running' 
                              ? 'bg-green-100 text-green-800' 
                              : process.status === 'Sleeping'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {process.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border bg-muted/30 text-center">
          <p className="text-xs text-muted-foreground">
            💖 NeeteshOS Task Manager - Monitoring system with love
          </p>
        </div>
      </div>
    </div>
  );
};