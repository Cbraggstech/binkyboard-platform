import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { DashboardHome } from '../components/features/DashboardHome';
import { TasksPage } from '../components/features/TasksPage';
import { CalendarPage } from '../components/features/CalendarPage';
import { MealsPage } from '../components/features/MealsPage';
import { MoodsPage } from '../components/features/MoodsPage';
import { JournalPage } from '../components/features/JournalPage';
import { RewardsPage } from '../components/features/RewardsPage';
import { ChildrenPage } from '../components/features/ChildrenPage';
import { AnalyticsPage } from '../components/features/AnalyticsPage';
import { SettingsPage } from '../components/features/SettingsPage';
import { DailyRoutines } from '../components/features/DailyRoutines';

// Enhanced Components
import { EnhancedChildrenPage } from '../components/features/EnhancedChildrenPage';
import { SmartCalendar } from '../components/features/SmartCalendar';
import { AdvancedMealPlanner } from '../components/features/AdvancedMealPlanner';
import { EnhancedChoreRewardSystem } from '../components/features/EnhancedChoreRewardSystem';
import { HealthWellnessTracker } from '../components/features/HealthWellnessTracker';
import { EducationSchoolOrganizer } from '../components/features/EducationSchoolOrganizer';

export const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'tasks':
        return <EnhancedChoreRewardSystem />;
      case 'calendar':
        return <SmartCalendar />;
      case 'meals':
        return <AdvancedMealPlanner />;
      case 'moods':
        return <MoodsPage />;
      case 'journal':
        return <JournalPage />;
      case 'rewards':
        return <RewardsPage />;
      case 'children':
        return <EnhancedChildrenPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'routines':
        return <DailyRoutines />;
      case 'health':
        return <HealthWellnessTracker />;
      case 'school':
        return <EducationSchoolOrganizer />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="flex-1 lg:ml-64">
        <Header
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          isMenuOpen={isSidebarOpen}
        />
        
        <main className="p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};