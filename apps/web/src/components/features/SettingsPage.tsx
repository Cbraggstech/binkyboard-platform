import React, { useState } from 'react';
import { Settings, Bell, Shield, Palette, Users, CreditCard } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState({
    taskReminders: true,
    mealAlerts: true,
    eventNotifications: true,
    rewardAlerts: false
  });

  const [privacy, setPrivacy] = useState({
    shareData: false,
    publicProfile: false
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-dark dark:text-white">Settings</h1>
        <p className="text-dark/70 dark:text-gray-300">Customize your BinkyBoard experience</p>
      </div>

      {/* Account Settings */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
            <Users size={20} className="text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-dark dark:text-white">Account</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-1">Display Name</label>
            <input type="text" className="input-field" defaultValue="Sarah Johnson" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-1">Email</label>
            <input type="email" className="input-field" defaultValue="sarah@example.com" />
          </div>
          <button className="btn-primary">Update Profile</button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
            <Bell size={20} className="text-secondary" />
          </div>
          <h2 className="text-xl font-semibold text-dark dark:text-white">Notifications</h2>
        </div>
        
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-dark dark:text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </h3>
                <p className="text-sm text-dark/70 dark:text-gray-300">
                  {key === 'taskReminders' && 'Get notified about upcoming and overdue tasks'}
                  {key === 'mealAlerts' && 'Receive alerts for meal planning and grocery lists'}
                  {key === 'eventNotifications' && 'Stay updated on calendar events and appointments'}
                  {key === 'rewardAlerts' && 'Get notified when rewards are earned or redeemed'}
                </p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
            <Shield size={20} className="text-accent" />
          </div>
          <h2 className="text-xl font-semibold text-dark dark:text-white">Privacy</h2>
        </div>
        
        <div className="space-y-4">
          {Object.entries(privacy).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-dark dark:text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </h3>
                <p className="text-sm text-dark/70 dark:text-gray-300">
                  {key === 'shareData' && 'Allow anonymous data sharing to improve BinkyBoard'}
                  {key === 'publicProfile' && 'Make your family achievements visible to other users'}
                </p>
              </div>
              <button
                onClick={() => setPrivacy(prev => ({ ...prev, [key]: !value }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Settings */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-warning/20 rounded-xl flex items-center justify-center">
            <Palette size={20} className="text-warning" />
          </div>
          <h2 className="text-xl font-semibold text-dark dark:text-white">Appearance</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {['Light', 'Dark', 'Auto'].map((theme) => (
                <button
                  key={theme}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    theme === 'Light' ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary/50'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <CreditCard size={20} className="text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-dark dark:text-white">Subscription</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div>
              <h3 className="font-semibold text-dark dark:text-white">Premium Plan</h3>
              <p className="text-sm text-dark/70 dark:text-gray-300">Unlimited children, AI features, and more</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-dark dark:text-white">$9.99/month</p>
              <p className="text-xs text-green-600">Active</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Manage Subscription
            </button>
            <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card border-red-200">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h2>
        <div className="space-y-3">
          <button className="w-full p-3 text-left rounded-lg border border-red-200 hover:bg-red-50 transition-colors">
            <h3 className="font-medium text-red-600">Export Data</h3>
            <p className="text-sm text-red-500">Download all your family data</p>
          </button>
          <button className="w-full p-3 text-left rounded-lg border border-red-200 hover:bg-red-50 transition-colors">
            <h3 className="font-medium text-red-600">Delete Account</h3>
            <p className="text-sm text-red-500">Permanently delete your account and all data</p>
          </button>
        </div>
      </div>
    </div>
  );
};