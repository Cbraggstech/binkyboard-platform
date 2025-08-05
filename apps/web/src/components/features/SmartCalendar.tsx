import React, { useState, useMemo } from 'react';
import { Calendar, Plus, Clock, MapPin, Users, Repeat, Bell, ChevronLeft, ChevronRight, Filter, Settings, Download, RefreshCw, Link } from 'lucide-react';
import type { CalendarEvent } from '../../types';

export const SmartCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('month');
  const [selectedChild, setSelectedChild] = useState<string | 'all'>('all');
  const [showEventModal, setShowEventModal] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Sample events data with all new features
  const [events] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Soccer Practice',
      description: 'Weekly soccer practice at the community center',
      startDate: new Date('2024-08-05T16:00:00'),
      endDate: new Date('2024-08-05T17:30:00'),
      allDay: false,
      duration: 90,
      childId: 'liam',
      type: 'activity',
      category: 'sports',
      location: 'Community Sports Center',
      recurring: {
        enabled: true,
        frequency: 'weekly',
        interval: 1,
        days: ['monday', 'wednesday'],
        endDate: new Date('2024-12-15')
      },
      reminders: {
        enabled: true,
        times: [30, 60] // 30 min and 1 hour before
      },
      attendees: ['liam', 'parent1'],
      color: '#5AA9E6',
      parentId: 'parent1',
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Dentist Appointment',
      description: 'Regular dental checkup',
      startDate: new Date('2024-08-06T10:00:00'),
      endDate: new Date('2024-08-06T11:00:00'),
      allDay: false,
      duration: 60,
      childId: 'emma',
      type: 'medical',
      category: 'health',
      location: 'Smile Dental Clinic',
      recurring: {
        enabled: true,
        frequency: 'monthly',
        interval: 6, // every 6 months
      },
      reminders: {
        enabled: true,
        times: [1440, 60] // 24 hours and 1 hour before
      },
      attendees: ['emma', 'parent1'],
      color: '#FF8C94',
      parentId: 'parent1',
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Nap Time',
      description: 'Quiet time block for Emma',
      startDate: new Date('2024-08-05T13:00:00'),
      endDate: new Date('2024-08-05T15:00:00'),
      allDay: false,
      duration: 120,
      childId: 'emma',
      type: 'time-block',
      category: 'routine',
      location: 'Home',
      recurring: {
        enabled: true,
        frequency: 'daily',
        interval: 1,
        endDate: new Date('2024-12-31')
      },
      reminders: {
        enabled: false,
        times: []
      },
      attendees: ['emma'],
      color: '#A4EDDA',
      parentId: 'parent1',
      createdAt: new Date()
    }
  ]);

  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    allDay: false,
    type: 'activity',
    category: '',
    location: '',
    recurring: {
      enabled: false,
      frequency: 'weekly',
      interval: 1,
      days: []
    },
    reminders: {
      enabled: true,
      times: [15]
    },
    attendees: [],
    color: '#5AA9E6'
  });

  // Calendar navigation
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  // Get events for current view
  const visibleEvents = useMemo(() => {
    return events.filter(event => {
      if (selectedChild !== 'all' && event.childId !== selectedChild) {
        return false;
      }
      
      if (viewMode === 'month') {
        return event.startDate.getMonth() === currentDate.getMonth() &&
               event.startDate.getFullYear() === currentDate.getFullYear();
      }
      
      return true;
    });
  }, [events, selectedChild, viewMode, currentDate]);

  // Generate calendar grid for month view
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const getEventsForDay = (date: Date) => {
    return visibleEvents.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const eventTypeIcons = {
    'appointment': '📅',
    'activity': '🏃',
    'reminder': '⏰',
    'milestone': '🎯',
    'school': '🎓',
    'medical': '🏥',
    'time-block': '⏳'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark">Smart Family Calendar</h1>
          <p className="text-dark/70">Organize your family's schedule with intelligent features</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 glassmorphism rounded-xl hover:bg-white/30 transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
          <button 
            onClick={() => setShowSyncModal(true)}
            className="flex items-center space-x-2 px-4 py-2 glassmorphism rounded-xl hover:bg-white/30 transition-colors"
          >
            <RefreshCw size={16} />
            <span>Sync External</span>
          </button>
          <button 
            onClick={() => setShowEventModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Child Filter */}
          <select 
            className="input-field w-40"
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
          >
            <option value="all">All Children</option>
            <option value="emma">Emma</option>
            <option value="liam">Liam</option>
          </select>

          {/* View Mode */}
          <div className="flex space-x-1 bg-white/20 rounded-lg p-1">
            {['day', 'week', 'month'].map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                  viewMode === mode
                    ? 'bg-primary text-white'
                    : 'hover:bg-white/20 text-dark/70'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xl font-semibold text-dark min-w-48 text-center">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <button 
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'month' && (
        <div className="card">
          {/* Week Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center font-semibold text-dark/70 border-b border-white/20">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {generateCalendarDays().map((date, i) => {
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              const isToday = date.toDateString() === new Date().toDateString();
              const dayEvents = getEventsForDay(date);
              
              return (
                <div 
                  key={i} 
                  className={`min-h-24 p-2 rounded-lg border transition-colors cursor-pointer ${
                    isCurrentMonth 
                      ? 'bg-white/20 hover:bg-white/30 border-white/30' 
                      : 'bg-gray-100/20 border-gray-200/30'
                  } ${isToday ? 'ring-2 ring-primary/50' : ''}`}
                  onClick={() => {
                    // Handle day click for quick event creation
                  }}
                >
                  <div className={`font-medium mb-1 ${
                    isCurrentMonth ? 'text-dark' : 'text-dark/40'
                  } ${isToday ? 'text-primary font-bold' : ''}`}>
                    {date.getDate()}
                  </div>
                  
                  {/* Day Events */}
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className="text-xs p-1 rounded truncate text-white font-medium cursor-pointer hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: event.color }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                        }}
                      >
                        <span className="mr-1">{eventTypeIcons[event.type]}</span>
                        {event.title}
                        {event.recurring.enabled && <span className="ml-1">🔄</span>}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-dark/60">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Upcoming Events Sidebar */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Event Types Legend */}
          <div className="card">
            <h3 className="font-semibold text-dark mb-3">Event Types</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(eventTypeIcons).map(([type, icon]) => (
                <div key={type} className="flex items-center space-x-2 text-sm">
                  <span className="text-lg">{icon}</span>
                  <span className="text-dark/70 capitalize">{type.replace('-', ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-dark">Upcoming Events</h3>
            <Filter size={16} className="text-dark/60" />
          </div>
          <div className="space-y-3">
            {visibleEvents
              .filter(event => event.startDate >= new Date())
              .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
              .slice(0, 5)
              .map((event) => (
                <div key={event.id} className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: event.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{eventTypeIcons[event.type]}</span>
                        <p className="font-medium text-dark truncate">{event.title}</p>
                        {event.recurring.enabled && <Repeat size={12} className="text-dark/60" />}
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-dark/60">
                        <span className="flex items-center space-x-1">
                          <Clock size={10} />
                          <span>{event.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </span>
                        {event.location && (
                          <span className="flex items-center space-x-1">
                            <MapPin size={10} />
                            <span className="truncate">{event.location}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glassmorphism rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-dark">
                  {selectedEvent ? 'Edit Event' : 'Create New Event'}
                </h2>
                <button 
                  onClick={() => {
                    setShowEventModal(false);
                    setSelectedEvent(null);
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh] space-y-4">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Title</label>
                  <input
                    type="text"
                    className="input-field"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Event title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Type</label>
                  <select
                    className="input-field"
                    value={newEvent.type}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value as any }))}
                  >
                    <option value="activity">Activity</option>
                    <option value="appointment">Appointment</option>
                    <option value="school">School</option>
                    <option value="medical">Medical</option>
                    <option value="time-block">Time Block</option>
                    <option value="reminder">Reminder</option>
                    <option value="milestone">Milestone</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-1">Description</label>
                <textarea
                  className="input-field"
                  rows={3}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Event description"
                />
              </div>

              {/* Date & Time */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Start Date & Time</label>
                  <input
                    type="datetime-local"
                    className="input-field"
                    value={newEvent.startDate?.toISOString().slice(0, 16)}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, startDate: new Date(e.target.value) }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">End Date & Time</label>
                  <input
                    type="datetime-local"
                    className="input-field"
                    value={newEvent.endDate?.toISOString().slice(0, 16)}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, endDate: new Date(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="allDay"
                  checked={newEvent.allDay}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, allDay: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                <label htmlFor="allDay" className="text-sm text-dark">All Day Event</label>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Location</label>
                <input
                  type="text"
                  className="input-field"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Event location"
                />
              </div>

              {/* Recurring */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={newEvent.recurring?.enabled}
                    onChange={(e) => setNewEvent(prev => ({ 
                      ...prev, 
                      recurring: { ...prev.recurring!, enabled: e.target.checked }
                    }))}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="recurring" className="text-sm text-dark">Recurring Event</label>
                </div>

                {newEvent.recurring?.enabled && (
                  <div className="grid md:grid-cols-2 gap-4 pl-6">
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1">Frequency</label>
                      <select
                        className="input-field"
                        value={newEvent.recurring.frequency}
                        onChange={(e) => setNewEvent(prev => ({ 
                          ...prev, 
                          recurring: { ...prev.recurring!, frequency: e.target.value as any }
                        }))}
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1">Every</label>
                      <input
                        type="number"
                        className="input-field"
                        min="1"
                        value={newEvent.recurring.interval}
                        onChange={(e) => setNewEvent(prev => ({ 
                          ...prev, 
                          recurring: { ...prev.recurring!, interval: parseInt(e.target.value) }
                        }))}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Reminders */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="reminders"
                    checked={newEvent.reminders?.enabled}
                    onChange={(e) => setNewEvent(prev => ({ 
                      ...prev, 
                      reminders: { ...prev.reminders!, enabled: e.target.checked }
                    }))}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="reminders" className="text-sm text-dark">Enable Reminders</label>
                </div>

                {newEvent.reminders?.enabled && (
                  <div className="pl-6">
                    <label className="block text-sm font-medium text-dark mb-2">Remind me:</label>
                    <div className="space-y-2">
                      {[15, 30, 60, 1440].map(minutes => (
                        <div key={minutes} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`reminder-${minutes}`}
                            checked={newEvent.reminders?.times.includes(minutes)}
                            onChange={(e) => {
                              const times = newEvent.reminders?.times || [];
                              if (e.target.checked) {
                                setNewEvent(prev => ({ 
                                  ...prev, 
                                  reminders: { ...prev.reminders!, times: [...times, minutes] }
                                }));
                              } else {
                                setNewEvent(prev => ({ 
                                  ...prev, 
                                  reminders: { ...prev.reminders!, times: times.filter(t => t !== minutes) }
                                }));
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                          <label htmlFor={`reminder-${minutes}`} className="text-sm text-dark">
                            {minutes < 60 ? `${minutes} minutes` : minutes === 60 ? '1 hour' : '1 day'} before
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Color</label>
                <div className="flex space-x-2">
                  {['#5AA9E6', '#FF8C94', '#A4EDDA', '#FFEC99', '#9B59B6', '#E67E22'].map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${
                        newEvent.color === color ? 'border-dark' : 'border-white/30'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewEvent(prev => ({ ...prev, color }))}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/20 flex justify-end space-x-3">
              <button 
                onClick={() => {
                  setShowEventModal(false);
                  setSelectedEvent(null);
                }}
                className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="btn-primary">
                {selectedEvent ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Sync Modal */}
      {showSyncModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glassmorphism rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-dark">External Calendar Sync</h2>
                <button 
                  onClick={() => setShowSyncModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
              {/* Connected Accounts */}
              <div>
                <h3 className="font-semibold text-dark mb-4">Connected Accounts</h3>
                <div className="space-y-3">
                  {/* Google Calendar */}
                  <div className="flex items-center justify-between p-4 bg-white/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold">G</span>
                      </div>
                      <div>
                        <p className="font-medium text-dark">Google Calendar</p>
                        <p className="text-dark/60 text-sm">family@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs">Connected</span>
                      <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                        <Settings size={16} className="text-dark/60" />
                      </button>
                    </div>
                  </div>

                  {/* Apple Calendar */}
                  <div className="flex items-center justify-between p-4 bg-white/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-600 font-bold">🍎</span>
                      </div>
                      <div>
                        <p className="font-medium text-dark">Apple Calendar</p>
                        <p className="text-dark/60 text-sm">Not connected</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                      Connect
                    </button>
                  </div>

                  {/* Outlook Calendar */}
                  <div className="flex items-center justify-between p-4 bg-white/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold">📅</span>
                      </div>
                      <div>
                        <p className="font-medium text-dark">Outlook Calendar</p>
                        <p className="text-dark/60 text-sm">Not connected</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                      Connect
                    </button>
                  </div>
                </div>
              </div>

              {/* Sync Settings */}
              <div>
                <h3 className="font-semibold text-dark mb-4">Sync Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-dark">Two-way sync</p>
                      <p className="text-dark/60 text-sm">Changes sync both ways between calendars</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-dark">Auto-sync</p>
                      <p className="text-dark/60 text-sm">Automatically sync every 15 minutes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-dark">Sync family events only</p>
                      <p className="text-dark/60 text-sm">Only sync events marked as family events</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Sync Conflicts */}
              <div>
                <h3 className="font-semibold text-dark mb-4">Conflict Resolution</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">When events conflict:</label>
                    <select className="input-field">
                      <option value="family-priority">BinkyBoard takes priority</option>
                      <option value="external-priority">External calendar takes priority</option>
                      <option value="ask-user">Ask me each time</option>
                      <option value="newest-wins">Newest change wins</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Last Sync Status */}
              <div>
                <h3 className="font-semibold text-dark mb-4">Sync Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600">✓</span>
                      </div>
                      <div>
                        <p className="font-medium text-green-800">Google Calendar</p>
                        <p className="text-green-600 text-sm">Last synced: 5 minutes ago</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                      Sync Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/20 flex justify-between">
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors">
                <RefreshCw size={16} />
                <span>Sync All Now</span>
              </button>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowSyncModal(false)}
                  className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="btn-primary">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};