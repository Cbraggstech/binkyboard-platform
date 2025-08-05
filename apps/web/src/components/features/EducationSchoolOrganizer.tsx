import React, { useState } from 'react';
import { GraduationCap, Plus, Calendar, BookOpen, Users, FileText, Phone, Mail, Clock, AlertCircle, CheckCircle, Star } from 'lucide-react';
import type { Assignment, SchoolContact, SchoolDocument, Child, ClassPeriod } from '../../types';

export const EducationSchoolOrganizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'assignments' | 'schedule' | 'contacts' | 'documents'>('overview');
  const [selectedChild, setSelectedChild] = useState<string>('1');

  // Sample children data with school info
  const children: Child[] = [
    {
      id: '1',
      name: 'Emma',
      age: 8,
      colorTag: '#FF8C94',
      schoolInfo: {
        schoolName: 'Sunny Elementary School',
        grade: '3rd Grade',
        teacher: 'Mrs. Johnson',
        teacherEmail: 'johnson@sunnyelem.edu',
        classSchedule: [
          { id: '1', subject: 'Math', teacher: 'Mrs. Johnson', startTime: '09:00', endTime: '10:00', days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], room: 'Room 12' },
          { id: '2', subject: 'English Language Arts', teacher: 'Mrs. Johnson', startTime: '10:15', endTime: '11:15', days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], room: 'Room 12' },
          { id: '3', subject: 'Science', teacher: 'Mr. Davis', startTime: '11:30', endTime: '12:30', days: ['monday', 'wednesday', 'friday'], room: 'Lab A' },
          { id: '4', subject: 'Art', teacher: 'Ms. Wilson', startTime: '13:30', endTime: '14:30', days: ['tuesday', 'thursday'], room: 'Art Room' },
          { id: '5', subject: 'Physical Education', teacher: 'Coach Miller', startTime: '14:45', endTime: '15:45', days: ['monday', 'wednesday', 'friday'], room: 'Gymnasium' },
        ],
        schoolYear: '2024-2025'
      }
    } as Child,
    {
      id: '2',
      name: 'Liam',
      age: 6,
      colorTag: '#5AA9E6',
      schoolInfo: {
        schoolName: 'Sunny Elementary School',
        grade: '1st Grade',
        teacher: 'Ms. Davis',
        teacherEmail: 'davis@sunnyelem.edu',
        classSchedule: [
          { id: '6', subject: 'Reading', teacher: 'Ms. Davis', startTime: '09:00', endTime: '10:00', days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], room: 'Room 8' },
          { id: '7', subject: 'Math', teacher: 'Ms. Davis', startTime: '10:15', endTime: '11:00', days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], room: 'Room 8' },
          { id: '8', subject: 'Music', teacher: 'Mr. Thompson', startTime: '11:15', endTime: '12:00', days: ['tuesday', 'thursday'], room: 'Music Room' },
          { id: '9', subject: 'Recess & Lunch', teacher: 'Ms. Davis', startTime: '12:00', endTime: '13:00', days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], room: 'Cafeteria' },
        ],
        schoolYear: '2024-2025'
      }
    } as Child
  ];

  // Sample assignments
  const [assignments] = useState<Assignment[]>([
    {
      id: '1',
      childId: '1',
      subject: 'Math',
      title: 'Multiplication Tables Practice',
      description: 'Complete worksheet pages 15-17, practice times tables 6-9',
      dueDate: new Date('2024-08-10T00:00:00'),
      status: 'assigned',
      priority: 'medium',
      attachments: [],
      parentId: 'parent1',
      createdAt: new Date()
    },
    {
      id: '2',
      childId: '1',
      subject: 'English Language Arts',
      title: 'Book Report: Charlotte\'s Web',
      description: 'Write a 2-page report about the main characters and plot',
      dueDate: new Date('2024-08-15T00:00:00'),
      status: 'in-progress',
      priority: 'high',
      attachments: [],
      parentId: 'parent1',
      createdAt: new Date()
    },
    {
      id: '3',
      childId: '1',
      subject: 'Science',
      title: 'Plant Growth Experiment',
      description: 'Observe and record plant growth for 2 weeks',
      dueDate: new Date('2024-08-20T00:00:00'),
      status: 'completed',
      priority: 'medium',
      grade: 'A-',
      attachments: [],
      parentId: 'parent1',
      createdAt: new Date()
    },
    {
      id: '4',
      childId: '2',
      subject: 'Reading',
      title: 'Read 20 minutes daily',
      description: 'Daily reading practice with parent signature',
      dueDate: new Date('2024-08-08T00:00:00'),
      status: 'completed',
      priority: 'low',
      attachments: [],
      parentId: 'parent1',
      createdAt: new Date()
    },
    {
      id: '5',
      childId: '2',
      subject: 'Math',
      title: 'Number Recognition 1-50',
      description: 'Practice writing numbers and counting objects',
      dueDate: new Date('2024-08-12T00:00:00'),
      status: 'assigned',
      priority: 'medium',
      attachments: [],
      parentId: 'parent1',
      createdAt: new Date()
    }
  ]);

  // Sample school contacts
  const [schoolContacts] = useState<SchoolContact[]>([
    {
      id: '1',
      childId: '1',
      name: 'Mrs. Johnson',
      role: 'Homeroom Teacher',
      email: 'johnson@sunnyelem.edu',
      phone: '555-0123',
      subject: 'All Subjects',
      notes: 'Prefers email communication, available after school 3:30-4:00 PM',
      parentId: 'parent1'
    },
    {
      id: '2',
      childId: '1',
      name: 'Mr. Davis',
      role: 'Science Teacher',
      email: 'davis.science@sunnyelem.edu',
      phone: '555-0124',
      subject: 'Science',
      parentId: 'parent1'
    },
    {
      id: '3',
      childId: '1',
      name: 'Principal Williams',
      role: 'School Principal',
      email: 'principal@sunnyelem.edu',
      phone: '555-0100',
      notes: 'Available by appointment',
      parentId: 'parent1'
    },
    {
      id: '4',
      childId: '2',
      name: 'Ms. Davis',
      role: 'Homeroom Teacher',
      email: 'davis@sunnyelem.edu',
      phone: '555-0125',
      subject: 'All Subjects',
      notes: 'Parent conferences every Friday 2:30-3:30 PM',
      parentId: 'parent1'
    }
  ]);

  // Sample school documents
  const [schoolDocuments] = useState<SchoolDocument[]>([
    {
      id: '1',
      childId: '1',
      title: 'Q1 Report Card',
      type: 'report-card',
      url: '/documents/emma-q1-report.pdf',
      uploadDate: new Date('2024-07-15'),
      schoolYear: '2024-2025',
      parentId: 'parent1'
    },
    {
      id: '2',
      childId: '1',
      title: 'IEP Meeting Notes',
      type: 'iep',
      url: '/documents/emma-iep-2024.pdf',
      uploadDate: new Date('2024-06-20'),
      schoolYear: '2024-2025',
      parentId: 'parent1'
    },
    {
      id: '3',
      childId: '2',
      title: 'Field Trip Permission Slip',
      type: 'permission-slip',
      url: '/documents/liam-field-trip.pdf',
      uploadDate: new Date('2024-08-01'),
      schoolYear: '2024-2025',
      parentId: 'parent1'
    }
  ]);

  const selectedChildData = children.find(c => c.id === selectedChild);
  const childAssignments = assignments.filter(a => a.childId === selectedChild);
  const childContacts = schoolContacts.filter(c => c.childId === selectedChild);
  const childDocuments = schoolDocuments.filter(d => d.childId === selectedChild);

  const upcomingAssignments = childAssignments.filter(a => 
    a.status !== 'completed' && a.dueDate > new Date()
  ).sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  const overdueAssignments = childAssignments.filter(a => 
    a.status !== 'completed' && a.dueDate < new Date()
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'text-blue-600 bg-blue-100';
      case 'in-progress': return 'text-orange-600 bg-orange-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'submitted': return 'text-purple-600 bg-purple-100';
      case 'graded': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'report-card': return '📊';
      case 'iep': return '📋';
      case '504-plan': return '📄';
      case 'permission-slip': return '✍️';
      default: return '📄';
    }
  };

  const getCurrentDaySchedule = () => {
    if (!selectedChildData?.schoolInfo?.classSchedule) return [];
    
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return selectedChildData.schoolInfo.classSchedule.filter(period => 
      period.days.includes(today)
    ).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark">Education & School Organizer</h1>
          <p className="text-dark/70">Manage school schedules, assignments, and communications</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 glassmorphism rounded-xl hover:bg-white/30 transition-colors">
            <FileText size={16} />
            <span>Upload Document</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={20} />
            <span>Add Assignment</span>
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

      {/* School Overview Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <BookOpen size={20} className="text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-dark">{upcomingAssignments.length}</span>
          </div>
          <p className="text-dark/70 text-sm">Upcoming Assignments</p>
          {overdueAssignments.length > 0 && (
            <p className="text-red-600 text-xs mt-1">{overdueAssignments.length} overdue</p>
          )}
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <span className="text-2xl font-bold text-dark">
              {childAssignments.filter(a => a.status === 'completed').length}
            </span>
          </div>
          <p className="text-dark/70 text-sm">Completed This Week</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users size={20} className="text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-dark">{childContacts.length}</span>
          </div>
          <p className="text-dark/70 text-sm">School Contacts</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <FileText size={20} className="text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-dark">{childDocuments.length}</span>
          </div>
          <p className="text-dark/70 text-sm">Documents</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white/20 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: GraduationCap },
          { id: 'assignments', label: 'Assignments', icon: BookOpen },
          { id: 'schedule', label: 'Class Schedule', icon: Clock },
          { id: 'contacts', label: 'School Contacts', icon: Users },
          { id: 'documents', label: 'Documents', icon: FileText }
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
              {/* School Information */}
              <div className="card">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                    <GraduationCap size={32} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-dark">{selectedChildData.name}</h2>
                    <p className="text-dark/70">{selectedChildData.schoolInfo?.schoolName}</p>
                    <p className="text-dark/60">{selectedChildData.schoolInfo?.grade} • {selectedChildData.schoolInfo?.teacher}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-dark mb-3">Academic Year</h3>
                    <p className="text-dark/70">{selectedChildData.schoolInfo?.schoolYear}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-3">Primary Teacher</h3>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-dark">{selectedChildData.schoolInfo?.teacher}</p>
                        <p className="text-dark/60 text-sm">{selectedChildData.schoolInfo?.teacherEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Today's Schedule */}
              <div className="card">
                <h3 className="font-semibold text-dark mb-4">Today's Schedule</h3>
                <div className="space-y-3">
                  {getCurrentDaySchedule().map(period => (
                    <div key={period.id} className="flex items-center space-x-4 p-3 bg-white/20 rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Clock size={20} className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-dark">{period.subject}</p>
                        <p className="text-dark/70 text-sm">{period.teacher} • {period.room}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-dark">{period.startTime} - {period.endTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assignment Alerts */}
              {(upcomingAssignments.length > 0 || overdueAssignments.length > 0) && (
                <div className="space-y-4">
                  {overdueAssignments.length > 0 && (
                    <div className="card border-2 border-red-500/50">
                      <div className="flex items-center space-x-2 mb-4">
                        <AlertCircle size={20} className="text-red-500" />
                        <h3 className="font-semibold text-red-600">Overdue Assignments</h3>
                      </div>
                      <div className="space-y-3">
                        {overdueAssignments.map(assignment => (
                          <div key={assignment.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                            <div>
                              <p className="font-medium text-dark">{assignment.title}</p>
                              <p className="text-red-600 text-sm">Due: {assignment.dueDate.toLocaleDateString()}</p>
                            </div>
                            <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-sm">Overdue</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="card">
                    <div className="flex items-center space-x-2 mb-4">
                      <BookOpen size={20} className="text-primary" />
                      <h3 className="font-semibold text-dark">Upcoming Assignments</h3>
                    </div>
                    <div className="space-y-3">
                      {upcomingAssignments.slice(0, 5).map(assignment => (
                        <div key={assignment.id} className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                          <div>
                            <p className="font-medium text-dark">{assignment.title}</p>
                            <p className="text-dark/70 text-sm">{assignment.subject} • Due: {assignment.dueDate.toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(assignment.priority)}`}>
                              {assignment.priority}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs ${getStatusColor(assignment.status)}`}>
                              {assignment.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-dark">Assignments</h2>
                <div className="flex items-center space-x-3">
                  <select className="input-field w-40">
                    <option value="all">All Subjects</option>
                    <option value="math">Math</option>
                    <option value="english">English</option>
                    <option value="science">Science</option>
                    <option value="art">Art</option>
                  </select>
                  <button className="btn-secondary flex items-center space-x-2">
                    <Plus size={16} />
                    <span>Add Assignment</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {childAssignments.map(assignment => (
                  <div key={assignment.id} className="card">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <BookOpen size={24} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-dark">{assignment.title}</h3>
                            <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(assignment.priority)}`}>
                              {assignment.priority}
                            </span>
                          </div>
                          <p className="text-dark/70 text-sm mb-2">{assignment.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-dark/60">
                            <span>Subject: {assignment.subject}</span>
                            <span>Due: {assignment.dueDate.toLocaleDateString()}</span>
                            {assignment.grade && <span>Grade: {assignment.grade}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(assignment.status)}`}>
                          {assignment.status}
                        </span>
                        {assignment.status === 'completed' && assignment.grade && (
                          <div className="flex items-center space-x-1">
                            <Star size={16} className="text-yellow-500" />
                            <span className="text-dark font-medium">{assignment.grade}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'schedule' && selectedChildData?.schoolInfo && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-dark">Class Schedule</h2>
                <button className="btn-secondary flex items-center space-x-2">
                  <Plus size={16} />
                  <span>Add Class</span>
                </button>
              </div>

              {/* Weekly Schedule Grid */}
              <div className="card">
                <h3 className="font-semibold text-dark mb-4">Weekly Schedule</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-3 text-dark/70">Time</th>
                        <th className="text-left py-3 text-dark/70">Monday</th>
                        <th className="text-left py-3 text-dark/70">Tuesday</th>
                        <th className="text-left py-3 text-dark/70">Wednesday</th>
                        <th className="text-left py-3 text-dark/70">Thursday</th>
                        <th className="text-left py-3 text-dark/70">Friday</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Generate time slots */}
                      {Array.from({ length: 8 }, (_, i) => {
                        const hour = 9 + i;
                        const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
                        
                        return (
                          <tr key={timeSlot} className="border-b border-white/10">
                            <td className="py-3 text-dark font-medium">{timeSlot}</td>
                            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map(day => {
                              const classForSlot = selectedChildData.schoolInfo!.classSchedule.find(period =>
                                period.days.includes(day) && period.startTime <= timeSlot && period.endTime > timeSlot
                              );
                              
                              return (
                                <td key={day} className="py-3">
                                  {classForSlot ? (
                                    <div className="p-2 bg-primary/20 rounded-lg">
                                      <p className="font-medium text-dark text-sm">{classForSlot.subject}</p>
                                      <p className="text-dark/60 text-xs">{classForSlot.teacher}</p>
                                      <p className="text-dark/60 text-xs">{classForSlot.room}</p>
                                    </div>
                                  ) : (
                                    <div className="p-2 text-center text-dark/40 text-sm">-</div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-dark">School Contacts</h2>
                <button className="btn-secondary flex items-center space-x-2">
                  <Plus size={16} />
                  <span>Add Contact</span>
                </button>
              </div>

              <div className="space-y-4">
                {childContacts.map(contact => (
                  <div key={contact.id} className="card">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Users size={24} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-dark mb-1">{contact.name}</h3>
                          <p className="text-primary font-medium text-sm mb-2">{contact.role}</p>
                          {contact.subject && (
                            <p className="text-dark/70 text-sm mb-2">Subject: {contact.subject}</p>
                          )}
                          <div className="space-y-1 text-sm text-dark/60">
                            {contact.email && (
                              <div className="flex items-center space-x-2">
                                <Mail size={14} />
                                <span>{contact.email}</span>
                              </div>
                            )}
                            {contact.phone && (
                              <div className="flex items-center space-x-2">
                                <Phone size={14} />
                                <span>{contact.phone}</span>
                              </div>
                            )}
                          </div>
                          {contact.notes && (
                            <p className="text-dark/70 text-sm mt-2 italic">{contact.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {contact.email && (
                          <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors">
                            <Mail size={16} className="text-blue-600" />
                          </button>
                        )}
                        {contact.phone && (
                          <button className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors">
                            <Phone size={16} className="text-green-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-dark">School Documents</h2>
                <button className="btn-secondary flex items-center space-x-2">
                  <Plus size={16} />
                  <span>Upload Document</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {childDocuments.map(document => (
                  <div key={document.id} className="card cursor-pointer hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
                        {getDocumentIcon(document.type)}
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs capitalize">
                        {document.type.replace('-', ' ')}
                      </span>
                    </div>
                    <h3 className="font-semibold text-dark mb-2">{document.title}</h3>
                    <div className="space-y-1 text-sm text-dark/60">
                      <p>Uploaded: {document.uploadDate.toLocaleDateString()}</p>
                      <p>School Year: {document.schoolYear}</p>
                    </div>
                    <button className="w-full mt-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors">
                      View Document
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Academic Performance */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Star size={20} className="text-warning" />
              <h3 className="font-semibold text-dark">Academic Performance</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-dark/70">Math</span>
                <span className="font-bold text-green-600">A</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dark/70">English</span>
                <span className="font-bold text-blue-600">B+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dark/70">Science</span>
                <span className="font-bold text-green-600">A-</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dark/70">Overall GPA</span>
                <span className="font-bold text-primary">3.7</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="font-semibold text-dark mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full p-3 text-left bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-blue-600" />
                  <span className="text-sm text-dark">Email Teacher</span>
                </div>
              </button>
              <button className="w-full p-3 text-left bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-green-600" />
                  <span className="text-sm text-dark">Schedule Conference</span>
                </div>
              </button>
              <button className="w-full p-3 text-left bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                <div className="flex items-center space-x-2">
                  <FileText size={16} className="text-purple-600" />
                  <span className="text-sm text-dark">Request Records</span>
                </div>
              </button>
              <button className="w-full p-3 text-left bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-orange-600" />
                  <span className="text-sm text-dark">Call Main Office</span>
                </div>
              </button>
            </div>
          </div>

          {/* Important Dates */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar size={20} className="text-primary" />
              <h3 className="font-semibold text-dark">Important Dates</h3>
            </div>
            
            <div className="space-y-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <p className="font-medium text-dark text-sm">Parent-Teacher Conference</p>
                <p className="text-dark/60 text-xs">Aug 15, 2024</p>
              </div>
              <div className="p-2 bg-white/20 rounded-lg">
                <p className="font-medium text-dark text-sm">School Picture Day</p>
                <p className="text-dark/60 text-xs">Aug 22, 2024</p>
              </div>
              <div className="p-2 bg-white/20 rounded-lg">
                <p className="font-medium text-dark text-sm">Field Trip</p>
                <p className="text-dark/60 text-xs">Sep 5, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};