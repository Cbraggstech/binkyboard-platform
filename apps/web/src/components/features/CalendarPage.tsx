import React from 'react';
import { Calendar, Plus, Clock } from 'lucide-react';

export const CalendarPage: React.FC = () => {
  const events = [
    { id: '1', title: 'Soccer practice', time: '4:00 PM', child: 'Liam', date: '2024-08-05' },
    { id: '2', title: 'Dentist appointment', time: '10:00 AM', child: 'Emma', date: '2024-08-06' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">Family Calendar</h1>
          <p className="text-dark/70 dark:text-gray-300">Keep track of everyone's schedule</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Event</span>
        </button>
      </div>

      {/* Calendar View */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-dark dark:text-white">August 2024</h2>
          <div className="flex space-x-2">
            <button className="px-4 py-2 glassmorphism rounded-lg hover:bg-white/30 transition-colors">Day</button>
            <button className="px-4 py-2 glassmorphism rounded-lg hover:bg-white/30 transition-colors">Week</button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg">Month</button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center font-semibold text-dark/70 dark:text-gray-300">{day}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }, (_, i) => {
            const day = i - 3; // Start from Sunday
            const isCurrentMonth = day > 0 && day <= 31;
            const hasEvent = day === 5 || day === 6;
            
            return (
              <div key={i} className={`p-3 rounded-lg min-h-20 ${
                isCurrentMonth ? 'bg-white/20 hover:bg-white/30 cursor-pointer' : 'bg-gray-100/20'
              } transition-colors`}>
                {isCurrentMonth && (
                  <>
                    <div className="font-medium text-dark dark:text-white mb-1">{day}</div>
                    {hasEvent && (
                      <div className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                        Event
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="card">
        <h2 className="text-xl font-semibold text-dark dark:text-white mb-4">Upcoming Events</h2>
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="flex items-center space-x-3 p-3 bg-white/20 rounded-xl">
              <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
                <Clock size={16} className="text-secondary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-dark dark:text-white">{event.title}</p>
                <p className="text-sm text-dark/60 dark:text-gray-300">{event.child} • {event.time}</p>
              </div>
              <span className="text-sm text-dark/60 dark:text-gray-300">{event.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};