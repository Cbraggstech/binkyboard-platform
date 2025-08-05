import React, { useState, useMemo } from 'react';
import { CheckSquare, Plus, Trophy, Star, Clock, Users, ThumbsUp, ThumbsDown, Gift, Zap, Target, Award } from 'lucide-react';
import type { Child, Reward, Task } from '../../types';

export const EnhancedChoreRewardSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chores' | 'rewards' | 'store' | 'approval'>('chores');
  const [selectedChild, setSelectedChild] = useState<string | 'all'>('all');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);

  // Sample children data
  const children: Child[] = [
    {
      id: '1',
      name: 'Emma',
      age: 8,
      colorTag: '#FF8C94',
      totalPoints: 245
    } as Child,
    {
      id: '2', 
      name: 'Liam',
      age: 6,
      colorTag: '#5AA9E6',
      totalPoints: 189
    } as Child
  ];

  // Enhanced tasks with approval system
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Clean bedroom',
      description: 'Make bed, put toys away, vacuum if needed',
      childId: '1',
      points: 15,
      completed: true,
      completedAt: new Date('2024-08-05T09:30:00'),
      frequency: {
        type: 'weekly',
        days: ['monday', 'wednesday', 'friday'],
        interval: 1
      },
      category: 'chore',
      dueDate: new Date('2024-08-05T12:00:00'),
      approvalRequired: true,
      approvedBy: undefined,
      approvedAt: undefined,
      parentId: 'parent1',
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Homework - Math worksheet',
      description: 'Complete pages 15-17, show all work',
      childId: '2',
      points: 20,
      completed: true,
      completedAt: new Date('2024-08-05T16:45:00'),
      frequency: {
        type: 'daily',
        interval: 1
      },
      category: 'homework',
      dueDate: new Date('2024-08-05T18:00:00'),
      approvalRequired: true,
      approvedBy: 'parent1',
      approvedAt: new Date('2024-08-05T17:00:00'),
      parentId: 'parent1',
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Feed pet',
      description: 'Give Fluffy fresh food and water',
      childId: '1',
      points: 5,
      completed: false,
      frequency: {
        type: 'daily',
        interval: 1
      },
      category: 'chore',
      dueDate: new Date('2024-08-05T18:00:00'),
      approvalRequired: false,
      parentId: 'parent1',
      createdAt: new Date()
    },
    {
      id: '4',
      title: 'Practice piano',
      description: '20 minutes of practice - scales and current song',
      childId: '1',
      points: 10,
      completed: true,
      completedAt: new Date('2024-08-05T15:30:00'),
      frequency: {
        type: 'weekly',
        days: ['monday', 'wednesday', 'friday'],
        interval: 1
      },
      category: 'personal',
      dueDate: new Date('2024-08-05T19:00:00'),
      approvalRequired: false,
      parentId: 'parent1',
      createdAt: new Date()
    }
  ]);

  // Enhanced reward store
  const [rewards] = useState<Reward[]>([
    {
      id: '1',
      title: 'Extra Screen Time',
      description: '30 minutes additional tablet/TV time',
      pointsCost: 25,
      childId: '1',
      redeemed: false,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Choose Family Movie',
      description: 'Pick the movie for family movie night',
      pointsCost: 50,
      childId: '1',
      redeemed: true,
      redeemedAt: new Date('2024-08-03'),
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Stay Up 30 Min Late',
      description: 'Extended bedtime on weekend',
      pointsCost: 40,
      childId: '2',
      redeemed: false,
      createdAt: new Date()
    },
    {
      id: '4',
      title: 'Special Treat',
      description: 'Choose a special snack or dessert',
      pointsCost: 15,
      childId: '2',
      redeemed: false,
      createdAt: new Date()
    }
  ]);

  // Reward store items (available to all children)
  const rewardStore = [
    { id: 'store1', title: 'Extra Playtime', description: '15 minutes extra outdoor play', cost: 20, category: 'time', icon: '⏰' },
    { id: 'store2', title: 'Choose Dinner', description: 'Pick what family has for dinner', cost: 35, category: 'choice', icon: '🍽️' },
    { id: 'store3', title: 'Friend Sleepover', description: 'Have a friend sleep over (weekend)', cost: 100, category: 'social', icon: '🏠' },
    { id: 'store4', title: 'New Book', description: 'Pick a new book from the store', cost: 75, category: 'item', icon: '📚' },
    { id: 'store5', title: 'Art Supplies', description: 'New crayons, markers, or paper', cost: 60, category: 'item', icon: '🎨' },
    { id: 'store6', title: 'Ice Cream Trip', description: 'Special trip to ice cream shop', cost: 80, category: 'outing', icon: '🍦' }
  ];

  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    points: 10,
    category: 'chore',
    frequency: {
      type: 'once',
      interval: 1,
      days: []
    },
    approvalRequired: false,
    dueDate: new Date()
  });

  // Filter tasks based on selected child
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => 
      selectedChild === 'all' || task.childId === selectedChild
    );
  }, [tasks, selectedChild]);

  // Get tasks pending approval
  const pendingApprovalTasks = useMemo(() => {
    return tasks.filter(task => 
      task.completed && 
      task.approvalRequired && 
      !task.approvedBy
    );
  }, [tasks]);

  // Calculate child points
  const getChildPoints = (childId: string) => {
    const approvedTasks = tasks.filter(task => 
      task.childId === childId && 
      task.completed && 
      (!task.approvalRequired || task.approvedBy)
    );
    return approvedTasks.reduce((total, task) => total + task.points, 0);
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'chore': '🧹',
      'homework': '📚',
      'personal': '🎯',
      'family': '👨‍👩‍👧‍👦'
    };
    return icons[category as keyof typeof icons] || '✅';
  };

  const getFrequencyText = (frequency: Task['frequency']) => {
    if (frequency.type === 'once') return 'One time';
    if (frequency.type === 'daily') return `Every ${frequency.interval > 1 ? frequency.interval + ' ' : ''}day${frequency.interval > 1 ? 's' : ''}`;
    if (frequency.type === 'weekly') {
      if (frequency.days && frequency.days.length > 0) {
        return `Weekly on ${frequency.days.map(d => d.charAt(0).toUpperCase() + d.slice(1, 3)).join(', ')}`;
      }
      return `Every ${frequency.interval > 1 ? frequency.interval + ' ' : ''}week${frequency.interval > 1 ? 's' : ''}`;
    }
    if (frequency.type === 'monthly') return `Every ${frequency.interval > 1 ? frequency.interval + ' ' : ''}month${frequency.interval > 1 ? 's' : ''}`;
    return 'Custom';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark">Chore & Reward System</h1>
          <p className="text-dark/70">Motivate children with smart task management and rewards</p>
        </div>
        <div className="flex items-center space-x-3">
          {pendingApprovalTasks.length > 0 && (
            <button 
              onClick={() => setActiveTab('approval')}
              className="flex items-center space-x-2 px-4 py-2 bg-warning/20 text-warning rounded-xl hover:bg-warning/30 transition-colors"
            >
              <ThumbsUp size={16} />
              <span>{pendingApprovalTasks.length} Pending</span>
            </button>
          )}
          <button 
            onClick={() => setShowTaskModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Child Points Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {children.map(child => {
          const earnedPoints = getChildPoints(child.id);
          const pendingPoints = tasks
            .filter(task => task.childId === child.id && task.completed && task.approvalRequired && !task.approvedBy)
            .reduce((total, task) => total + task.points, 0);
          
          return (
            <div key={child.id} className="card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: child.colorTag }}
                  >
                    {child.name[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark">{child.name}</h3>
                    <p className="text-sm text-dark/60">{child.age} years old</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dark/70">Available Points</span>
                  <span className="font-bold text-primary text-lg">{earnedPoints}</span>
                </div>
                {pendingPoints > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-warning">Pending Approval</span>
                    <span className="font-semibold text-warning">+{pendingPoints}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dark/70">Total Earned</span>
                  <span className="font-medium text-dark">{earnedPoints + pendingPoints}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white/20 rounded-lg p-1">
        {[
          { id: 'chores', label: 'Tasks & Chores', icon: CheckSquare },
          { id: 'rewards', label: 'My Rewards', icon: Trophy },
          { id: 'store', label: 'Reward Store', icon: Gift },
          { id: 'approval', label: 'Pending Approval', icon: ThumbsUp, badge: pendingApprovalTasks.length }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors relative ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'hover:bg-white/20 text-dark/70'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.badge && tab.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-warning text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {activeTab === 'chores' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex items-center space-x-4">
                <select 
                  className="input-field w-40"
                  value={selectedChild}
                  onChange={(e) => setSelectedChild(e.target.value)}
                >
                  <option value="all">All Children</option>
                  {children.map(child => (
                    <option key={child.id} value={child.id}>{child.name}</option>
                  ))}
                </select>
                
                <div className="flex space-x-2">
                  {['all', 'chore', 'homework', 'personal', 'family'].map(category => (
                    <button
                      key={category}
                      className="px-3 py-1 bg-white/20 text-dark/70 rounded-lg text-sm hover:bg-white/30 transition-colors capitalize"
                    >
                      {category === 'all' ? 'All Categories' : category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tasks List */}
              <div className="space-y-4">
                {filteredTasks.map(task => {
                  const child = children.find(c => c.id === task.childId);
                  const isOverdue = task.dueDate && task.dueDate < new Date() && !task.completed;
                  const needsApproval = task.completed && task.approvalRequired && !task.approvedBy;
                  
                  return (
                    <div 
                      key={task.id}
                      className={`card ${needsApproval ? 'border-2 border-warning/50' : ''} ${isOverdue ? 'border-2 border-red-500/50' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <button
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center mt-1 transition-colors ${
                              task.completed
                                ? 'bg-primary border-primary'
                                : 'border-gray-300 hover:border-primary'
                            }`}
                          >
                            {task.completed && <CheckSquare size={14} className="text-white" />}
                          </button>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className={`font-semibold ${task.completed ? 'line-through text-dark/60' : 'text-dark'}`}>
                                {task.title}
                              </h3>
                              <span className="text-lg">{getCategoryIcon(task.category)}</span>
                              <span className={`px-2 py-1 rounded-lg text-xs font-medium bg-${task.category === 'chore' ? 'blue' : task.category === 'homework' ? 'green' : task.category === 'personal' ? 'purple' : 'orange'}-100 text-${task.category === 'chore' ? 'blue' : task.category === 'homework' ? 'green' : task.category === 'personal' ? 'purple' : 'orange'}-600`}>
                                {task.category}
                              </span>
                              {task.frequency.type !== 'once' && (
                                <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-lg text-xs">
                                  🔄 {getFrequencyText(task.frequency)}
                                </span>
                              )}
                            </div>
                            
                            {task.description && (
                              <p className="text-dark/70 text-sm mb-2">{task.description}</p>
                            )}
                            
                            <div className="flex items-center space-x-4 text-sm text-dark/60">
                              <div className="flex items-center space-x-1">
                                <div 
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: child?.colorTag }}
                                />
                                <span>{child?.name}</span>
                              </div>
                              
                              {task.dueDate && (
                                <div className="flex items-center space-x-1">
                                  <Clock size={12} />
                                  <span className={isOverdue ? 'text-red-500 font-medium' : ''}>
                                    Due: {task.dueDate.toLocaleDateString()} {task.dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              )}
                              
                              {task.completedAt && (
                                <div className="flex items-center space-x-1">
                                  <CheckSquare size={12} />
                                  <span>Completed: {task.completedAt.toLocaleDateString()}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          {needsApproval && (
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-warning font-medium">Needs Approval</span>
                              <div className="flex space-x-1">
                                <button className="p-1 bg-green-100 hover:bg-green-200 rounded transition-colors">
                                  <ThumbsUp size={12} className="text-green-600" />
                                </button>
                                <button className="p-1 bg-red-100 hover:bg-red-200 rounded transition-colors">
                                  <ThumbsDown size={12} className="text-red-600" />
                                </button>
                              </div>
                            </div>
                          )}
                          
                          {task.approvedBy && (
                            <div className="flex items-center space-x-1 text-green-600">
                              <ThumbsUp size={12} />
                              <span className="text-xs">Approved</span>
                            </div>
                          )}
                          
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                              <Trophy size={14} className="text-warning" />
                              <span className="font-semibold text-primary">+{task.points}</span>
                            </div>
                            {task.frequency.type !== 'once' && (
                              <span className="text-xs text-dark/60">per completion</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'store' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-dark">Reward Store</h2>
                <button 
                  onClick={() => setShowRewardModal(true)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Custom Reward</span>
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rewardStore.map(reward => {
                  const canAfford = children.every(child => getChildPoints(child.id) >= reward.cost);
                  
                  return (
                    <div key={reward.id} className={`card ${!canAfford ? 'opacity-60' : ''}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-warning to-secondary rounded-xl flex items-center justify-center text-2xl">
                            {reward.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-dark">{reward.title}</h3>
                            <p className="text-sm text-dark/60 capitalize">{reward.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Trophy size={14} className="text-warning" />
                            <span className="font-bold text-dark">{reward.cost}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-dark/70 text-sm mb-4">{reward.description}</p>
                      
                      <button 
                        disabled={!canAfford}
                        className={`w-full py-2 rounded-lg font-medium transition-colors ${
                          canAfford 
                            ? 'bg-primary text-white hover:bg-primary/90' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? 'Redeem Reward' : 'Not Enough Points'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'approval' && (
            <div>
              <h2 className="text-xl font-semibold text-dark mb-6">Tasks Pending Approval</h2>
              
              {pendingApprovalTasks.length === 0 ? (
                <div className="card text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ThumbsUp size={24} className="text-green-600" />
                  </div>
                  <h3 className="font-semibold text-dark mb-2">All caught up!</h3>
                  <p className="text-dark/70">No tasks are waiting for approval.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingApprovalTasks.map(task => {
                    const child = children.find(c => c.id === task.childId);
                    
                    return (
                      <div key={task.id} className="card border-2 border-warning/50">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                              style={{ backgroundColor: child?.colorTag }}
                            >
                              {child?.name[0]}
                            </div>
                            
                            <div>
                              <h3 className="font-semibold text-dark mb-1">{task.title}</h3>
                              <p className="text-dark/70 text-sm mb-2">{task.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-dark/60">
                                <span>Completed by {child?.name}</span>
                                <span>on {task.completedAt?.toLocaleDateString()}</span>
                                <span>at {task.completedAt?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="text-right mr-4">
                              <div className="flex items-center space-x-1">
                                <Trophy size={14} className="text-warning" />
                                <span className="font-semibold text-primary">+{task.points}</span>
                              </div>
                              <span className="text-xs text-dark/60">points to award</span>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors flex items-center space-x-2">
                                <ThumbsUp size={16} />
                                <span>Approve</span>
                              </button>
                              <button className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors flex items-center space-x-2">
                                <ThumbsDown size={16} />
                                <span>Reject</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weekly Progress */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Target size={20} className="text-primary" />
              <h3 className="font-semibold text-dark">Weekly Progress</h3>
            </div>
            
            {children.map(child => {
              const childTasks = tasks.filter(t => t.childId === child.id);
              const completedThisWeek = childTasks.filter(t => t.completed).length;
              const totalThisWeek = childTasks.length;
              const percentage = totalThisWeek > 0 ? (completedThisWeek / totalThisWeek) * 100 : 0;
              
              return (
                <div key={child.id} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-dark">{child.name}</span>
                    <span className="text-sm font-medium">{completedThisWeek}/{totalThisWeek}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: child.colorTag 
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Achievement Badges */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Award size={20} className="text-warning" />
              <h3 className="font-semibold text-dark">Recent Achievements</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 bg-white/20 rounded-lg">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="text-sm font-medium text-dark">Task Master</p>
                  <p className="text-xs text-dark/60">Completed 5 tasks in a row</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-white/20 rounded-lg">
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="text-sm font-medium text-dark">Early Bird</p>
                  <p className="text-xs text-dark/60">Completed morning routine on time</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-white/20 rounded-lg">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="text-sm font-medium text-dark">Week Warrior</p>
                  <p className="text-xs text-dark/60">100% task completion this week</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <h3 className="font-semibold text-dark mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-dark/70">Total Tasks This Week</span>
                <span className="font-bold text-dark">{filteredTasks.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dark/70">Completed</span>
                <span className="font-bold text-green-600">{filteredTasks.filter(t => t.completed).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dark/70">Pending Approval</span>
                <span className="font-bold text-warning">{pendingApprovalTasks.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dark/70">Points Available</span>
                <span className="font-bold text-primary">
                  {children.reduce((total, child) => total + getChildPoints(child.id), 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};