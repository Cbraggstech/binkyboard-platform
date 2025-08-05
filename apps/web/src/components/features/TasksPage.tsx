import React, { useState } from 'react';
import { Plus, Filter, CheckSquare, Clock, Trophy } from 'lucide-react';

export const TasksPage: React.FC = () => {
  const [tasks] = useState([
    {
      id: '1',
      title: 'Clean bedroom',
      description: 'Make bed, put toys away, vacuum if needed',
      child: 'Emma',
      points: 10,
      completed: false,
      category: 'chore',
      dueDate: new Date(),
      recurring: 'daily' as const,
    },
    {
      id: '2',
      title: 'Homework - Math',
      description: 'Complete worksheet pages 15-17',
      child: 'Liam',
      points: 15,
      completed: true,
      category: 'homework',
      dueDate: new Date(),
    },
    {
      id: '3',
      title: 'Feed pet',
      description: 'Give Fluffy her morning food and fresh water',
      child: 'Emma',
      points: 5,
      completed: false,
      category: 'chore',
      dueDate: new Date(),
      recurring: 'daily' as const,
    },
  ]);

  const categoryColors = {
    chore: 'bg-primary/20 text-primary',
    homework: 'bg-secondary/20 text-secondary',
    personal: 'bg-accent/20 text-accent',
    family: 'bg-warning/20 text-warning',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark">Tasks & Chores</h1>
          <p className="text-dark/70">Manage and track daily tasks for your children</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Task</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 glassmorphism rounded-xl hover:bg-white/30 transition-colors">
          <Filter size={16} />
          <span>All Tasks</span>
        </button>
        <button className="px-4 py-2 glassmorphism rounded-xl hover:bg-white/30 transition-colors">
          Emma's Tasks
        </button>
        <button className="px-4 py-2 glassmorphism rounded-xl hover:bg-white/30 transition-colors">
          Liam's Tasks
        </button>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-dark">{tasks.filter(t => !t.completed).length}</p>
              <p className="text-dark/70 text-sm">Pending Tasks</p>
            </div>
            <Clock className="text-primary" size={24} />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-dark">{tasks.filter(t => t.completed).length}</p>
              <p className="text-dark/70 text-sm">Completed Today</p>
            </div>
            <CheckSquare className="text-primary" size={24} />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-dark">
                {tasks.reduce((sum, task) => sum + (task.completed ? task.points : 0), 0)}
              </p>
              <p className="text-dark/70 text-sm">Points Earned</p>
            </div>
            <Trophy className="text-warning" size={24} />
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-dark">Today's Tasks</h2>
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`card flex items-center justify-between transition-all ${
              task.completed ? 'opacity-75' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              <button
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                  task.completed
                    ? 'bg-primary border-primary'
                    : 'border-gray-300 hover:border-primary'
                }`}
              >
                {task.completed && <CheckSquare size={14} className="text-white" />}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-1">
                  <h3 className={`font-semibold ${task.completed ? 'line-through text-dark/60' : 'text-dark'}`}>
                    {task.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${categoryColors[task.category as keyof typeof categoryColors]}`}>
                    {task.category}
                  </span>
                  {task.recurring && (
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-lg text-xs">
                      {task.recurring}
                    </span>
                  )}
                </div>
                <p className="text-dark/70 text-sm">{task.description}</p>
                <p className="text-dark/60 text-xs mt-1">Assigned to: {task.child}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-primary">+{task.points} points</p>
                <p className="text-xs text-dark/60">Due today</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};