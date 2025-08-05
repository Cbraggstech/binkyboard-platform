import React, { useState } from 'react';
import { Users, Plus, Edit, Trophy, Calendar, Heart, Camera, Phone, Shield, GraduationCap, Activity } from 'lucide-react';
import { Child } from '../../types';

export const EnhancedChildrenPage: React.FC = () => {
  const [children] = useState<Child[]>([
    {
      id: '1',
      name: 'Emma',
      age: 8,
      gender: 'female',
      dateOfBirth: new Date('2015-03-15'),
      avatar: null,
      preferences: ['reading', 'art', 'dancing'],
      allergies: ['peanuts'],
      dietaryRestrictions: ['vegetarian'],
      colorTag: '#FF8C94',
      developmentalStage: 'kid',
      parentId: 'parent1',
      emergencyContacts: [
        { id: '1', name: 'Grandma Sarah', relationship: 'Grandmother', phone: '555-0123', email: 'sarah@email.com' }
      ],
      medicalInfo: {
        bloodType: 'A+',
        medications: [],
        allergies: ['peanuts'],
        conditions: [],
        doctorInfo: {
          name: 'Dr. Smith',
          phone: '555-0456',
          clinic: 'Children\'s Health Center'
        },
        insuranceInfo: {
          provider: 'HealthCare Plus',
          policyNumber: 'HC123456'
        }
      },
      schoolInfo: {
        schoolName: 'Sunny Elementary',
        grade: '3rd Grade',
        teacher: 'Mrs. Johnson',
        teacherEmail: 'johnson@sunnyelem.edu',
        classSchedule: [
          { id: '1', subject: 'Math', teacher: 'Mrs. Johnson', startTime: '09:00', endTime: '10:00', days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], room: 'Room 12' }
        ],
        schoolYear: '2024-2025'
      },
      totalPoints: 245,
      tasksCompleted: 12,
      recentMood: '😊',
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'Liam',
      age: 6,
      gender: 'male',
      dateOfBirth: new Date('2017-07-22'),
      avatar: null,
      preferences: ['soccer', 'legos', 'minecraft'],
      allergies: [],
      dietaryRestrictions: [],
      colorTag: '#5AA9E6',
      developmentalStage: 'kid',
      parentId: 'parent1',
      emergencyContacts: [
        { id: '2', name: 'Uncle Mike', relationship: 'Uncle', phone: '555-0789' }
      ],
      medicalInfo: {
        bloodType: 'O+',
        medications: [],
        allergies: [],
        conditions: [],
        doctorInfo: {
          name: 'Dr. Wilson',
          phone: '555-0321',
          clinic: 'Kids Care Clinic'
        },
        insuranceInfo: {
          provider: 'HealthCare Plus',
          policyNumber: 'HC123456'
        }
      },
      schoolInfo: {
        schoolName: 'Sunny Elementary',
        grade: '1st Grade',
        teacher: 'Ms. Davis',
        teacherEmail: 'davis@sunnyelem.edu',
        classSchedule: [],
        schoolYear: '2024-2025'
      },
      totalPoints: 189,
      tasksCompleted: 8,
      recentMood: '😐',
      createdAt: new Date()
    }
  ]);

  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'medical' | 'school' | 'emergency'>('profile');

  const getDevelopmentalStageColor = (stage: Child['developmentalStage']) => {
    switch (stage) {
      case 'baby': return 'bg-pink-100 text-pink-600';
      case 'toddler': return 'bg-orange-100 text-orange-600';
      case 'kid': return 'bg-blue-100 text-blue-600';
      case 'teen': return 'bg-purple-100 text-purple-600';
    }
  };

  const getDevelopmentalStageIcon = (stage: Child['developmentalStage']) => {
    switch (stage) {
      case 'baby': return '👶';
      case 'toddler': return '🧒';
      case 'kid': return '👦';
      case 'teen': return '🧑‍🎓';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark">Children Profiles</h1>
          <p className="text-dark/70">Comprehensive profiles for all your children</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Child</span>
        </button>
      </div>

      {/* Quick View Cards */}\n      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children.map((child) => (
          <div key={child.id} className="card cursor-pointer hover:shadow-lg transition-all" onClick={() => setSelectedChild(child)}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: child.colorTag }}
                >
                  {child.avatar ? (
                    <img src={child.avatar} alt={child.name} className="w-16 h-16 rounded-full object-cover" />
                  ) : (
                    child.name[0]
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-semibold text-dark">{child.name}</h2>
                    <span className="text-lg">{child.gender === 'male' ? '♂️' : child.gender === 'female' ? '♀️' : '⚧'}</span>
                  </div>
                  <p className="text-dark/70">{child.age} years old</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getDevelopmentalStageColor(child.developmentalStage)}`}>
                      {getDevelopmentalStageIcon(child.developmentalStage)} {child.developmentalStage}
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <Edit size={16} className="text-dark/60" />
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-3 bg-white/20 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Trophy size={16} className="text-warning" />
                </div>
                <p className="font-semibold text-dark">{child.totalPoints}</p>
                <p className="text-xs text-dark/60">Points</p>
              </div>
              <div className="text-center p-3 bg-white/20 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Calendar size={16} className="text-primary" />
                </div>
                <p className="font-semibold text-dark">{child.tasksCompleted}</p>
                <p className="text-xs text-dark/60">Tasks</p>
              </div>
              <div className="text-center p-3 bg-white/20 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Heart size={16} className="text-secondary" />
                </div>
                <p className="font-semibold text-dark text-lg">{child.recentMood}</p>
                <p className="text-xs text-dark/60">Mood</p>
              </div>
            </div>

            {/* Quick Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <GraduationCap size={14} className="text-dark/60" />
                <span className="text-sm text-dark/70">{child.schoolInfo?.schoolName} - {child.schoolInfo?.grade}</span>
              </div>
              {child.allergies.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Shield size={14} className="text-red-500" />
                  <span className="text-sm text-red-600">Allergies: {child.allergies.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedChild && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glassmorphism rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl"
                    style={{ backgroundColor: selectedChild.colorTag }}
                  >
                    {selectedChild.avatar ? (
                      <img src={selectedChild.avatar} alt={selectedChild.name} className="w-20 h-20 rounded-full object-cover" />
                    ) : (
                      selectedChild.name[0]
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-dark">{selectedChild.name}</h2>
                    <p className="text-dark/70">{selectedChild.age} years old • {selectedChild.developmentalStage}</p>
                    <p className="text-dark/60 text-sm">Born: {selectedChild.dateOfBirth.toDateString()}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedChild(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Tabs */}
              <div className="flex space-x-4 mt-4">
                {[
                  { id: 'profile', label: 'Profile', icon: Users },
                  { id: 'medical', label: 'Medical', icon: Activity },
                  { id: 'school', label: 'School', icon: GraduationCap },
                  { id: 'emergency', label: 'Emergency', icon: Phone },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary/20 text-primary'
                          : 'hover:bg-white/20 text-dark/70'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-dark mb-3">Basic Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1">Full Name</label>
                        <input type="text" className="input-field" defaultValue={selectedChild.name} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1">Date of Birth</label>
                        <input type="date" className="input-field" defaultValue={selectedChild.dateOfBirth.toISOString().split('T')[0]} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1">Gender</label>
                        <select className="input-field" defaultValue={selectedChild.gender}>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="not-specified">Prefer not to say</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1">Color Tag</label>
                        <input type="color" className="input-field" defaultValue={selectedChild.colorTag} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-dark mb-3">Preferences & Interests</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedChild.preferences.map((pref, i) => (
                        <span key={i} className="px-3 py-1 bg-accent/20 text-accent rounded-lg text-sm">
                          {pref} ✕
                        </span>
                      ))}
                    </div>
                    <input type="text" className="input-field" placeholder="Add new interest..." />
                  </div>

                  <div>
                    <h3 className="font-semibold text-dark mb-3">Dietary Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1">Allergies</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {selectedChild.allergies.map((allergy, i) => (
                            <span key={i} className="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-xs">
                              {allergy} ✕
                            </span>
                          ))}
                        </div>
                        <input type="text" className="input-field" placeholder="Add allergy..." />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1">Dietary Restrictions</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {selectedChild.dietaryRestrictions.map((restriction, i) => (
                            <span key={i} className="px-2 py-1 bg-orange-100 text-orange-600 rounded-lg text-xs">
                              {restriction} ✕
                            </span>
                          ))}
                        </div>
                        <input type="text" className="input-field" placeholder="Add restriction..." />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'medical' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-dark mb-3">Medical Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1">Blood Type</label>
                        <input type="text" className="input-field" defaultValue={selectedChild.medicalInfo.bloodType} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-dark mb-3">Doctor Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1">Doctor Name</label>
                        <input type="text" className="input-field" defaultValue={selectedChild.medicalInfo.doctorInfo.name} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1">Phone</label>
                        <input type="tel" className="input-field" defaultValue={selectedChild.medicalInfo.doctorInfo.phone} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1">Clinic/Hospital</label>
                        <input type="text" className="input-field" defaultValue={selectedChild.medicalInfo.doctorInfo.clinic} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-dark mb-3">Insurance Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1">Provider</label>
                        <input type="text" className="input-field" defaultValue={selectedChild.medicalInfo.insuranceInfo.provider} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1">Policy Number</label>
                        <input type="text" className="input-field" defaultValue={selectedChild.medicalInfo.insuranceInfo.policyNumber} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'school' && selectedChild.schoolInfo && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-dark mb-3">School Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1">School Name</label>
                        <input type="text" className="input-field" defaultValue={selectedChild.schoolInfo.schoolName} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1">Grade</label>
                        <input type="text" className="input-field" defaultValue={selectedChild.schoolInfo.grade} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1">Teacher</label>
                        <input type="text" className="input-field" defaultValue={selectedChild.schoolInfo.teacher} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1">Teacher Email</label>
                        <input type="email" className="input-field" defaultValue={selectedChild.schoolInfo.teacherEmail} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'emergency' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-dark">Emergency Contacts</h3>
                      <button className="btn-secondary text-sm">Add Contact</button>
                    </div>
                    <div className="space-y-3">
                      {selectedChild.emergencyContacts.map((contact) => (
                        <div key={contact.id} className="p-4 bg-white/20 rounded-lg">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-dark mb-1">Name</label>
                              <input type="text" className="input-field" defaultValue={contact.name} />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-dark mb-1">Relationship</label>
                              <input type="text" className="input-field" defaultValue={contact.relationship} />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-dark mb-1">Phone</label>
                              <input type="tel" className="input-field" defaultValue={contact.phone} />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-dark mb-1">Email</label>
                              <input type="email" className="input-field" defaultValue={contact.email} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/20 flex justify-end space-x-3">
              <button onClick={() => setSelectedChild(null)} className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button className="btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};