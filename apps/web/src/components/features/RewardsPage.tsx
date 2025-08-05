import React from 'react';
import { Trophy, Plus, Gift, Star } from 'lucide-react';

export const RewardsPage: React.FC = () => {
  const rewards = [
    { id: '1', title: 'Extra Screen Time', description: '30 minutes of additional tablet time', pointsCost: 50, child: 'Emma', available: true },
    { id: '2', title: 'Choose Dinner', description: 'Pick what the family has for dinner', pointsCost: 75, child: 'Liam', available: true },
    { id: '3', title: 'Movie Night Pick', description: 'Choose the movie for family movie night', pointsCost: 100, child: 'Emma', available: false },
    { id: '4', title: 'Stay Up Late', description: '30 minutes past regular bedtime', pointsCost: 80, child: 'Liam', available: true },
  ];

  const pointsEarned = { Emma: 120, Liam: 95 };
  const recentRedemptions = [
    { child: 'Emma', reward: 'Extra Screen Time', date: '2 days ago' },
    { child: 'Liam', reward: 'Choose Dinner', date: '1 week ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark">Reward System</h1>
          <p className="text-dark/70">Motivate and celebrate your children's achievements</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>Create Reward</span>
        </button>
      </div>

      {/* Points Overview */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-dark">Emma's Points</h3>
            <div className="w-12 h-12 bg-gradient-to-r from-secondary to-warning rounded-full flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-primary mb-2">{pointsEarned.Emma}</div>
          <p className="text-dark/70">Available points</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-dark">Liam's Points</h3>
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-primary mb-2">{pointsEarned.Liam}</div>
          <p className="text-dark/70">Available points</p>
        </div>
      </div>

      {/* Available Rewards */}
      <div>
        <h2 className="text-xl font-semibold text-dark mb-4">Available Rewards</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((reward) => {
            const childPoints = pointsEarned[reward.child as keyof typeof pointsEarned];
            const canAfford = childPoints >= reward.pointsCost;
            
            return (
              <div key={reward.id} className={`card ${!canAfford ? 'opacity-60' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-warning/20 rounded-xl flex items-center justify-center">
                    <Gift size={20} className="text-warning" />
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    reward.child === 'Emma' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'
                  }`}>
                    {reward.child}
                  </span>
                </div>
                
                <h3 className="font-semibold text-dark mb-2">{reward.title}</h3>
                <p className="text-dark/70 text-sm mb-4">{reward.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Trophy size={16} className="text-warning" />
                    <span className="font-semibold text-dark">{reward.pointsCost}</span>
                    <span className="text-dark/60 text-sm">points</span>
                  </div>
                  <button 
                    disabled={!canAfford}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      canAfford 
                        ? 'bg-primary text-white hover:bg-primary/90' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Redeem' : 'Not enough points'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Redemptions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-dark mb-4">Recent Redemptions</h2>
        <div className="space-y-3">
          {recentRedemptions.map((redemption, i) => (
            <div key={i} className="flex items-center space-x-3 p-3 bg-white/20 rounded-xl">
              <div className="w-10 h-10 bg-warning/20 rounded-xl flex items-center justify-center">
                <Star size={16} className="text-warning" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-dark">{redemption.reward}</p>
                <p className="text-sm text-dark/60">{redemption.child} • {redemption.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};