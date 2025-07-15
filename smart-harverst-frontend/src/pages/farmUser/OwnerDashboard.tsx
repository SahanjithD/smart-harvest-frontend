import React from 'react';
import { useNavigate } from 'react-router-dom';
import WeatherOverviewCompact from '../../components/WeatherOverviewCompact';
import { mockBeds } from '../../data/mockBeds';
import { useAuth } from '../../contexts/AuthContext';
import './OwnerDashboard.css'; // Import the CSS file we'll create
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, Area, AreaChart, ComposedChart
} from 'recharts';

// Mock data for supervisors - would come from API in real app
const mockSupervisors = [
  { id: 'sup1', name: 'John Smith', bedsAssigned: 5, email: 'john@example.com' },
  { id: 'sup2', name: 'Maria Garcia', bedsAssigned: 4, email: 'maria@example.com' },
  { id: 'sup3', name: 'David Chen', bedsAssigned: 3, email: 'david@example.com' },
];

const OwnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Function to handle bed card click
  const handleBedCardClick = (bedId: string) => {
    // Add transition effect before navigation
    document.body.classList.add('page-exit');
    setTimeout(() => {
      navigate(`/beds/${bedId}`);
    }, 200);
  };
  
  // Function to handle supervisor card click
  const handleSupervisorClick = (supervisorId: string) => {
    // Navigate to supervisor details page - would be implemented in a real app
    navigate(`/supervisors/${supervisorId}`);
  };
  
  // State for active overview section
  const [activeOverviewSection, setActiveOverviewSection] = React.useState<string | null>(null);
  
  // Handler for overview card clicks
  const handleOverviewCardClick = (section: string) => {
    // If clicking the same section, toggle it off
    if (section === activeOverviewSection) {
      setActiveOverviewSection(null);
    } else {
      setActiveOverviewSection(section);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Owner Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name || 'Owner'}</p>
      </div>
      
      {/* Weather Section - Made smaller */}
      <div className="mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-2">Weather Overview</h2>
          <div className="h-auto">
            <WeatherOverviewCompact />
          </div>
        </div>
      </div>
      
      {/* Farm Analytics Section - Moved up */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Farm Analytics</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Health Distribution Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-3">Bed Health Distribution</h3>
            <div className="h-64">
              {/* Using Recharts for pie chart */}
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { 
                        name: 'Healthy', 
                        value: mockBeds.filter(b => b.health === 'healthy').length,
                        color: '#4ade80' // a more subdued green
                      },
                      { 
                        name: 'Needs Attention', 
                        value: mockBeds.filter(b => b.health === 'needs-attention').length,
                        color: '#cbd5e1' // light slate for less emphasis
                      },
                      { 
                        name: 'Critical', 
                        value: mockBeds.filter(b => b.health === 'critical').length,
                        color: '#94a3b8' // slate-400, professional gray
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[
                      { name: 'Healthy', color: '#4ade80' },
                      { name: 'Needs Attention', color: '#cbd5e1' },
                      { name: 'Critical', color: '#94a3b8' },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} beds`, 'Count']} 
                    contentStyle={{ border: '1px solid #e5e7eb', borderRadius: '4px', backgroundColor: '#fff', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Crop Type Distribution */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-3">Crop Type Distribution</h3>
            <div className="h-64">
              {/* Using Recharts for horizontal bar chart */}
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={Array.from(new Set(mockBeds.map(bed => bed.cropType))).map(cropType => {
                    const count = mockBeds.filter(bed => bed.cropType === cropType).length;
                    return {
                      name: cropType,
                      count: count,
                      percentage: Math.round((count / mockBeds.length) * 100)
                    };
                  })}
                  margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                  <XAxis type="number" tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'count' ? `${value} beds` : `${value}%`, 
                      name === 'count' ? 'Count' : 'Percentage'
                    ]} 
                    contentStyle={{ border: '1px solid #e5e7eb', borderRadius: '4px', backgroundColor: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="count" fill="#94a3b8" name="Beds" radius={[0, 2, 2, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Task Completion Trend */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-3">Task Completion Trend (Last 7 Days)</h3>
            <div className="h-64">
              {/* Using Recharts for area chart */}
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={Array.from({ length: 7 }).map((_, i) => {
                    // Mock data - in real app would come from API
                    const completed = Math.floor(Math.random() * 8) + 2; // 2-10
                    const pending = Math.floor(Math.random() * 5); // 0-5
                    const total = completed + pending;
                    const day = new Date();
                    day.setDate(day.getDate() - (6 - i));
                    const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
                    
                    return {
                      name: dayName,
                      completed: completed,
                      total: total,
                      completion: Math.round((completed / total) * 100)
                    };
                  })}
                  margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'completion' ? `${value}%` : `${value} tasks`,
                      name === 'completion' ? 'Completion Rate' : 
                      name === 'completed' ? 'Completed Tasks' : 'Total Tasks'
                    ]}
                    contentStyle={{ border: '1px solid #e5e7eb', borderRadius: '4px', backgroundColor: '#fff', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Line type="monotone" dataKey="total" stroke="#cbd5e1" strokeWidth={1.5} dot={{ r: 2 }} activeDot={{ r: 3 }} name="Total Tasks" />
                  <Line type="monotone" dataKey="completed" stroke="#94a3b8" strokeWidth={1.5} dot={{ r: 2 }} activeDot={{ r: 3 }} name="Completed Tasks" />
                  <Line type="monotone" dataKey="completion" stroke="#64748b" strokeWidth={1.5} dot={{ r: 2 }} activeDot={{ r: 3 }} name="Completion Rate %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Task Priority Distribution */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-3">Upcoming Tasks by Priority</h3>
            <div className="h-64">
              {/* Using Recharts for bar chart */}
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'High', tasks: 7, fill: '#94a3b8', dueText: 'Due within 48 hours' },
                    { name: 'Medium', tasks: 12, fill: '#cbd5e1', dueText: 'Due within 5 days' },
                    { name: 'Low', tasks: 8, fill: '#e2e8f0', dueText: 'Due within 2 weeks' },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(value) => {
                      return [`${value} tasks`, 'Tasks'];
                    }}
                    labelFormatter={() => ''}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm text-xs">
                            <p className="font-medium">{payload[0].payload.name} Priority: {payload[0].value} tasks</p>
                            <p className="text-gray-500">{payload[0].payload.dueText}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="tasks" name="Tasks" radius={[2, 2, 0, 0]} barSize={30}>
                    {[
                      { name: 'High', fill: '#94a3b8' },
                      { name: 'Medium', fill: '#cbd5e1' },
                      { name: 'Low', fill: '#e2e8f0' },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Monthly Performance Summary */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-3">Monthly Performance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="text-sm uppercase text-gray-500 mb-1">Task Completion Rate</h4>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">92%</span>
                <span className="ml-2 text-xs text-green-600">↑ 3% from last month</span>
              </div>
              <div className="h-20 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: 'Feb', rate: 83 },
                      { month: 'Mar', rate: 86 },
                      { month: 'Apr', rate: 84 },
                      { month: 'May', rate: 89 },
                      { month: 'Jun', rate: 92 },
                    ]}
                  >
                    <Line type="monotone" dataKey="rate" stroke="#94a3b8" strokeWidth={1.5} dot={{ r: 2 }} />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Completion Rate']}
                      contentStyle={{ border: '1px solid #e5e7eb', borderRadius: '4px', backgroundColor: '#fff', fontSize: '12px' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="text-sm uppercase text-gray-500 mb-1">Average Bed Health Score</h4>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">87/100</span>
                <span className="ml-2 text-xs text-yellow-600">↓ 2 points from last month</span>
              </div>
              <div className="h-20 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: 'Feb', score: 84 },
                      { month: 'Mar', score: 89 },
                      { month: 'Apr', score: 91 },
                      { month: 'May', score: 89 },
                      { month: 'Jun', score: 87 },
                    ]}
                  >
                    <Line type="monotone" dataKey="score" stroke="#ca8a04" strokeWidth={1.5} dot={{ r: 2 }} />
                    <Tooltip 
                      formatter={(value) => [`${value}/100`, 'Health Score']}
                      contentStyle={{ border: '1px solid #e5e7eb', borderRadius: '4px', backgroundColor: '#fff', fontSize: '12px' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="text-sm uppercase text-gray-500 mb-1">Response Time to Issues</h4>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">1.4 days</span>
                <span className="ml-2 text-xs text-green-600">↓ 0.3 days from last month</span>
              </div>
              <div className="h-20 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: 'Feb', days: 2.1 },
                      { month: 'Mar', days: 1.9 },
                      { month: 'Apr', days: 1.8 },
                      { month: 'May', days: 1.7 },
                      { month: 'Jun', days: 1.4 },
                    ]}
                  >
                    <Line type="monotone" dataKey="days" stroke="#64748b" strokeWidth={1.5} dot={{ r: 2 }} />
                    <Tooltip 
                      formatter={(value) => [`${value} days`, 'Response Time']}
                      contentStyle={{ border: '1px solid #e5e7eb', borderRadius: '4px', backgroundColor: '#fff', fontSize: '12px' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Farm Overview Section - Moved down */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Farm Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => handleOverviewCardClick('beds')} 
            className={`text-left bg-white p-4 rounded-lg shadow-sm border-l-4 border-emerald-500 hover:shadow-md transition-all ${activeOverviewSection === 'beds' ? 'ring-2 ring-emerald-300' : ''}`}
          >
            <p className="text-gray-500 text-sm">Total Beds</p>
            <p className="text-2xl font-bold">{mockBeds.length}</p>
            <div className="mt-1 flex items-center text-xs text-emerald-600">
              <span>Click to view details</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
          <button 
            onClick={() => handleOverviewCardClick('supervisors')} 
            className={`text-left bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-all ${activeOverviewSection === 'supervisors' ? 'ring-2 ring-blue-300' : ''}`}
          >
            <p className="text-gray-500 text-sm">Supervisors</p>
            <p className="text-2xl font-bold">{mockSupervisors.length}</p>
            <div className="mt-1 flex items-center text-xs text-blue-600">
              <span>Click to view details</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
          <button 
            onClick={() => handleOverviewCardClick('attention')} 
            className={`text-left bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500 hover:shadow-md transition-all ${activeOverviewSection === 'attention' ? 'ring-2 ring-yellow-300' : ''}`}
          >
            <p className="text-gray-500 text-sm">Needs Attention</p>
            <p className="text-2xl font-bold">
              {mockBeds.filter(bed => bed.health === 'needs-attention').length}
            </p>
            <div className="mt-1 flex items-center text-xs text-yellow-600">
              <span>Click to view details</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
          <button 
            onClick={() => handleOverviewCardClick('critical')} 
            className={`text-left bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500 hover:shadow-md transition-all ${activeOverviewSection === 'critical' ? 'ring-2 ring-red-300' : ''}`}
          >
            <p className="text-gray-500 text-sm">Critical</p>
            <p className="text-2xl font-bold">
              {mockBeds.filter(bed => bed.health === 'critical').length}
            </p>
            <div className="mt-1 flex items-center text-xs text-red-600">
              <span>Click to view details</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
        
        {/* Detailed Overview Content */}
        {activeOverviewSection && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow-sm animate-fadeIn">
            {activeOverviewSection === 'beds' && (
              <div>
                <h3 className="font-medium mb-2 flex items-center text-emerald-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  All Beds Overview
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {mockBeds.map((bed, index) => (
                    <button 
                      key={bed.id} 
                      className="border rounded p-2 flex justify-between items-center hover:bg-gray-50 w-full text-left transition-all duration-300 hover:shadow-sm transform hover:-translate-y-1 stagger-card"
                      onClick={() => handleBedCardClick(bed.id)}
                    >
                      <div>
                        <p className="font-medium">{bed.name}</p>
                        <p className="text-sm text-gray-500">{bed.cropType}</p>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          bed.health === 'healthy' ? 'bg-emerald-100 text-emerald-800' : 
                          bed.health === 'needs-attention' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {bed.health.replace('-', ' ')}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {activeOverviewSection === 'supervisors' && (
              <div>
                <h3 className="font-medium mb-2 flex items-center text-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  All Supervisors
                </h3>
                <div className="divide-y">
                  {mockSupervisors.map(supervisor => (
                    <div key={supervisor.id} className="py-2 flex justify-between items-center hover:bg-gray-50 px-2">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                          {supervisor.name.charAt(0)}
                        </div>
                        <div className="ml-2">
                          <p className="font-medium">{supervisor.name}</p>
                          <p className="text-sm text-gray-500">{supervisor.email}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{supervisor.bedsAssigned} beds assigned</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeOverviewSection === 'attention' && (
              <div>
                <h3 className="font-medium mb-2 flex items-center text-yellow-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Beds Needing Attention
                </h3>
                <div className="space-y-2">
                  {mockBeds.filter(bed => bed.health === 'needs-attention').map((bed, index) => (
                    <button 
                      key={bed.id} 
                      className="border border-yellow-200 bg-yellow-50 rounded p-3 w-full text-left transition-all duration-300 hover:shadow-md hover:bg-yellow-100 transform hover:-translate-y-1 pulse-attention stagger-card"
                      onClick={() => handleBedCardClick(bed.id)}
                    >
                      <div className="flex justify-between">
                        <p className="font-medium">{bed.name}</p>
                        <span className="text-xs text-yellow-700 flex items-center">
                          View details
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{bed.cropType}</p>
                      <div className="flex justify-between text-sm">
                        <span>Last updated: 2 days ago</span>
                        <span className="font-medium text-yellow-800">Requires inspection</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {activeOverviewSection === 'critical' && (
              <div>
                <h3 className="font-medium mb-2 flex items-center text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Critical Beds
                </h3>
                <div className="space-y-2">
                  {mockBeds.filter(bed => bed.health === 'critical').map((bed, index) => (
                    <button 
                      key={bed.id} 
                      className="border border-red-200 bg-red-50 rounded p-3 w-full text-left transition-all duration-300 hover:shadow-md hover:bg-red-100 transform hover:-translate-y-1 pulse-critical stagger-card"
                      onClick={() => handleBedCardClick(bed.id)}
                    >
                      <div className="flex justify-between">
                        <p className="font-medium">{bed.name}</p>
                        <span className="text-xs text-red-700 flex items-center">
                          View details
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{bed.cropType}</p>
                      <div className="flex justify-between text-sm">
                        <span>Last updated: Today</span>
                        <span className="font-medium text-red-800">Urgent action required</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Supervisors Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Supervisors</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Beds Assigned
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockSupervisors.map((supervisor) => (
                <tr key={supervisor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-emerald-700 font-medium">{supervisor.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{supervisor.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{supervisor.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{supervisor.bedsAssigned} beds</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-emerald-600 hover:text-emerald-900 mr-3"
                      onClick={() => handleSupervisorClick(supervisor.id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
