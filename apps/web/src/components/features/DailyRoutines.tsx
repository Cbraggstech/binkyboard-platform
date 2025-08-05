import React, { useState } from 'react';
import { Clock, Plus, GripVertical, Play, Pause } from 'lucide-react';

interface RoutineItem {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
  order: number;
}

interface Routine {
  id: string;
  name: string;
  type: 'morning' | 'bedtime' | 'custom';
  items: RoutineItem[];
  childId?: string;
}

export const DailyRoutines: React.FC = () => {
  const [routines] = useState<Routine[]>([
    {
      id: '1',
      name: 'Emma\'s Morning Routine',
      type: 'morning',
      childId: '1',
      items: [
        { id: '1', title: 'Wake up and stretch', duration: 5, completed: true, order: 1 },
        { id: '2', title: 'Brush teeth', duration: 3, completed: true, order: 2 },
        { id: '3', title: 'Get dressed', duration: 10, completed: false, order: 3 },
        { id: '4', title: 'Eat breakfast', duration: 20, completed: false, order: 4 },
        { id: '5', title: 'Pack backpack', duration: 5, completed: false, order: 5 },
      ]
    },
    {
      id: '2',
      name: 'Liam\'s Bedtime Routine',
      type: 'bedtime',
      childId: '2',
      items: [
        { id: '6', title: 'Put away toys', duration: 10, completed: false, order: 1 },
        { id: '7', title: 'Take a bath', duration: 15, completed: false, order: 2 },
        { id: '8', title: 'Brush teeth', duration: 3, completed: false, order: 3 },
        { id: '9', title: 'Read bedtime story', duration: 15, completed: false, order: 4 },
        { id: '10', title: 'Say goodnight', duration: 2, completed: false, order: 5 },
      ]
    }
  ]);

  const [activeRoutine, setActiveRoutine] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const getRoutineProgress = (routine: Routine) => {
    const completed = routine.items.filter(item => item.completed).length;
    return Math.round((completed / routine.items.length) * 100);
  };

  const getTotalDuration = (routine: Routine) => {
    return routine.items.reduce((total, item) => total + item.duration, 0);
  };

  const getTypeColor = (type: Routine['type']) => {
    switch (type) {
      case 'morning': return 'bg-warning/20 text-warning';
      case 'bedtime': return 'bg-purple-100 text-purple-600';
      case 'custom': return 'bg-accent/20 text-accent';
    }
  };

  const startRoutine = (routineId: string) => {
    setActiveRoutine(routineId);
    setCurrentStep(0);
  };

  const stopRoutine = () => {
    setActiveRoutine(null);
    setCurrentStep(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark">Daily Routines</h1>
          <p className="text-dark/70">Build healthy habits with structured daily routines</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>Create Routine</span>
        </button>
      </div>

      {/* Routine Templates */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card cursor-pointer hover:shadow-lg transition-all">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={24} className="text-warning" />
            </div>
            <h3 className="font-semibold text-dark mb-2">Morning Routine</h3>
            <p className="text-dark/70 text-sm">Start the day right</p>
          </div>
        </div>
        
        <div className="card cursor-pointer hover:shadow-lg transition-all">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={24} className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-dark mb-2">Bedtime Routine</h3>
            <p className="text-dark/70 text-sm">Wind down peacefully</p>
          </div>
        </div>
        
        <div className="card cursor-pointer hover:shadow-lg transition-all">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus size={24} className="text-accent" />
            </div>
            <h3 className="font-semibold text-dark mb-2">Custom Routine</h3>
            <p className="text-dark/70 text-sm">Create your own</p>
          </div>
        </div>
      </div>

      {/* Active Routines */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-dark">Your Routines</h2>
        {routines.map((routine) => (
          <div key={routine.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Clock size={20} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-dark">{routine.name}</h3>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getTypeColor(routine.type)}`}>
                      {routine.type}
                    </span>
                  </div>
                  <p className="text-sm text-dark/60">
                    {routine.items.length} steps • {getTotalDuration(routine)} minutes
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-dark">{getRoutineProgress(routine)}%</p>
                  <div className="w-20 bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getRoutineProgress(routine)}%` }}
                    ></div>
                  </div>
                </div>
                
                {activeRoutine === routine.id ? (
                  <button 
                    onClick={stopRoutine}
                    className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                  >
                    <Pause size={16} className="text-red-600" />
                  </button>
                ) : (
                  <button 
                    onClick={() => startRoutine(routine.id)}
                    className="p-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors"
                  >
                    <Play size={16} className="text-primary" />
                  </button>
                )}
              </div>
            </div>

            {/* Routine Steps */}
            <div className="space-y-2">
              {routine.items.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    item.completed 
                      ? 'bg-primary/10 border border-primary/20' 
                      : activeRoutine === routine.id && currentStep === index
                      ? 'bg-warning/10 border border-warning/20 ring-2 ring-warning/20'
                      : 'bg-white/20'
                  }`}
                >
                  <button className="cursor-grab">
                    <GripVertical size={16} className="text-dark/40" />
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        item.completed
                          ? 'bg-primary border-primary'
                          : 'border-gray-300 hover:border-primary'
                      }`}
                    >
                      {item.completed && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    <span className={`font-medium ${item.completed ? 'line-through text-dark/60' : 'text-dark'}`}>
                      {item.title}
                    </span>
                  </div>
                  
                  <div className="ml-auto text-sm text-dark/60">
                    {item.duration} min
                  </div>
                </div>
              ))}
            </div>

            {activeRoutine === routine.id && (
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-dark">
                      Step {currentStep + 1}: {routine.items[currentStep]?.title}
                    </p>
                    <p className="text-sm text-dark/70">
                      {routine.items[currentStep]?.duration} minutes
                    </p>
                  </div>
                  <button 
                    onClick={() => setCurrentStep(prev => Math.min(prev + 1, routine.items.length - 1))}
                    className="btn-primary"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};