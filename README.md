# BinkyBoard Platform

A comprehensive family organizer application built with React, TypeScript, TailwindCSS, and Firebase. BinkyBoard helps families manage their daily lives with features for task management, scheduling, meal planning, mood tracking, journaling, and reward systems.

## 🌟 Features

### Core Functionality
- **Multi-child Support** - Manage profiles for unlimited children (Premium)
- **Task & Chore Management** - Create, assign, and track daily tasks with point rewards
- **Family Calendar** - Shared calendar with events, appointments, and reminders
- **Meal Planner** - Weekly meal planning with grocery list integration
- **Mood Tracker** - Emoji-based mood logging with trend visualization
- **Family Journal** - Capture memories with photos and milestone tracking
- **Reward System** - Point-based rewards with custom redemptions
- **Daily Routines** - Drag-and-drop routine builder for morning/bedtime
- **Analytics Dashboard** - Insights on task completion, mood trends, and family patterns

### Design & Experience
- **Glassmorphism UI** - Modern, translucent design with smooth animations
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Family-Friendly** - Rounded fonts, soft colors, and intuitive navigation
- **Real-time Sync** - Live updates across all family devices
- **Offline Support** - Works offline with automatic sync when reconnected

### Premium Features
- Unlimited children profiles
- AI-powered suggestions and insights
- Advanced analytics and reporting
- Multi-parent access and collaboration
- Priority support
- Photo storage and backup

## 🛠 Tech Stack

### Frontend
- **React 19** with TypeScript
- **TailwindCSS** for styling with glassmorphism effects
- **Framer Motion** for animations
- **Lucide React** for icons
- **Vite** for build tooling

### Backend & Infrastructure
- **Firebase Authentication** - Secure user management
- **Firestore** - Real-time NoSQL database
- **Firebase Storage** - Photo and file uploads
- **Firebase Hosting** - Fast, secure hosting
- **Firebase Functions** - Serverless backend logic

### Architecture
- **Turbo Monorepo** - Organized workspace for web, mobile, and admin apps
- **Component-based** - Modular, reusable React components
- **Type-safe** - Full TypeScript coverage
- **Real-time** - Live data synchronization across devices

## 📱 Project Structure

```
binkyboard-platform/
├── apps/
│   ├── web/                 # React web application
│   ├── admin/              # Admin dashboard (future)
│   ├── mobile-android/     # Android app (future)
│   └── mobile-ios/         # iOS app (future)
├── packages/
│   ├── shared/             # Shared utilities and types
│   └── ui/                 # Shared UI components
└── turbo.json              # Turbo configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Firebase account and project
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd binkyboard-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   ```bash
   cd apps/web
   cp .env.example .env
   ```
   
   Update `.env` with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
   ```

4. **Set up Firebase**
   ```bash
   # Install Firebase CLI
   npm install -g firebase-tools
   
   # Login to Firebase
   firebase login
   
   # Initialize project
   firebase init
   ```

5. **Deploy Firestore rules**
   ```bash
   firebase deploy --only firestore:rules
   firebase deploy --only storage
   ```

### Development

```bash
# Start development server
npm run dev

# Run in specific workspace
cd apps/web
npm run dev
```

### Building for Production

```bash
# Build all applications
npm run build

# Build web app only
cd apps/web
npm run build
```

### Deployment

```bash
# Deploy to Firebase Hosting
firebase deploy --only hosting

# Deploy everything (hosting, firestore, storage)
firebase deploy
```

## 🔒 Security & Privacy

- **Data Protection** - All family data is encrypted and secure
- **Privacy First** - No data sharing with third parties
- **Firestore Security Rules** - Comprehensive access control
- **Authentication** - Secure Firebase Auth integration
- **File Upload Security** - Size limits and type restrictions

## 📊 Database Schema

### Collections

- `users`: User profiles and subscription info
- `children`: Child profiles linked to parents
- `tasks`: Task assignments and completion tracking
- `meals`: Meal plans and ingredients
- `moods`: Daily mood entries
- `journals`: Family memories and photos
- `rewards`: Point system and redemptions
- `events`: Calendar events and appointments
- `settings`: User preferences and configurations

## 🎨 Design System

### Colors
- **Primary Blue**: `#5AA9E6`
- **Secondary Coral**: `#FF8C94`
- **Mint Accent**: `#A4EDDA`
- **Soft Yellow**: `#FFEC99`
- **Charcoal**: `#333333`
- **Off-White**: `#FDFDFD`

### Typography
- **Primary**: Inter, Nunito, Poppins
- **Fallback**: system-ui, sans-serif

### Effects
- **Glassmorphism**: Translucent backgrounds with backdrop blur
- **Smooth Animations**: Framer Motion transitions
- **Rounded Corners**: Consistent border radius
- **Soft Shadows**: Layered shadow effects

## 🔮 Future Enhancements

- **Mobile Apps** - Native iOS and Android applications
- **AI Features** - Smart suggestions and automation
- **Family Sharing** - Multi-parent collaboration
- **Advanced Analytics** - Deeper insights and reporting
- **Integration APIs** - Connect with calendars, smart devices
- **Gamification** - Achievement badges and family challenges

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and development process.

## 📞 Support

For support and questions:
- Email: support@binkyboard.com
- Documentation: [docs.binkyboard.com](https://docs.binkyboard.com)
- Issues: [GitHub Issues](https://github.com/binkyboard/platform/issues)

---

Made with ❤️ for families everywhere