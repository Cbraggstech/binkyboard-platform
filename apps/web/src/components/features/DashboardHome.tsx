import React from 'react';
import {
  Calendar,
  CheckSquare,
  Trophy,
  Heart,
  TrendingUp,
  Clock,
  Star,
  Plus,
} from 'lucide-react';

export const DashboardHome: React.FC = () => {
  const todaysTasks = [
    { id: '1', title: 'Clean bedroom', child: 'Emma', points: 10, completed: false },
    { id: '2', title: 'Homework - Math', child: 'Liam', points: 15, completed: true },
    { id: '3', title: 'Feed pet', child: 'Emma', points: 5, completed: false },
  ];

  const upcomingEvents = [
    { id: '1', title: 'Soccer practice', time: '4:00 PM', child: 'Liam' },
    { id: '2', title: 'Dentist appointment', time: '10:00 AM', child: 'Emma' },
  ];

  const moodStats = [
    { emoji: '😊', count: 5, label: 'Happy' },
    { emoji: '😐', count: 2, label: 'Neutral' },
    { emoji: '😢', count: 1, label: 'Sad' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="glassmorphism rounded-2xl p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
        <h1 className="text-3xl font-bold text-dark dark:text-white mb-2">Good morning! ☀️</h1>
        <p className="text-dark/70 dark:text-gray-300">
          Today is a great day to accomplish something amazing with your family.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <CheckSquare size={20} className="text-primary" />
            </div>
            <span className="text-2xl font-bold text-dark dark:text-white">3</span>
          </div>
          <p className="text-dark/70 dark:text-gray-300 text-sm">Tasks Today</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
              <Calendar size={20} className="text-secondary" />
            </div>
            <span className="text-2xl font-bold text-dark dark:text-white">2</span>
          </div>
          <p className="text-dark/70 dark:text-gray-300 text-sm">Events Today</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-warning/20 rounded-xl flex items-center justify-center">
              <Trophy size={20} className="text-warning" />
            </div>
            <span className="text-2xl font-bold text-dark dark:text-white">85</span>
          </div>
          <p className="text-dark/70 dark:text-gray-300 text-sm">Points Earned</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
              <Heart size={20} className="text-accent" />
            </div>
            <span className="text-2xl font-bold text-dark dark:text-white">😊</span>
          </div>
          <p className="text-dark/70 dark:text-gray-300 text-sm">Family Mood</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-dark dark:text-white">Today's Tasks</h2>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {todaysTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                  task.completed
                    ? 'bg-primary/10 border border-primary/20'
                    : 'bg-white/20 border border-white/30'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <button
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      task.completed
                        ? 'bg-primary border-primary'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    {task.completed && <CheckSquare size={12} className="text-white" />}
                  </button>
                  <div>
                    <p className={`font-medium ${task.completed ? 'line-through text-dark/60 dark:text-gray-400' : 'text-dark dark:text-white'}`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-dark/60 dark:text-gray-300">{task.child}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-primary">+{task.points}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-dark dark:text-white">Upcoming Events</h2>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-3 p-3 bg-white/20 rounded-xl">
                <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <Clock size={16} className="text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-dark dark:text-white">{event.title}</p>
                  <p className="text-sm text-dark/60 dark:text-gray-300">{event.child} • {event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Mood Overview */}
        <div className="card">
          <h2 className="text-xl font-semibold text-dark dark:text-white mb-4">Family Mood</h2>
          <div className="space-y-3">
            {moodStats.map((mood, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{mood.emoji}</span>
                  <span className="text-dark/70 dark:text-gray-300">{mood.label}</span>
                </div>
                <span className="font-semibold text-dark dark:text-white">{mood.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="card">
          <h2 className="text-xl font-semibold text-dark dark:text-white mb-4">This Week</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-dark/70 dark:text-gray-300">Tasks Completed</span>
                <span className="font-medium dark:text-white">12/15</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-dark/70 dark:text-gray-300">Points Earned</span>
                <span className="font-medium dark:text-white">245/300</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-secondary h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <Star size={12} className="text-white" />
            </div>
            <h2 className="text-xl font-semibold text-dark dark:text-white">AI Suggestions</h2>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-white/20 rounded-xl">
              <p className="text-sm text-dark dark:text-white">
                Emma has been completing tasks consistently. Consider adding a bonus reward!
              </p>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <p className="text-sm text-dark dark:text-white">
                Schedule Liam's favorite activity after completing homework to boost motivation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};