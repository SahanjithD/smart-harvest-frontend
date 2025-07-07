import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMockTasks, getBedNameMap } from '../../data/mockTasks';
import type { Task } from '../../types/task';

const TaskList: React.FC = () => {
  const navigate = useNavigate();
  
  // State for tasks, filters
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedBed, setSelectedBed] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [bedNameMap, setBedNameMap] = useState<Record<string, string>>({});
  const [showPhotoUploadModal, setShowPhotoUploadModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  // Load tasks and bed names
  useEffect(() => {
    // Fetch all tasks
    const allTasks = getAllMockTasks();
    setTasks(allTasks);
    setFilteredTasks(allTasks);
    
    // Get bed name mapping
    setBedNameMap(getBedNameMap());
  }, []);
  
  // Apply filters when they change
  useEffect(() => {
    let result = tasks;
    
    // Filter by bed
    if (selectedBed) {
      result = result.filter(task => task.bedId === selectedBed);
    }
    
    // Filter by status
    if (selectedStatus) {
      result = result.filter(task => task.status === selectedStatus);
    }
    
    // Filter by priority
    if (selectedPriority) {
      result = result.filter(task => task.priority === selectedPriority);
    }
    
    // Sort by due date (ascending)
    result = [...result].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
    
    setFilteredTasks(result);
  }, [tasks, selectedBed, selectedStatus, selectedPriority]);
  
  // Handle bed filter change
  const handleBedFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBed(e.target.value);
  };
  
  // Handle status filter change
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };
  
  // Handle priority filter change
  const handlePriorityFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriority(e.target.value);
  };
  
  // Mark a task as complete
  const handleMarkComplete = (task: Task) => {
    if (task.requiresPhoto) {
      // If photo is required, show the photo upload modal
      setSelectedTask(task);
      setShowPhotoUploadModal(true);
    } else {
      // Otherwise, just mark as complete
      const updatedTasks = tasks.map(t => {
        if (t.id === task.id) {
          return {
            ...t,
            status: 'completed' as const,
            completedDate: new Date()
          };
        }
        return t;
      });
      
      setTasks(updatedTasks);
    }
  };
  
  // Navigate to bed details
  const handleViewBed = (bedId: string) => {
    navigate(`/beds/${bedId}`);
  };
  
  // Handle photo selection
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };
  
  // Submit photo and complete task
  const handlePhotoSubmit = () => {
    if (selectedTask && selectedPhoto) {
      // In a real app, we would upload the photo to a server here
      
      // Update the task status
      const updatedTasks = tasks.map(t => {
        if (t.id === selectedTask.id) {
          return {
            ...t,
            status: 'completed' as const,
            completedDate: new Date(),
            photoUrl: URL.createObjectURL(selectedPhoto) // In a real app, this would be the URL from the server
          };
        }
        return t;
      });
      
      setTasks(updatedTasks);
      
      // Close the modal and reset state
      setShowPhotoUploadModal(false);
      setSelectedTask(null);
      setSelectedPhoto(null);
      setPhotoPreview(null);
    }
  };
  
  // Reset all filters
  const handleResetFilters = () => {
    setSelectedBed('');
    setSelectedStatus('');
    setSelectedPriority('');
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };
  
  // Get color for priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get color for status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Check if a task is overdue
  const isOverdue = (task: Task) => {
    if (task.status === 'completed') return false;
    return new Date() > new Date(task.dueDate);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Task List</h1>
        <p className="text-gray-600">Manage and track all farm tasks</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-semibold mb-4 sm:mb-0">All Tasks</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <select 
              className={`border rounded-md px-3 py-2 ${selectedBed ? 'border-emerald-500 bg-emerald-50' : ''}`}
              value={selectedBed}
              onChange={handleBedFilterChange}
            >
              <option value="">All Beds</option>
              {Object.entries(bedNameMap).map(([id, name]) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
            
            <select 
              className={`border rounded-md px-3 py-2 ${selectedStatus ? 'border-emerald-500 bg-emerald-50' : ''}`}
              value={selectedStatus}
              onChange={handleStatusFilterChange}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="delayed">Delayed</option>
            </select>
            
            <select 
              className={`border rounded-md px-3 py-2 ${selectedPriority ? 'border-emerald-500 bg-emerald-50' : ''}`}
              value={selectedPriority}
              onChange={handlePriorityFilterChange}
            >
              <option value="">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            
            <button
              onClick={handleResetFilters}
              className={`border rounded-md px-3 py-2 text-gray-600 hover:bg-gray-100 ${
                selectedBed || selectedStatus || selectedPriority ? 'bg-gray-100' : 'opacity-50'
              }`}
              disabled={!selectedBed && !selectedStatus && !selectedPriority}
            >
              Reset Filters
            </button>
          </div>
        </div>
        
        <div className="mb-2 text-sm text-gray-500">
          {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} found
          {(selectedBed || selectedStatus || selectedPriority) && ' with filters'}
          {selectedBed && `: Bed ${bedNameMap[selectedBed]}`}
          {selectedStatus && `: ${selectedStatus.replace('-', ' ')}`}
          {selectedPriority && `: ${selectedPriority} priority`}
          {'. '}
          <span className="italic">Sorted by due date (earliest first)</span>
        </div>
        
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No tasks found matching your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bed
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                    <span className="ml-1 text-xs text-emerald-600">↑</span>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className={isOverdue(task) ? 'bg-red-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{task.title}</div>
                          <div className="text-sm text-gray-500">{task.description}</div>
                          {task.requiresPhoto && (
                            <div className="text-xs text-gray-500 flex items-center mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Photo Required
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => handleViewBed(task.bedId)}
                        className="text-emerald-600 hover:text-emerald-900 hover:underline"
                      >
                        {bedNameMap[task.bedId] || task.bedId}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(task.dueDate)}</div>
                      <div className="text-sm text-gray-500">{formatTime(task.dueDate)}</div>
                      {isOverdue(task) && (
                        <span className="text-xs text-red-600 font-medium">Overdue</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                        {task.status.replace('-', ' ')}
                      </span>
                      {task.completedDate && (
                        <div className="text-xs text-gray-500 mt-1">
                          {formatDate(task.completedDate)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {task.status !== 'completed' && (
                        <button
                          onClick={() => handleMarkComplete(task)}
                          className="text-emerald-600 hover:text-emerald-900"
                        >
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Photo Upload Modal */}
      {showPhotoUploadModal && selectedTask && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl mx-auto p-8 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Upload Photo</h3>
            <p className="text-gray-600 mb-4">
              This task requires photo documentation. Please upload a photo to complete the task.
            </p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
              {photoPreview ? (
                <div className="mb-4">
                  <img 
                    src={photoPreview} 
                    alt="Task documentation" 
                    className="max-h-48 mx-auto rounded-lg" 
                  />
                </div>
              ) : (
                <svg 
                  className="mx-auto h-12 w-12 text-gray-400" 
                  stroke="currentColor" 
                  fill="none" 
                  viewBox="0 0 48 48" 
                  aria-hidden="true"
                >
                  <path 
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                    strokeWidth={2} 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                </svg>
              )}
              
              <div className="flex text-sm text-gray-600 justify-center">
                <label 
                  htmlFor="task-photo-upload" 
                  className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500"
                >
                  <span>Upload a photo</span>
                  <input 
                    id="task-photo-upload" 
                    name="task-photo-upload" 
                    type="file" 
                    accept="image/*" 
                    className="sr-only" 
                    onChange={handlePhotoChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
            
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => {
                  setShowPhotoUploadModal(false);
                  setSelectedTask(null);
                  setSelectedPhoto(null);
                  setPhotoPreview(null);
                }}
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button 
                onClick={handlePhotoSubmit}
                disabled={!selectedPhoto}
                className={`px-4 py-2 rounded-md text-white 
                  ${selectedPhoto ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-300 cursor-not-allowed'}
                `}
              >
                Complete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
