import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { AuthModal } from './components/ui/AuthModal';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glassmorphism dark:bg-slate-800/60 dark:border-slate-700/50 p-8 rounded-2xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-dark dark:text-slate-100 text-center mt-4">Loading BinkyBoard...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Dashboard />;
  }

  return (
    <>
      <LandingPage onGetStarted={() => setShowAuthModal(true)} />
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-light dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;