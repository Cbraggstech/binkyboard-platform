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
  Menu,
  ChevronRight,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
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

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onOpen, activeTab, onTabChange }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Always takes space in layout */}
      <aside className={`transition-all duration-300 h-screen glassmorphism border-r border-white/20 flex-shrink-0 ${
        isOpen ? 'w-80' : 'w-16'
      }`}>
        <div className="h-full overflow-y-auto overflow-x-hidden">
          {!isOpen ? (
            /* Collapsed Icon View */
            <div className="p-2">
              {/* Toggle Button */}
              <div className="mb-4">
                <button
                  onClick={onOpen}
                  className="flex items-center justify-center w-full p-3 rounded-xl transition-all duration-200 hover:bg-white/20 text-dark/80 hover:text-dark group"
                  title="Open Navigation"
                >
                  <Menu size={20} />
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 px-2 py-1 bg-dark text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-[99999]">
                    Open Navigation
                  </div>
                </button>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onTabChange(item.id)}
                      className={`flex items-center justify-center w-full p-3 rounded-xl transition-all duration-200 group relative ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/30'
                          : 'hover:bg-white/20 text-dark/80 hover:text-dark'
                      }`}
                      title={item.label}
                    >
                      <Icon size={20} />
                      
                      {/* Tooltip */}
                      <div className="absolute left-full ml-2 px-2 py-1 bg-dark text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-[99999]">
                        {item.label}
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          ) : (
            /* Expanded Full View */
            <div className="p-6">
              {/* Close Button */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-dark">Navigation</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors text-dark/80 hover:text-dark"
                >
                  <ChevronRight size={20} className="rotate-180" />
                </button>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id);
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/30'
                          : 'hover:bg-white/20 text-dark/80 hover:text-dark'
                      }`}
                    >
                      <Icon size={20} className="flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Family Overview Panel */}
              <div className="mt-8 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden">
                {/* Header */}
                <div className="px-5 py-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white text-lg font-bold">🏠</span>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-dark">Family Hub</h3>
                        <p className="text-xs text-dark/60">Currently viewing all members</p>
                      </div>
                    </div>
                    <button className="text-xs text-primary hover:text-primary/80 transition-colors font-semibold bg-primary/10 px-3 py-1.5 rounded-lg">
                      Switch
                    </button>
                  </div>
                </div>

                {/* Family Stats */}
                <div className="px-5 py-4">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">4</div>
                      <div className="text-xs text-dark/60">Total Tasks</div>
                    </div>
                    <div className="text-center border-l border-r border-white/20">
                      <div className="text-lg font-bold text-green-600">746</div>
                      <div className="text-xs text-dark/60">Total Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-500">1</div>
                      <div className="text-xs text-dark/60">Overdue</div>
                    </div>
                  </div>

                  {/* Member Quick View */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-dark/70 uppercase tracking-wide mb-2">Members</h4>
                    
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">E</span>
                        </div>
                        <span className="text-sm font-medium text-dark">Emma</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-dark/60">245 pts</span>
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">L</span>
                        </div>
                        <span className="text-sm font-medium text-dark">Liam</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-dark/60">189 pts</span>
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">S</span>
                        </div>
                        <span className="text-sm font-medium text-dark">Sophie</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-dark/60">312 pts</span>
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};