import React, { useState } from 'react';
import { Menu, X, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  activeChild?: string;
  onChildChange?: (child: string) => void;
}

const children = [
  { id: 'family', name: 'Family View', emoji: '🏠', color: 'from-primary to-secondary' },
  { id: 'emma', name: 'Emma', emoji: 'E', color: 'bg-pink-500' },
  { id: 'liam', name: 'Liam', emoji: 'L', color: 'bg-blue-500' },
  { id: 'sophie', name: 'Sophie', emoji: 'S', color: 'bg-purple-500' },
];

export const Header: React.FC<HeaderProps> = ({ 
  onMenuToggle, 
  isMenuOpen, 
  activeChild = 'family', 
  onChildChange = () => {} 
}) => {
  const { user, signOut } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isChildMenuOpen, setIsChildMenuOpen] = useState(false);

  return (
    <header className="glassmorphism sticky top-0 z-50 px-4 py-3 border-b border-white/20">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Menu Toggle */}
        <div className="flex items-center space-x-4">
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors lg:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <h1 className="text-xl font-bold text-dark">BinkyBoard</h1>
          </div>
        </div>

        {/* Center - Child Switcher */}
        <div className="hidden md:block relative">
          <button
            onClick={() => setIsChildMenuOpen(!isChildMenuOpen)}
            className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 border border-white/20"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              children.find(c => c.id === activeChild)?.color.includes('gradient') 
                ? `bg-gradient-to-r ${children.find(c => c.id === activeChild)?.color}` 
                : children.find(c => c.id === activeChild)?.color
            }`}>
              <span className="text-white text-sm font-bold">
                {children.find(c => c.id === activeChild)?.emoji}
              </span>
            </div>
            <span className="text-dark font-medium">
              {children.find(c => c.id === activeChild)?.name}
            </span>
            <ChevronDown size={16} className="text-dark/60" />
          </button>

          {isChildMenuOpen && (
            <div className="absolute top-full mt-2 left-0 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 py-2 z-[9999]">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => {
                    onChildChange(child.id);
                    setIsChildMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 text-left hover:bg-white/10 transition-colors ${
                    activeChild === child.id ? 'bg-primary/10 border-l-2 border-primary' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    child.color.includes('gradient') 
                      ? `bg-gradient-to-r ${child.color}` 
                      : child.color
                  }`}>
                    <span className="text-white text-sm font-bold">{child.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-dark font-medium block">{child.name}</span>
                    {child.id !== 'family' && (
                      <span className="text-dark/60 text-xs">
                        {child.id === 'emma' ? '3 pending • 245 pts' : 
                         child.id === 'liam' ? '1 overdue • 189 pts' : 
                         'All done! • 312 pts'}
                      </span>
                    )}
                  </div>
                  {child.id !== 'family' && (
                    <div className={`w-2 h-2 rounded-full ${
                      child.id === 'emma' ? 'bg-green-500' : 
                      child.id === 'liam' ? 'bg-orange-500' : 
                      'bg-green-500'
                    }`}></div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right - User Menu */}
        <div className="flex items-center space-x-2">
          {/* Mobile Child Switcher */}
          <div className="md:hidden relative">
            <button
              onClick={() => setIsChildMenuOpen(!isChildMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                children.find(c => c.id === activeChild)?.color.includes('gradient') 
                  ? `bg-gradient-to-r ${children.find(c => c.id === activeChild)?.color}` 
                  : children.find(c => c.id === activeChild)?.color
              }`}>
                <span className="text-white text-sm font-bold">
                  {children.find(c => c.id === activeChild)?.emoji}
                </span>
              </div>
            </button>

            {isChildMenuOpen && (
              <div className="absolute top-full mt-2 right-0 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 py-2 z-[9999]">
                {children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => {
                      onChildChange(child.id);
                      setIsChildMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full px-4 py-3 text-left hover:bg-white/10 transition-colors ${
                      activeChild === child.id ? 'bg-primary/10 border-l-2 border-primary' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      child.color.includes('gradient') 
                        ? `bg-gradient-to-r ${child.color}` 
                        : child.color
                    }`}>
                      <span className="text-white text-sm font-bold">{child.emoji}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-dark font-medium block">{child.name}</span>
                      {child.id !== 'family' && (
                        <span className="text-dark/60 text-xs">
                          {child.id === 'emma' ? '3 pending • 245 pts' : 
                           child.id === 'liam' ? '1 overdue • 189 pts' : 
                           'All done! • 312 pts'}
                        </span>
                      )}
                    </div>
                    {child.id !== 'family' && (
                      <div className={`w-2 h-2 rounded-full ${
                        child.id === 'emma' ? 'bg-green-500' : 
                        child.id === 'liam' ? 'bg-orange-500' : 
                        'bg-green-500'
                      }`}></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Menu */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="text-dark font-medium hidden sm:block">
                  {user.displayName}
                </span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 glassmorphism rounded-xl shadow-lg py-1 z-[60]">
                  <button className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-white/20 transition-colors">
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={signOut}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-white/20 transition-colors text-red-600"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};