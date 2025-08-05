import React from 'react';
import {
  Home,
  Calendar,
  CheckSquare,
  UtensilsCrossed,
  Heart,
  BookOpen,
  Trophy,
  BarChart3,
  Settings,
  Users,
  Clock,
  Activity,
  GraduationCap,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'calendar', label: 'Family Calendar', icon: Calendar },
  { id: 'tasks', label: 'Tasks & Chores', icon: CheckSquare },
  { id: 'routines', label: 'Daily Routines', icon: Clock },
  { id: 'meals', label: 'Meal Planner', icon: UtensilsCrossed },
  { id: 'health', label: 'Health & Wellness', icon: Activity },
  { id: 'school', label: 'School Organizer', icon: GraduationCap },
  { id: 'moods', label: 'Mood Tracker', icon: Heart },
  { id: 'journal', label: 'Family Journal', icon: BookOpen },
  { id: 'rewards', label: 'Rewards', icon: Trophy },
  { id: 'children', label: 'Children', icon: Users },
  { id: 'analytics', label: 'Insights', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeTab, onTabChange }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 glassmorphism border-r border-white/20 transform transition-transform duration-300 z-50 lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 pt-20 lg:pt-6">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    onClose();
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/30'
                      : 'hover:bg-white/20 text-dark/80 hover:text-dark'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Enhanced Child Switcher */}
          <div className="mt-8 p-4 glassmorphism rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-dark/60">Active Child</h3>
              <button className="text-xs text-primary hover:text-primary/80 transition-colors">
                Quick View
              </button>
            </div>
            <div className="space-y-2">
              <button className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-white/20 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-r from-secondary to-warning rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
                <div className="flex-1 text-left">
                  <span className="text-dark font-medium block">All Children</span>
                  <span className="text-dark/60 text-xs">View everything</span>
                </div>
              </button>
              
              {/* Sample children with quick stats */}
              <button className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-white/20 transition-colors">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#FF8C94' }}>
                  E
                </div>
                <div className="flex-1 text-left">
                  <span className="text-dark font-medium block">Emma</span>
                  <div className="flex items-center space-x-2 text-xs text-dark/60">
                    <span>2 tasks</span>
                    <span>•</span>
                    <span>245 pts</span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mb-1"></div>
                  <span className="text-xs text-dark/60">✓</span>
                </div>
              </button>
              
              <button className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-white/20 transition-colors">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#5AA9E6' }}>
                  L
                </div>
                <div className="flex-1 text-left">
                  <span className="text-dark font-medium block">Liam</span>
                  <div className="flex items-center space-x-2 text-xs text-dark/60">
                    <span>1 task</span>
                    <span>•</span>
                    <span>189 pts</span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 bg-warning rounded-full mb-1"></div>
                  <span className="text-xs text-dark/60">!</span>
                </div>
              </button>
            </div>
            
            {/* Quick Toggle Buttons */}
            <div className="mt-4 pt-3 border-t border-white/20">
              <div className="flex space-x-2">
                <button className="flex-1 py-2 px-3 bg-primary/20 text-primary rounded-lg text-xs hover:bg-primary/30 transition-colors">
                  Today's Focus
                </button>
                <button className="flex-1 py-2 px-3 bg-white/20 text-dark/70 rounded-lg text-xs hover:bg-white/30 transition-colors">
                  Quick Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};