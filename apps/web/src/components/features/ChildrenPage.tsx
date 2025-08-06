import React from 'react';
import { Users, Plus, Edit, Trophy, Calendar, Heart } from 'lucide-react';

export const ChildrenPage: React.FC = () => {
  const children = [
    {
      id: '1',
      name: 'Emma',
      age: 8,
      avatar: null,
      preferences: ['reading', 'art', 'dancing'],
      allergies: ['peanuts'],
      totalPoints: 245,
      tasksCompleted: 12,
      recentMood: '😊'
    },
    {
      id: '2',
      name: 'Liam',
      age: 6,
      avatar: null,
      preferences: ['soccer', 'legos', 'minecraft'],
      allergies: [],
      totalPoints: 189,
      tasksCompleted: 8,
      recentMood: '😐'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">Children Profiles</h1>
          <p className="text-dark/70 dark:text-gray-300">Manage your children's profiles and preferences</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Child</span>
        </button>
      </div>

      {/* Children Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {children.map((child) => (
          <div key={child.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{child.name[0]}</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-dark dark:text-white">{child.name}</h2>
                  <p className="text-dark/70 dark:text-gray-300">{child.age} years old</p>
                </div>
              </div>
              <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <Edit size={16} className="text-dark/60 dark:text-gray-300" />
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-3 bg-white/20 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Trophy size={16} className="text-warning" />
                </div>
                <p className="font-semibold text-dark dark:text-white">{child.totalPoints}</p>
                <p className="text-xs text-dark/60 dark:text-gray-300">Points</p>
              </div>
              <div className="text-center p-3 bg-white/20 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Calendar size={16} className="text-primary" />
                </div>
                <p className="font-semibold text-dark dark:text-white">{child.tasksCompleted}</p>
                <p className="text-xs text-dark/60 dark:text-gray-300">Tasks</p>
              </div>
              <div className="text-center p-3 bg-white/20 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Heart size={16} className="text-secondary" />
                </div>
                <p className="font-semibold text-dark dark:text-white text-lg">{child.recentMood}</p>
                <p className="text-xs text-dark/60 dark:text-gray-300">Mood</p>
              </div>
            </div>

            {/* Preferences */}
            <div className="mb-4">
              <h3 className="font-medium text-dark dark:text-white mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {child.preferences.map((pref, i) => (
                  <span key={i} className="px-2 py-1 bg-accent/20 text-accent rounded-lg text-xs">
                    {pref}
                  </span>
                ))}
              </div>
            </div>

            {/* Allergies */}
            {child.allergies.length > 0 && (
              <div>
                <h3 className="font-medium text-dark dark:text-white mb-2">Allergies</h3>
                <div className="flex flex-wrap gap-2">
                  {child.allergies.map((allergy, i) => (
                    <span key={i} className="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-xs">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Family Overview */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
            <Users size={20} className="text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-dark dark:text-white">Family Overview</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white/20 rounded-xl">
            <p className="text-2xl font-bold text-dark dark:text-white mb-1">{children.length}</p>
            <p className="text-dark/70 dark:text-gray-300">Children</p>
          </div>
          <div className="text-center p-4 bg-white/20 rounded-xl">
            <p className="text-2xl font-bold text-dark dark:text-white mb-1">
              {children.reduce((sum, child) => sum + child.totalPoints, 0)}
            </p>
            <p className="text-dark/70 dark:text-gray-300">Total Points</p>
          </div>
          <div className="text-center p-4 bg-white/20 rounded-xl">
            <p className="text-2xl font-bold text-dark dark:text-white mb-1">
              {children.reduce((sum, child) => sum + child.tasksCompleted, 0)}
            </p>
            <p className="text-dark/70 dark:text-gray-300">Tasks Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};