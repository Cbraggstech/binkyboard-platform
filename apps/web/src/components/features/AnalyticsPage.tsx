import React from 'react';
import { BarChart3, TrendingUp, Target, Calendar } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const weeklyData = [
    { day: 'Mon', Emma: 8, Liam: 6 },
    { day: 'Tue', Emma: 10, Liam: 4 },
    { day: 'Wed', Emma: 6, Liam: 8 },
    { day: 'Thu', Emma: 12, Liam: 10 },
    { day: 'Fri', Emma: 9, Liam: 7 },
    { day: 'Sat', Emma: 5, Liam: 3 },
    { day: 'Sun', Emma: 4, Liam: 5 },
  ];

  const insights = [
    {
      type: 'positive',
      title: 'Great Progress!',
      description: 'Emma has completed 92% of her tasks this week.',
      metric: '92%'
    },
    {
      type: 'attention',
      title: 'Room for Improvement',
      description: 'Liam\'s task completion has dropped to 65% this week.',
      metric: '65%'
    },
    {
      type: 'neutral',
      title: 'Consistency Matters',
      description: 'Both children are most productive on weekdays.',
      metric: 'Weekdays'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-dark dark:text-white">Analytics & Insights</h1>
        <p className="text-dark/70 dark:text-gray-300">Track progress and discover patterns in your family's activities</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <Target size={20} className="text-primary" />
            </div>
            <TrendingUp size={16} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-dark dark:text-white">78%</p>
          <p className="text-dark/70 dark:text-gray-300 text-sm">Task Completion Rate</p>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
              <BarChart3 size={20} className="text-secondary" />
            </div>
            <TrendingUp size={16} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-dark dark:text-white">434</p>
          <p className="text-dark/70 dark:text-gray-300 text-sm">Points Earned</p>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-warning/20 rounded-xl flex items-center justify-center">
              <Calendar size={20} className="text-warning" />
            </div>
            <span className="text-sm text-dark/60 dark:text-gray-300">+2</span>
          </div>
          <p className="text-2xl font-bold text-dark dark:text-white">5.2</p>
          <p className="text-dark/70 dark:text-gray-300 text-sm">Avg Daily Tasks</p>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
              <span className="text-accent text-lg">😊</span>
            </div>
            <span className="text-sm text-green-500">Stable</span>
          </div>
          <p className="text-2xl font-bold text-dark dark:text-white">4.2</p>
          <p className="text-dark/70 dark:text-gray-300 text-sm">Avg Mood Score</p>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-dark dark:text-white">Weekly Task Completion</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
              <span className="text-sm text-dark/70 dark:text-gray-300">Emma</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-dark/70 dark:text-gray-300">Liam</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-end justify-between h-64 px-4">
          {weeklyData.map((data, i) => {
            const maxValue = Math.max(...weeklyData.map(d => Math.max(d.Emma, d.Liam)));
            const emmaHeight = (data.Emma / maxValue) * 200;
            const liamHeight = (data.Liam / maxValue) * 200;
            
            return (
              <div key={i} className="flex flex-col items-center space-y-2">
                <div className="flex items-end space-x-1">
                  <div 
                    className="w-6 bg-secondary rounded-t"
                    style={{ height: `${emmaHeight}px` }}
                  ></div>
                  <div 
                    className="w-6 bg-primary rounded-t"
                    style={{ height: `${liamHeight}px` }}
                  ></div>
                </div>
                <span className="text-xs text-dark/60 dark:text-gray-300">{data.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insights */}
      <div>
        <h2 className="text-xl font-semibold text-dark dark:text-white mb-4">AI-Powered Insights</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {insights.map((insight, i) => {
            const bgColor = {
              positive: 'bg-green-50 border-green-200',
              attention: 'bg-orange-50 border-orange-200',
              neutral: 'bg-blue-50 border-blue-200'
            }[insight.type];
            
            return (
              <div key={i} className={`p-4 rounded-xl border ${bgColor} backdrop-blur-sm`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-dark dark:text-white">{insight.title}</h3>
                  <span className="text-lg font-bold text-primary">{insight.metric}</span>
                </div>
                <p className="text-dark/70 dark:text-gray-300 text-sm">{insight.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mood Trends */}
      <div className="card">
        <h2 className="text-xl font-semibold text-dark dark:text-white mb-4">Family Mood Trends</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-dark dark:text-white mb-3">Emma's Mood This Week</h3>
            <div className="space-y-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => {
                const moods = ['😊', '😁', '😊', '😐', '😊'];
                return (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-dark/70 dark:text-gray-300">{day}</span>
                    <span className="text-xl">{moods[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-dark dark:text-white mb-3">Liam's Mood This Week</h3>
            <div className="space-y-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => {
                const moods = ['😐', '😊', '😢', '😊', '😁'];
                return (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-dark/70 dark:text-gray-300">{day}</span>
                    <span className="text-xl">{moods[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};