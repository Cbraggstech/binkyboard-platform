import React, { useState } from 'react';
import { Activity, Plus, Calendar, Pill, TrendingUp, FileText, Phone, Shield, Heart, Ruler, Weight } from 'lucide-react';
import { HealthRecord, Vaccination, GrowthRecord, Appointment, Medication, Child } from '../../types';

export const HealthWellnessTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'vaccines' | 'growth' | 'appointments' | 'medications' | 'symptoms'>('overview');
  const [selectedChild, setSelectedChild] = useState<string>('1');

  // Sample children data
  const children: Child[] = [
    {
      id: '1',
      name: 'Emma',
      age: 8,
      dateOfBirth: new Date('2015-03-15'),
      colorTag: '#FF8C94',
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
      }
    } as Child,
    {
      id: '2',
      name: 'Liam',
      age: 6,
      dateOfBirth: new Date('2017-07-22'),
      colorTag: '#5AA9E6',
      medicalInfo: {
        bloodType: 'O+',
        medications: [],
        allergies: [],
        conditions: ['Mild asthma'],
        doctorInfo: {
          name: 'Dr. Wilson',
          phone: '555-0321',
          clinic: 'Kids Care Clinic'
        },
        insuranceInfo: {
          provider: 'HealthCare Plus',
          policyNumber: 'HC123456'
        }
      }
    } as Child
  ];

  // Sample vaccinations data
  const [vaccinations] = useState<Vaccination[]>([
    {
      id: '1',
      childId: '1',
      vaccine: 'MMR (Measles, Mumps, Rubella)',
      dateGiven: new Date('2023-03-15'),
      dueDate: new Date('2023-03-15'),
      provider: 'Dr. Smith',
      batchNumber: 'MMR2023A',
      nextDueDate: new Date('2028-03-15'),
      completed: true,
      notes: 'No adverse reactions',
      parentId: 'parent1'
    },
    {
      id: '2',
      childId: '1',
      vaccine: 'Tdap (Tetanus, Diphtheria, Pertussis)',
      dateGiven: new Date('2023-08-20'),
      dueDate: new Date('2023-08-20'),
      provider: 'Dr. Smith',
      completed: true,
      parentId: 'parent1'
    },
    {
      id: '3',
      childId: '2',
      vaccine: 'MMR (Measles, Mumps, Rubella)',
      dateGiven: new Date('2023-07-22'),
      dueDate: new Date('2023-07-22'),
      provider: 'Dr. Wilson',
      completed: true,
      parentId: 'parent1'
    },
    {
      id: '4',
      childId: '2',
      vaccine: 'Annual Flu Shot',
      dueDate: new Date('2024-09-01'),
      provider: 'Dr. Wilson',
      completed: false,
      notes: 'Schedule for early fall',
      parentId: 'parent1'
    }
  ]);

  // Sample growth records
  const [growthRecords] = useState<GrowthRecord[]>([
    {
      id: '1',
      childId: '1',
      date: new Date('2024-03-15'),
      height: 127, // cm
      weight: 25.5, // kg
      percentiles: {
        height: 75,
        weight: 60
      },
      notes: 'Steady growth, healthy development',
      parentId: 'parent1'
    },
    {
      id: '2',
      childId: '1',
      date: new Date('2023-09-15'),
      height: 122,
      weight: 23.8,
      percentiles: {
        height: 70,
        weight: 55
      },
      parentId: 'parent1'
    },
    {
      id: '3',
      childId: '2',
      date: new Date('2024-07-22'),
      height: 115,
      weight: 21.2,
      percentiles: {
        height: 65,
        weight: 50
      },
      notes: 'Normal growth pattern',
      parentId: 'parent1'
    }
  ]);

  // Sample appointments
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      childId: '1',
      type: 'medical',
      title: 'Annual Physical Exam',
      provider: 'Dr. Smith',
      date: new Date('2024-08-15T10:00:00'),
      duration: 60,
      location: 'Children\'s Health Center',
      phone: '555-0456',
      notes: 'Bring vaccination records',
      reminders: true,
      status: 'scheduled',
      parentId: 'parent1',
      createdAt: new Date()
    },
    {
      id: '2',
      childId: '2',
      type: 'dental',
      title: 'Dental Cleaning',
      provider: 'Dr. Thompson',
      date: new Date('2024-08-10T14:00:00'),
      duration: 45,
      location: 'Smile Dental Clinic',
      phone: '555-0789',
      reminders: true,
      status: 'scheduled',
      parentId: 'parent1',
      createdAt: new Date()
    },
    {
      id: '3',
      childId: '2',
      type: 'therapy',
      title: 'Speech Therapy Session',
      provider: 'Sarah Miller, SLP',
      date: new Date('2024-08-08T16:00:00'),
      duration: 30,
      location: 'Community Therapy Center',
      phone: '555-0654',
      status: 'completed',
      parentId: 'parent1',
      createdAt: new Date()
    }
  ]);

  // Sample medications
  const medications: Medication[] = [
    {
      id: '1',
      name: 'Albuterol Inhaler',
      dosage: '2 puffs',
      frequency: 'As needed',
      startDate: new Date('2024-01-15'),
      reminders: true,
      notes: 'For asthma symptoms - keep with child at school'
    },
    {
      id: '2',
      name: 'Children\'s Multivitamin',
      dosage: '1 tablet',
      frequency: 'Daily with breakfast',
      startDate: new Date('2024-01-01'),
      reminders: true,
      notes: 'Chewable vitamin'
    }
  ];

  const selectedChildData = children.find(c => c.id === selectedChild);
  const childVaccinations = vaccinations.filter(v => v.childId === selectedChild);
  const childGrowthRecords = growthRecords.filter(g => g.childId === selectedChild).sort((a, b) => b.date.getTime() - a.date.getTime());
  const childAppointments = appointments.filter(a => a.childId === selectedChild);
  const upcomingAppointments = childAppointments.filter(a => a.date > new Date() && a.status === 'scheduled');
  const overduVaccinations = childVaccinations.filter(v => !v.completed && v.dueDate && v.dueDate < new Date());

  const getVaccineStatusColor = (vaccination: Vaccination) => {
    if (vaccination.completed) return 'text-green-600 bg-green-100';
    if (vaccination.dueDate && vaccination.dueDate < new Date()) return 'text-red-600 bg-red-100';
    if (vaccination.dueDate && vaccination.dueDate <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)) return 'text-orange-600 bg-orange-100';
    return 'text-blue-600 bg-blue-100';
  };

  const getAppointmentStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'rescheduled': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark">Health & Wellness Tracker</h1>
          <p className="text-dark/70">Comprehensive health management for your family</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 glassmorphism rounded-xl hover:bg-white/30 transition-colors">
            <FileText size={16} />
            <span>Export Records</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={20} />
            <span>Add Record</span>
          </button>
        </div>
      </div>

      {/* Child Selector */}
      <div className="flex items-center space-x-4">
        <span className="text-dark font-medium">Select Child:</span>
        <div className="flex space-x-2">
          {children.map(child => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(child.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors ${
                selectedChild === child.id
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'glassmorphism hover:bg-white/30'
              }`}
            >
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: child.colorTag }}
              />
              <span>{child.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Health Overview Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Shield size={20} className="text-green-600" />
            </div>
            <span className="text-2xl font-bold text-dark">{childVaccinations.filter(v => v.completed).length}</span>
          </div>
          <p className="text-dark/70 text-sm">Vaccinations Up to Date</p>
          {overduVaccinations.length > 0 && (
            <p className="text-red-600 text-xs mt-1">{overduVaccinations.length} overdue</p>
          )}
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar size={20} className="text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-dark">{upcomingAppointments.length}</span>
          </div>
          <p className="text-dark/70 text-sm">Upcoming Appointments</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} className="text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-dark">
              {childGrowthRecords.length > 0 ? childGrowthRecords[0].percentiles.height + '%' : 'N/A'}
            </span>
          </div>
          <p className="text-dark/70 text-sm">Height Percentile</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Pill size={20} className="text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-dark">{medications.length}</span>
          </div>
          <p className="text-dark/70 text-sm">Active Medications</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white/20 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'vaccines', label: 'Vaccinations', icon: Shield },
          { id: 'growth', label: 'Growth Chart', icon: TrendingUp },
          { id: 'appointments', label: 'Appointments', icon: Calendar },
          { id: 'medications', label: 'Medications', icon: Pill },
          { id: 'symptoms', label: 'Symptom Log', icon: FileText }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'hover:bg-white/20 text-dark/70'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {activeTab === 'overview' && selectedChildData && (
            <div className="space-y-6">
              {/* Child Health Summary */}
              <div className="card">
                <div className="flex items-center space-x-4 mb-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: selectedChildData.colorTag }}
                  >
                    {selectedChildData.name[0]}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-dark">{selectedChildData.name}</h2>
                    <p className="text-dark/70">
                      {selectedChildData.age} years old • Born {selectedChildData.dateOfBirth.toDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-dark mb-3">Medical Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-dark/70">Blood Type:</span>
                        <span className="font-medium">{selectedChildData.medicalInfo.bloodType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark/70">Allergies:</span>
                        <span className="font-medium">
                          {selectedChildData.medicalInfo.allergies.length > 0 
                            ? selectedChildData.medicalInfo.allergies.join(', ')
                            : 'None known'
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark/70">Conditions:</span>
                        <span className="font-medium">
                          {selectedChildData.medicalInfo.conditions.length > 0 
                            ? selectedChildData.medicalInfo.conditions.join(', ')
                            : 'None reported'
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-dark mb-3">Healthcare Provider</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-dark/70">Doctor:</span>
                        <span className="font-medium">{selectedChildData.medicalInfo.doctorInfo.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark/70">Clinic:</span>
                        <span className="font-medium">{selectedChildData.medicalInfo.doctorInfo.clinic}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark/70">Phone:</span>
                        <span className="font-medium">{selectedChildData.medicalInfo.doctorInfo.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Growth Data */}
              {childGrowthRecords.length > 0 && (
                <div className="card">
                  <h3 className="font-semibold text-dark mb-4">Latest Growth Measurements</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white/20 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <Ruler size={20} className="text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-dark">{childGrowthRecords[0].height} cm</p>
                      <p className="text-dark/70 text-sm">Height</p>
                      <p className="text-blue-600 text-xs">{childGrowthRecords[0].percentiles.height}th percentile</p>
                    </div>
                    <div className="text-center p-4 bg-white/20 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <Weight size={20} className="text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-dark">{childGrowthRecords[0].weight} kg</p>
                      <p className="text-dark/70 text-sm">Weight</p>
                      <p className="text-green-600 text-xs">{childGrowthRecords[0].percentiles.weight}th percentile</p>
                    </div>
                    <div className="text-center p-4 bg-white/20 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <Calendar size={20} className="text-purple-600" />
                      </div>
                      <p className="text-lg font-bold text-dark">{childGrowthRecords[0].date.toLocaleDateString()}</p>
                      <p className="text-dark/70 text-sm">Last Measured</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Upcoming Health Events */}
              <div className="card">
                <h3 className="font-semibold text-dark mb-4">Upcoming Health Events</h3>
                <div className="space-y-3">
                  {upcomingAppointments.slice(0, 3).map(appointment => (
                    <div key={appointment.id} className="flex items-center space-x-4 p-3 bg-white/20 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Calendar size={20} className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-dark">{appointment.title}</p>
                        <p className="text-dark/70 text-sm">{appointment.provider} • {appointment.location}</p>
                        <p className="text-dark/60 text-xs">
                          {appointment.date.toLocaleDateString()} at {appointment.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                        <Phone size={14} />
                        <span className="text-sm">Call</span>
                      </button>
                    </div>
                  ))}
                  
                  {overduVaccinations.map(vaccination => (
                    <div key={vaccination.id} className="flex items-center space-x-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                        <Shield size={20} className="text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-dark">{vaccination.vaccine} - OVERDUE</p>
                        <p className="text-red-600 text-sm">Due: {vaccination.dueDate?.toLocaleDateString()}</p>
                      </div>
                      <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                        Schedule
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vaccines' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-dark">Vaccination Records</h2>
                <button className="btn-secondary flex items-center space-x-2">
                  <Plus size={16} />
                  <span>Add Vaccination</span>
                </button>
              </div>

              <div className="space-y-4">
                {childVaccinations.map(vaccination => (
                  <div key={vaccination.id} className="card">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Shield size={24} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-dark mb-1">{vaccination.vaccine}</h3>
                          <div className="space-y-1 text-sm text-dark/70">
                            <p>Provider: {vaccination.provider}</p>
                            {vaccination.dateGiven && (
                              <p>Given: {vaccination.dateGiven.toLocaleDateString()}</p>
                            )}
                            {vaccination.dueDate && (
                              <p>Due: {vaccination.dueDate.toLocaleDateString()}</p>
                            )}
                            {vaccination.nextDueDate && (
                              <p>Next Due: {vaccination.nextDueDate.toLocaleDateString()}</p>
                            )}
                            {vaccination.batchNumber && (
                              <p>Batch: {vaccination.batchNumber}</p>
                            )}
                            {vaccination.notes && (
                              <p className="italic">Notes: {vaccination.notes}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getVaccineStatusColor(vaccination)}`}>
                        {vaccination.completed ? 'Complete' : 
                         vaccination.dueDate && vaccination.dueDate < new Date() ? 'Overdue' :
                         vaccination.dueDate && vaccination.dueDate <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? 'Due Soon' :
                         'Scheduled'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'growth' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-dark">Growth Chart</h2>
                <button className="btn-secondary flex items-center space-x-2">
                  <Plus size={16} />
                  <span>Add Measurement</span>
                </button>
              </div>

              {/* Growth Chart Visualization */}
              <div className="card">
                <h3 className="font-semibold text-dark mb-4">Growth Trend</h3>
                <div className="h-64 bg-white/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-dark/60">
                    <TrendingUp size={48} className="mx-auto mb-2" />
                    <p>Growth chart visualization would go here</p>
                    <p className="text-sm">Showing height and weight progression over time</p>
                  </div>
                </div>
              </div>

              {/* Growth Records Table */}
              <div className="card">
                <h3 className="font-semibold text-dark mb-4">Measurement History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-3 text-dark/70">Date</th>
                        <th className="text-left py-3 text-dark/70">Height (cm)</th>
                        <th className="text-left py-3 text-dark/70">Weight (kg)</th>
                        <th className="text-left py-3 text-dark/70">Height %ile</th>
                        <th className="text-left py-3 text-dark/70">Weight %ile</th>
                        <th className="text-left py-3 text-dark/70">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {childGrowthRecords.map(record => (
                        <tr key={record.id} className="border-b border-white/10">
                          <td className="py-3 text-dark">{record.date.toLocaleDateString()}</td>
                          <td className="py-3 text-dark font-medium">{record.height}</td>
                          <td className="py-3 text-dark font-medium">{record.weight}</td>
                          <td className="py-3 text-blue-600 font-medium">{record.percentiles.height}%</td>
                          <td className="py-3 text-green-600 font-medium">{record.percentiles.weight}%</td>
                          <td className="py-3 text-dark/70 text-sm">{record.notes || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-dark">Appointments</h2>
                <button className="btn-secondary flex items-center space-x-2">
                  <Plus size={16} />
                  <span>Schedule Appointment</span>
                </button>
              </div>

              <div className="space-y-4">
                {childAppointments
                  .sort((a, b) => b.date.getTime() - a.date.getTime())
                  .map(appointment => (
                    <div key={appointment.id} className="card">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Calendar size={24} className="text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-dark mb-1">{appointment.title}</h3>
                            <div className="space-y-1 text-sm text-dark/70">
                              <p>{appointment.provider}</p>
                              <p>{appointment.location}</p>
                              <p>{appointment.date.toLocaleDateString()} at {appointment.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                              <p>{appointment.duration} minutes</p>
                              {appointment.notes && (
                                <p className="italic">Notes: {appointment.notes}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getAppointmentStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                          {appointment.phone && (
                            <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                              <Phone size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeTab === 'medications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-dark">Medications</h2>
                <button className="btn-secondary flex items-center space-x-2">
                  <Plus size={16} />
                  <span>Add Medication</span>
                </button>
              </div>

              <div className="space-y-4">
                {medications.map(medication => (
                  <div key={medication.id} className="card">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                          <Pill size={24} className="text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-dark mb-1">{medication.name}</h3>
                          <div className="space-y-1 text-sm text-dark/70">
                            <p>Dosage: {medication.dosage}</p>
                            <p>Frequency: {medication.frequency}</p>
                            <p>Started: {medication.startDate.toLocaleDateString()}</p>
                            {medication.endDate && (
                              <p>Ends: {medication.endDate.toLocaleDateString()}</p>
                            )}
                            {medication.notes && (
                              <p className="italic">Notes: {medication.notes}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {medication.reminders && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
                            Reminders On
                          </span>
                        )}
                        <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                          <FileText size={16} className="text-dark/60" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card">
            <h3 className="font-semibold text-dark mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full p-3 text-left bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-blue-600" />
                  <span className="text-sm text-dark">Schedule Checkup</span>
                </div>
              </button>
              <button className="w-full p-3 text-left bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                <div className="flex items-center space-x-2">
                  <Shield size={16} className="text-green-600" />
                  <span className="text-sm text-dark">Update Vaccinations</span>
                </div>
              </button>
              <button className="w-full p-3 text-left bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                <div className="flex items-center space-x-2">
                  <TrendingUp size={16} className="text-purple-600" />
                  <span className="text-sm text-dark">Log Growth</span>
                </div>
              </button>
              <button className="w-full p-3 text-left bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                <div className="flex items-center space-x-2">
                  <Heart size={16} className="text-red-500" />
                  <span className="text-sm text-dark">Report Symptoms</span>
                </div>
              </button>
            </div>
          </div>

          {/* Health Alerts */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Shield size={20} className="text-red-500" />
              <h3 className="font-semibold text-dark">Health Alerts</h3>
            </div>
            
            <div className="space-y-3">
              {overduVaccinations.length > 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 font-medium text-sm">Overdue Vaccinations</p>
                  <p className="text-red-500 text-xs">{overduVaccinations.length} vaccination(s) need attention</p>
                </div>
              )}
              
              {upcomingAppointments.filter(a => 
                a.date <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
              ).length > 0 && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-600 font-medium text-sm">Appointments This Week</p>
                  <p className="text-blue-500 text-xs">
                    {upcomingAppointments.filter(a => 
                      a.date <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    ).length} appointment(s) scheduled
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Phone size={20} className="text-primary" />
              <h3 className="font-semibold text-dark">Emergency Contacts</h3>
            </div>
            
            <div className="space-y-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <p className="font-medium text-dark text-sm">Pediatrician</p>
                <p className="text-dark/70 text-xs">Dr. Smith - 555-0456</p>
              </div>
              <div className="p-2 bg-white/20 rounded-lg">
                <p className="font-medium text-dark text-sm">Poison Control</p>
                <p className="text-dark/70 text-xs">1-800-222-1222</p>
              </div>
              <div className="p-2 bg-white/20 rounded-lg">
                <p className="font-medium text-dark text-sm">Emergency</p>
                <p className="text-dark/70 text-xs">911</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};