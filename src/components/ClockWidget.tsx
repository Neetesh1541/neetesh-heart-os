import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

export const ClockWidget: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  return (
    <>
      {/* Clock Widget */}
      <div 
        className="fixed top-4 right-4 bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg glow-border cursor-pointer z-10"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground font-medium">NeeteshOS</span>
          </div>
          <div className="text-2xl font-mono font-bold text-primary mb-1">
            {formatTime(currentTime)}
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDate(currentTime)}
          </div>
        </div>
      </div>

      {/* Calendar Popup */}
      {showCalendar && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowCalendar(false)}
          />
          
          {/* Calendar */}
          <div className="fixed top-20 right-4 w-80 bg-card rounded-2xl shadow-lg glow-border z-50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Calendar</span>
                </h3>
                <div className="text-sm text-muted-foreground">
                  {currentTime.toLocaleDateString([], { month: 'long', year: 'numeric' })}
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {/* Day headers */}
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <div key={day} className="p-2 text-xs font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {getDaysInMonth(currentTime).map((day, index) => (
                  <div
                    key={index}
                    className={`p-2 text-sm ${
                      day === currentTime.getDate()
                        ? 'bg-primary text-primary-foreground rounded-lg font-semibold'
                        : day
                        ? 'hover:bg-muted rounded-lg cursor-pointer'
                        : ''
                    }`}
                  >
                    {day || ''}
                  </div>
                ))}
              </div>

              {/* Current time display */}
              <div className="mt-4 pt-4 border-t border-border text-center">
                <div className="text-2xl font-mono font-bold text-primary">
                  {formatTime(currentTime)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  💖 Have a lovely day in NeeteshOS!
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};