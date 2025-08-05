export interface User {
  id: string;
  email: string;
  displayName: string;
  subscription: 'free' | 'premium';
  createdAt: Date;
}

export interface Child {
  id: string;
  name: string;
  avatar?: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'not-specified';
  dateOfBirth: Date;
  preferences: string[];
  allergies: string[];
  dietaryRestrictions: string[];
  colorTag: string;
  developmentalStage: 'baby' | 'toddler' | 'kid' | 'teen';
  parentId: string;
  emergencyContacts: EmergencyContact[];
  medicalInfo: MedicalInfo;
  schoolInfo?: SchoolInfo;
  createdAt: Date;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface MedicalInfo {
  bloodType?: string;
  medications: Medication[];
  allergies: string[];
  conditions: string[];
  doctorInfo: {
    name?: string;
    phone?: string;
    clinic?: string;
  };
  insuranceInfo: {
    provider?: string;
    policyNumber?: string;
  };
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  reminders: boolean;
  notes?: string;
}

export interface SchoolInfo {
  schoolName: string;
  grade: string;
  teacher: string;
  teacherEmail?: string;
  classSchedule: ClassPeriod[];
  schoolYear: string;
}

export interface ClassPeriod {
  id: string;
  subject: string;
  teacher: string;
  startTime: string;
  endTime: string;
  days: string[];
  room?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  childId: string;
  points: number;
  completed: boolean;
  completedAt?: Date;
  recurring?: 'daily' | 'weekly' | 'monthly';
  frequency: {
    type: 'once' | 'daily' | 'weekly' | 'monthly';
    days?: string[]; // for weekly: ['monday', 'wednesday']
    interval?: number; // every X days/weeks/months
  };
  category: 'chore' | 'homework' | 'personal' | 'family';
  dueDate?: Date;
  approvalRequired: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  parentId: string;
  createdAt: Date;
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  date: Date;
  ingredients: Ingredient[];
  childId?: string;
  allergyFriendly: boolean;
  preferences: string[];
  ageGroup: 'baby' | 'toddler' | 'kid' | 'teen' | 'all';
  nutritionInfo: NutritionInfo;
  recipeUrl?: string;
  cookingTime?: number;
  servings: number;
  parentId: string;
  createdAt: Date;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  category: 'protein' | 'vegetable' | 'fruit' | 'grain' | 'dairy' | 'other';
  allergens: string[];
}

export interface NutritionInfo {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
}

export interface GroceryList {
  id: string;
  name: string;
  items: GroceryItem[];
  parentId: string;
  completed: boolean;
  createdAt: Date;
}

export interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  purchased: boolean;
  mealIds: string[]; // which meals this ingredient is for
}

export interface Mood {
  id: string;
  childId: string;
  emoji: string;
  notes?: string;
  date: Date;
  energy: 1 | 2 | 3 | 4 | 5;
  createdAt: Date;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  childId?: string;
  photos: string[];
  milestone: boolean;
  tags: string[];
  date: Date;
  createdAt: Date;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  childId: string;
  redeemed: boolean;
  redeemedAt?: Date;
  createdAt: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  allDay: boolean;
  duration?: number; // in minutes
  childId?: string;
  type: 'appointment' | 'activity' | 'reminder' | 'milestone' | 'school' | 'medical' | 'time-block';
  category: string;
  location?: string;
  recurring: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: Date;
    days?: string[]; // for weekly recurring
  };
  reminders: {
    enabled: boolean;
    times: number[]; // minutes before event [15, 60, 1440]
  };
  attendees: string[]; // child IDs or parent IDs
  color: string;
  externalCalendarId?: string; // for sync with Google/Apple/Outlook
  parentId: string;
  createdAt: Date;
}

// Health & Wellness Types
export interface HealthRecord {
  id: string;
  childId: string;
  type: 'vaccination' | 'appointment' | 'symptom' | 'growth' | 'medication' | 'milestone';
  date: Date;
  data: any; // flexible data structure based on type
  notes?: string;
  attachments: string[]; // file URLs
  providerId?: string;
  parentId: string;
  createdAt: Date;
}

export interface Vaccination {
  id: string;
  childId: string;
  vaccine: string;
  dateGiven: Date;
  dueDate?: Date;
  provider: string;
  batchNumber?: string;
  nextDueDate?: Date;
  completed: boolean;
  notes?: string;
  parentId: string;
}

export interface GrowthRecord {
  id: string;
  childId: string;
  date: Date;
  height: number; // in cm
  weight: number; // in kg
  headCircumference?: number; // for babies
  percentiles: {
    height?: number;
    weight?: number;
    headCircumference?: number;
  };
  notes?: string;
  parentId: string;
}

export interface Appointment {
  id: string;
  childId: string;
  type: 'medical' | 'dental' | 'therapy' | 'school' | 'other';
  title: string;
  provider: string;
  date: Date;
  duration: number;
  location: string;
  phone?: string;
  notes?: string;
  reminders: boolean;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  parentId: string;
  createdAt: Date;
}

// Education & School Types
export interface Assignment {
  id: string;
  childId: string;
  subject: string;
  title: string;
  description?: string;
  dueDate: Date;
  status: 'assigned' | 'in-progress' | 'completed' | 'submitted' | 'graded';
  priority: 'low' | 'medium' | 'high';
  grade?: string;
  attachments: string[];
  parentId: string;
  createdAt: Date;
}

export interface SchoolContact {
  id: string;
  childId: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  subject?: string;
  notes?: string;
  parentId: string;
}

export interface SchoolDocument {
  id: string;
  childId: string;
  title: string;
  type: 'report-card' | 'iep' | '504-plan' | 'permission-slip' | 'other';
  url: string;
  uploadDate: Date;
  schoolYear: string;
  parentId: string;
}

export interface DashboardWidget {
  id: string;
  type: 'tasks' | 'meals' | 'events' | 'rewards' | 'mood' | 'ai-suggestions';
  position: { x: number; y: number };
  size: { width: number; height: number };
  visible: boolean;
}

export interface Settings {
  userId: string;
  notifications: {
    taskReminders: boolean;
    mealAlerts: boolean;
    eventNotifications: boolean;
    rewardAlerts: boolean;
  };
  privacy: {
    shareData: boolean;
    publicProfile: boolean;
  };
  theme: 'light' | 'dark' | 'auto';
  dashboardLayout: DashboardWidget[];
}