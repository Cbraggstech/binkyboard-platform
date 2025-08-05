import React, { useState } from 'react';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen }) => {
  const { user, signOut } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
              <div className="absolute right-0 mt-2 w-48 glassmorphism rounded-xl shadow-lg py-1 z-50">
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
    </header>
  );
};