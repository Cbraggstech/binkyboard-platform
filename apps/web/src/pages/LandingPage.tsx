import React from 'react';
import {
  CheckCircle,
  Calendar,
  Users,
  Heart,
  Trophy,
  Shield,
  Star,
  ArrowRight,
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Calendar,
      title: 'Family Calendar',
      description: 'Keep everyone organized with shared calendars and smart reminders.',
    },
    {
      icon: CheckCircle,
      title: 'Task Management',
      description: 'Assign chores, track completion, and reward good behavior.',
    },
    {
      icon: Heart,
      title: 'Mood Tracking',
      description: 'Monitor emotional wellbeing with fun, emoji-based mood logs.',
    },
    {
      icon: Trophy,
      title: 'Reward System',
      description: 'Motivate kids with points, achievements, and custom rewards.',
    },
    {
      icon: Users,
      title: 'Multi-Child Support',
      description: 'Manage multiple children with personalized profiles and settings.',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your family data is secure and never shared with third parties.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Mother of 3',
      content: 'BinkyBoard transformed our chaotic mornings into smooth routines!',
      rating: 5,
    },
    {
      name: 'David K.',
      role: 'Father of 2',
      content: 'The reward system is genius. My kids actually ask to do chores now!',
      rating: 5,
    },
    {
      name: 'Lisa R.',
      role: 'Single Mom',
      content: 'Finally, an app that understands the complexity of family life.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glassmorphism sticky top-0 z-50 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">B</span>
            </div>
            <span className="text-2xl font-bold text-dark">BinkyBoard</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-dark hover:text-primary transition-colors font-medium">
              Features
            </button>
            <button className="text-dark hover:text-primary transition-colors font-medium">
              Pricing
            </button>
            <button
              onClick={onGetStarted}
              className="btn-primary"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-dark mb-6">
            Organize Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Family Life
            </span>
          </h1>
          <p className="text-xl text-dark/70 mb-8 max-w-3xl mx-auto">
            The all-in-one family organizer that helps you manage tasks, schedules, meals, and
            memories while keeping everyone happy and motivated.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button onClick={onGetStarted} className="btn-primary text-lg px-8 py-4">
              Start Free Trial <ArrowRight className="ml-2" size={20} />
            </button>
            <button className="text-dark hover:text-primary transition-colors font-medium">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark mb-4">Everything You Need</h2>
            <p className="text-xl text-dark/70">
              Powerful features designed for modern families
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark mb-2">{feature.title}</h3>
                  <p className="text-dark/70">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark mb-4">Simple Pricing</h2>
            <p className="text-xl text-dark/70">
              Start free, upgrade when you're ready
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Free Tier */}
            <div className="card">
              <h3 className="text-2xl font-bold text-dark mb-2">Free</h3>
              <div className="text-4xl font-bold text-primary mb-4">
                $0<span className="text-lg text-dark/60">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-primary" />
                  <span>1 child profile</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-primary" />
                  <span>Basic task management</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-primary" />
                  <span>Simple calendar view</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-primary" />
                  <span>Basic journal entries</span>
                </li>
              </ul>
              <button onClick={onGetStarted} className="w-full btn-secondary">
                Get Started Free
              </button>
            </div>

            {/* Premium Tier */}
            <div className="card border-2 border-primary relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-2">Premium</h3>
              <div className="text-4xl font-bold text-primary mb-4">
                $9.99<span className="text-lg text-dark/60">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-primary" />
                  <span>Unlimited children</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-primary" />
                  <span>AI-powered suggestions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-primary" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-primary" />
                  <span>Multi-parent access</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-primary" />
                  <span>Photo uploads & backup</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-primary" />
                  <span>Priority support</span>
                </li>
              </ul>
              <button onClick={onGetStarted} className="w-full btn-primary">
                Start Premium Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20 bg-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark mb-4">Loved by Families</h2>
            <p className="text-xl text-dark/70">
              See what parents are saying about BinkyBoard
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-warning fill-current" />
                  ))}
                </div>
                <p className="text-dark mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-dark">{testimonial.name}</div>
                  <div className="text-dark/60 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 border-t border-white/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-bold text-dark">BinkyBoard</span>
          </div>
          <p className="text-dark/60 mb-4">
            Making family life easier, one day at a time.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-dark/60">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
          </div>
          <div className="mt-8 text-sm text-dark/40">
            © 2024 BinkyBoard. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};