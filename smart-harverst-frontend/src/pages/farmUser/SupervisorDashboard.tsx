import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BedCard from '../../components/BedCard';
import WeatherOverview from '../../components/WeatherOverview';
import { mockBeds } from '../../data/mockBeds';
import { getAllMockTasks, getBedNameMap } from '../../data/mockTasks';
import { useAuth } from '../../contexts/AuthContext';
import type { Task } from '../../types/task';

// Filter beds to simulate supervisor only seeing assigned beds
const filteredBeds = mockBeds.slice(0, 4); // Only show first 4 beds for supervisor

const SupervisorDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [todaysTasks, setTodaysTasks] = useState<Task[]>([]);
  const [bedNameMap, setBedNameMap] = useState<Record<string, string>>({});
  
  // Load tasks and bed names
  useEffect(() => {
    // Fetch all tasks
    const allTasks = getAllMockTasks();
    setTasks(allTasks);
    
    // Get bed name mapping
    setBedNameMap(getBedNameMap());
    
    // Filter for today's tasks (due today and not completed)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const tasksForToday = allTasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime() && task.status !== 'completed';
    });
    
    // Sort by priority and due time
    const sortedTasks = [...tasksForToday].sort((a, b) => {
      // First sort by priority (urgent -> high -> medium -> low)
      const priorityOrder: Record<string, number> = { urgent: 0, high: 1, medium: 2, low: 3 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then sort by due time
      return a.dueDate.getTime() - b.dueDate.getTime();
    });
    
    // Limit to 3 tasks for dashboard display
    setTodaysTasks(sortedTasks.slice(0, 3));
  }, []);
  
  // Function to handle bed card click
  const handleBedCardClick = (bedId: string) => {
    navigate(`/beds/${bedId}`);
  };
  
  // Mark a task as complete
  const handleMarkComplete = (taskId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: 'completed' as const,
          completedDate: new Date()
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    
    // Update today's tasks list
    setTodaysTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };
  
  // Format time for display
  const formatDueTime = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    
    // If due in less than an hour
    if (diff < 3600000 && diff > 0) {
      const minutes = Math.floor(diff / 60000);
      return `Due in ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
    
    // If due in hours
    if (diff < 86400000 && diff > 0) {
      const hours = Math.floor(diff / 3600000);
      return `Due in ${hours} hour${hours !== 1 ? 's' : ''}`;
    }
    
    // If overdue
    if (diff < 0) {
      return 'Overdue';
    }
    
    // Default format
    return `Due ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Supervisor Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name || 'Supervisor'}</p>
      </div>
      
      {/* Weather Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Weather & Farm Conditions</h2>
        <WeatherOverview />
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">My Assigned Beds</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-emerald-500">
            <p className="text-gray-500 text-sm">Assigned Beds</p>
            <p className="text-2xl font-bold">{filteredBeds.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-emerald-400">
            <p className="text-gray-500 text-sm">Needs Attention</p>
            <p className="text-2xl font-bold">
              {filteredBeds.filter(bed => bed.health === 'needs-attention').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-emerald-600">
            <p className="text-gray-500 text-sm">Critical</p>
            <p className="text-2xl font-bold">
              {filteredBeds.filter(bed => bed.health === 'critical').length}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Beds</h2>
          <select className="border rounded-md px-3 py-1 text-sm">
            <option value="">All Status</option>
            <option value="healthy">Healthy</option>
            <option value="needs-attention">Needs Attention</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBeds.map((bed) => (
            <BedCard 
              key={bed.id} 
              bed={bed} 
              onClick={() => handleBedCardClick(bed.id)}
            />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
        <div className="bg-white rounded-lg shadow-sm p-4">
          {todaysTasks.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              <p>No tasks due today</p>
            </div>
          ) : (
            <ul className="divide-y">
              {todaysTasks.map(task => (
                <li key={task.id} className="py-3 flex justify-between items-center">
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium">{task.title}</p>
                      {task.priority === 'urgent' && (
                        <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                          Urgent
                        </span>
                      )}
                      {task.priority === 'high' && (
                        <span className="ml-2 bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                          High
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${new Date() > task.dueDate ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                      {formatDueTime(task.dueDate)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {bedNameMap[task.bedId] || task.bedId}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleMarkComplete(task.id)}
                    className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-md text-sm hover:bg-emerald-200 transition-colors"
                  >
                    Mark Complete
                  </button>
                </li>
              ))}
            </ul>
          )}
          {todaysTasks.length > 0 && (
            <div className="mt-4 text-right">
              <button 
                onClick={() => navigate('/tasks')}
                className="text-emerald-600 text-sm hover:text-emerald-800 hover:underline transition-colors"
              >
                View all tasks →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
