import React, { useState } from 'react';
import { X, Minus, Settings, Monitor, Volume2, Palette, User, Shield, Clock } from 'lucide-react';

interface SystemSettingsProps {
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export const SystemSettings: React.FC<SystemSettingsProps> = ({ onClose, isMinimized, onToggleMinimize }) => {
  const [activeTab, setActiveTab] = useState('display');
  const [settings, setSettings] = useState({
    brightness: 75,
    volume: 60,
    theme: 'auto',
    resolution: '1920x1080',
    username: 'Neetesh Kumar',
    password: '********',
    autoLock: true,
    notifications: true
  });

  const tabs = [
    { id: 'display', label: 'Display', icon: Monitor },
    { id: 'sound', label: 'Sound', icon: Volume2 },
    { id: 'personalization', label: 'Themes', icon: Palette },
    { id: 'accounts', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'time', label: 'Date & Time', icon: Clock },
  ];

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (isMinimized) return null;

  return (
    <div className="fixed top-68 left-68 w-[650px] h-[500px] window-chrome z-20">
      {/* Title Bar */}
      <div className="window-title-bar flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          <Settings className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Settings</span>
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

      <div className="flex h-full bg-window-content">
        {/* Sidebar */}
        <div className="w-48 border-r border-border bg-muted/30">
          <div className="p-4">
            <h3 className="text-xs font-semibold text-muted-foreground mb-3">SETTINGS</h3>
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-2 px-3 py-2 rounded text-sm transition-colors text-left ${
                      activeTab === tab.id
                        ? 'bg-primary/20 text-primary'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {activeTab === 'display' && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-primary">Display Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Brightness</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={settings.brightness}
                        onChange={(e) => updateSetting('brightness', e.target.value)}
                        className="flex-1"
                      />
                      <span className="text-sm w-12">{settings.brightness}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Resolution</label>
                    <select
                      value={settings.resolution}
                      onChange={(e) => updateSetting('resolution', e.target.value)}
                      className="w-full p-2 border border-border rounded bg-background"
                    >
                      <option value="1920x1080">1920 x 1080 (Recommended)</option>
                      <option value="1366x768">1366 x 768</option>
                      <option value="1280x720">1280 x 720</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sound' && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-primary">Sound Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">System Volume</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={settings.volume}
                        onChange={(e) => updateSetting('volume', e.target.value)}
                        className="flex-1"
                      />
                      <span className="text-sm w-12">{settings.volume}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Notification Sounds</label>
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => updateSetting('notifications', e.target.checked)}
                      className="rounded"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'personalization' && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-primary">Personalization</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Theme</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['light', 'dark', 'auto'].map((theme) => (
                        <button
                          key={theme}
                          onClick={() => updateSetting('theme', theme)}
                          className={`p-4 border rounded-lg text-center capitalize ${
                            settings.theme === theme
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:bg-muted/50'
                          }`}
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Accent Color</label>
                    <div className="flex space-x-2">
                      {['#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#00bcd4'].map((color) => (
                        <button
                          key={color}
                          className="w-8 h-8 rounded-full border-2 border-border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'accounts' && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-primary">User Account</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{settings.username}</h3>
                      <p className="text-sm text-muted-foreground">Administrator</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Display Name</label>
                    <input
                      type="text"
                      value={settings.username}
                      onChange={(e) => updateSetting('username', e.target.value)}
                      className="w-full p-2 border border-border rounded bg-background"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-primary">Security & Privacy</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                      type="password"
                      value={settings.password}
                      onChange={(e) => updateSetting('password', e.target.value)}
                      className="w-full p-2 border border-border rounded bg-background"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Auto-lock screen</label>
                    <input
                      type="checkbox"
                      checked={settings.autoLock}
                      onChange={(e) => updateSetting('autoLock', e.target.checked)}
                      className="rounded"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'time' && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-primary">Date & Time</h2>
                <div className="space-y-6">
                  <div className="text-center p-6 border border-border rounded-lg">
                    <div className="text-3xl font-mono mb-2">
                      {new Date().toLocaleTimeString()}
                    </div>
                    <div className="text-lg text-muted-foreground">
                      {new Date().toLocaleDateString(undefined, { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Time Zone</label>
                    <select className="w-full p-2 border border-border rounded bg-background">
                      <option>(UTC+05:30) India Standard Time</option>
                      <option>(UTC+00:00) Greenwich Mean Time</option>
                      <option>(UTC-05:00) Eastern Time</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};