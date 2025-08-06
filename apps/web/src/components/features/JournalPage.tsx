import React from 'react';
import { BookOpen, Plus, Camera, Star, Filter } from 'lucide-react';

export const JournalPage: React.FC = () => {
  const entries = [
    {
      id: '1',
      title: 'Emma\'s First Day of School',
      content: 'Emma was so excited for her first day of 3rd grade! She picked out her outfit the night before and couldn\'t sleep.',
      date: '2024-08-01',
      child: 'Emma',
      photos: ['school1.jpg'],
      milestone: true,
      tags: ['school', 'milestone', 'education']
    },
    {
      id: '2',
      title: 'Family Beach Trip',
      content: 'Spent the whole day at the beach. Liam built an amazing sandcastle and Emma collected seashells.',
      date: '2024-07-28',
      child: null,
      photos: ['beach1.jpg', 'beach2.jpg'],
      milestone: false,
      tags: ['vacation', 'beach', 'family']
    },
    {
      id: '3',
      title: 'Liam\'s Soccer Goal',
      content: 'Liam scored his first goal in the soccer game today! He was so proud and couldn\'t stop smiling.',
      date: '2024-07-25',
      child: 'Liam',
      photos: ['soccer1.jpg'],
      milestone: true,
      tags: ['sports', 'achievement', 'soccer']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">Family Journal</h1>
          <p className="text-dark/70 dark:text-gray-300">Capture and preserve your family's precious moments</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>New Entry</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 glassmorphism rounded-xl hover:bg-white/30 transition-colors">
          <Filter size={16} />
          <span>All Entries</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 glassmorphism rounded-xl hover:bg-white/30 transition-colors">
          <Star size={16} />
          <span>Milestones</span>
        </button>
        <button className="px-4 py-2 glassmorphism rounded-xl hover:bg-white/30 transition-colors">
          Emma
        </button>
        <button className="px-4 py-2 glassmorphism rounded-xl hover:bg-white/30 transition-colors">
          Liam
        </button>
      </div>

      {/* Journal Entries */}
      <div className="space-y-6">
        {entries.map((entry) => (
          <div key={entry.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                  <BookOpen size={20} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-dark dark:text-white">{entry.title}</h3>
                    {entry.milestone && (
                      <Star size={16} className="text-warning fill-current" />
                    )}
                  </div>
                  <p className="text-sm text-dark/60 dark:text-gray-300">
                    {entry.date} {entry.child && `• ${entry.child}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {entry.photos.length > 0 && (
                  <div className="flex items-center space-x-1 text-sm text-dark/60 dark:text-gray-300">
                    <Camera size={14} />
                    <span>{entry.photos.length}</span>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-dark dark:text-white mb-4">{entry.content}</p>
            
            {/* Photo Thumbnails */}
            {entry.photos.length > 0 && (
              <div className="flex space-x-2 mb-4">
                {entry.photos.map((photo, i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Camera size={16} className="text-gray-500" />
                  </div>
                ))}
              </div>
            )}
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-accent/20 text-accent rounded-lg text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Memory Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-dark dark:text-white">{entries.length}</p>
              <p className="text-dark/70 dark:text-gray-300 text-sm">Total Entries</p>
            </div>
            <BookOpen className="text-primary" size={24} />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-dark dark:text-white">{entries.filter(e => e.milestone).length}</p>
              <p className="text-dark/70 dark:text-gray-300 text-sm">Milestones</p>
            </div>
            <Star className="text-warning" size={24} />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-dark dark:text-white">{entries.reduce((sum, e) => sum + e.photos.length, 0)}</p>
              <p className="text-dark/70 dark:text-gray-300 text-sm">Photos</p>
            </div>
            <Camera className="text-secondary" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};