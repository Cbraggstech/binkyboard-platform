import React from 'react';
import { Heart, TrendingUp, Calendar } from 'lucide-react';

export const MoodsPage: React.FC = () => {
  const moods = [
    { emoji: '😊', label: 'Happy', child: 'Emma', time: '2 hours ago', energy: 5 },
    { emoji: '😐', label: 'Neutral', child: 'Liam', time: '4 hours ago', energy: 3 },
    { emoji: '😴', label: 'Tired', child: 'Emma', time: 'Yesterday', energy: 2 },
  ];

  const moodOptions = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😁', label: 'Excited' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😢', label: 'Sad' },
    { emoji: '😠', label: 'Angry' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '😰', label: 'Anxious' },
    { emoji: '🤒', label: 'Sick' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark">Mood Tracker</h1>
          <p className="text-dark/70">Monitor your family's emotional wellbeing</p>
        </div>
      </div>

      {/* Quick Mood Entry */}
      <div className="card">
        <h2 className="text-xl font-semibold text-dark mb-4">How are you feeling today?</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-4">
          {moodOptions.map((mood, i) => (
            <button key={i} className="flex flex-col items-center p-3 rounded-xl hover:bg-white/20 transition-colors">
              <span className="text-3xl mb-1">{mood.emoji}</span>
              <span className="text-xs text-dark/70">{mood.label}</span>
            </button>
          ))}
        </div>
        <div className="flex space-x-3">
          <select className="input-field flex-1">
            <option>Select child</option>
            <option>Emma</option>
            <option>Liam</option>
          </select>
          <button className="btn-primary">Log Mood</button>
        </div>
      </div>

      {/* Recent Moods */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-dark">Recent Mood Entries</h2>
          <button className="flex items-center space-x-2 text-primary hover:underline">
            <TrendingUp size={16} />
            <span>View Trends</span>
          </button>
        </div>
        <div className="space-y-3">
          {moods.map((mood, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white/20 rounded-xl">
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{mood.emoji}</span>
                <div>
                  <p className="font-medium text-dark">{mood.label}</p>
                  <p className="text-sm text-dark/60">{mood.child} • {mood.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-dark/60">Energy:</span>
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${
                      i < mood.energy ? 'bg-primary' : 'bg-gray-300'
                    }`} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mood Statistics */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-dark mb-4">This Week's Overview</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <span className="text-xl">😊</span>
                <span>Happy days</span>
              </span>
              <span className="font-semibold">5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <span className="text-xl">😐</span>
                <span>Neutral days</span>
              </span>
              <span className="font-semibold">2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <span className="text-xl">😢</span>
                <span>Difficult days</span>
              </span>
              <span className="font-semibold">0</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-dark mb-4">Family Insights</h3>
          <div className="space-y-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-dark">Emma has been consistently happy this week! 🎉</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <p className="text-sm text-dark">Liam seems tired lately. Consider earlier bedtime.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};