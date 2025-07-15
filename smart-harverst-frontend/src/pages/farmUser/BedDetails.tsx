import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockBeds } from '../../data/mockBeds';
import { getMockBedTasks, getMockFertilizerTimeline } from '../../data/mockTasks';
import type { Bed } from '../../types/bed';
import type { Task, TimelineEvent } from '../../types/task';
import '../../styles/animations.css';

const BedDetails: React.FC = () => {
  // Get the bed ID from the URL params
  const { bedId } = useParams<{ bedId: string }>();
  const navigate = useNavigate();
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const [bed, setBed] = useState<Bed | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);
  
  // Animate in when component mounts
  useEffect(() => {
    // Short timeout to allow for page transition
    setTimeout(() => setAnimateIn(true), 100);
  }, []);
  
  // Observe timeline items for animation
  useEffect(() => {
    if (timelineRef.current && timeline.length > 0 && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        },
        { threshold: 0.1 }
      );
      
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      timelineItems.forEach(item => observer.observe(item));
      
      return () => {
        timelineItems.forEach(item => observer.unobserve(item));
      };
    }
  }, [timeline, timelineRef]);
  
  // Fetch bed data, tasks, and timeline
  useEffect(() => {
    if (bedId) {
      const foundBed = mockBeds.find(b => b.id === bedId);
      if (foundBed) {
        // Simulate API call delay
        setTimeout(() => {
          setBed(foundBed);
          setTasks(getMockBedTasks(bedId));
          setTimeline(getMockFertilizerTimeline(bedId));
          setLoading(false);
        }, 800);
      } else {
        // Bed not found
        navigate('/dashboard');
      }
    }
  }, [bedId, navigate]);

  // Handle photo selection
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // Handle photo upload
  const handlePhotoUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPhoto) {
      // In a real app, we would send the photo to a server here
      console.log('Uploading photo:', selectedPhoto.name);
      
      // Simulate upload success
      setTimeout(() => {
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }, 1000);
    }
  };

  // Handle page exit animation before navigation
  const handleNavigateBack = () => {
    // Add exit animation
    document.body.classList.add('page-exit-active');
    setTimeout(() => {
      navigate(-1);
    }, 300);
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

  if (loading || !bed) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Loading skeleton for bed information */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-8 w-1/4 loading-shimmer rounded mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <div className="h-4 w-1/3 loading-shimmer rounded mb-2"></div>
                    <div className="h-6 w-1/4 loading-shimmer rounded"></div>
                  </div>
                  <div className="mb-4">
                    <div className="h-4 w-1/3 loading-shimmer rounded mb-2"></div>
                    <div className="h-6 w-1/4 loading-shimmer rounded"></div>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <div className="h-4 w-1/3 loading-shimmer rounded mb-2"></div>
                    <div className="h-6 w-1/4 loading-shimmer rounded"></div>
                  </div>
                  <div className="mb-4">
                    <div className="h-4 w-1/3 loading-shimmer rounded mb-2"></div>
                    <div className="h-6 w-2/3 loading-shimmer rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-8 w-1/3 loading-shimmer rounded mb-4"></div>
              <div className="h-48 w-full loading-shimmer rounded"></div>
            </div>
          </div>
          
          {/* Loading skeleton for timeline */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-8 w-1/2 loading-shimmer rounded mb-4"></div>
              <div className="space-y-4">
                <div className="h-20 w-full loading-shimmer rounded"></div>
                <div className="h-20 w-full loading-shimmer rounded"></div>
                <div className="h-20 w-full loading-shimmer rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'needs-attention': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Back button */}
      <button 
        onClick={handleNavigateBack} 
        className="flex items-center mb-4 text-gray-600 hover:text-gray-900 hover-lift"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* Bed header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-slide-in-left">
        <div>
          <h1 className="text-2xl font-bold mb-2">{bed.name}</h1>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Crop Type:</span>
            <span className="font-medium">{bed.cropType}</span>
            <span className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(bed.health)}`}>
              {bed.health.replace('-', ' ')}
            </span>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="text-gray-600">Last Updated:</span>
          <span className="ml-2 font-medium">{formatDate(new Date())}</span>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Bed info and photo upload */}
        <div className="lg:col-span-2 space-y-8">
          {/* Bed information */}
          <div className="bg-white rounded-lg shadow-sm p-6 animate-scale-in delay-100">
            <h2 className="text-xl font-semibold mb-4">Bed Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4 staggered-item">
                  <h3 className="text-sm text-gray-600">Current Temperature</h3>
                  <p className="text-lg font-medium">{bed.currentTemp}°C</p>
                </div>
                <div className="mb-4 staggered-item">
                  <h3 className="text-sm text-gray-600">Humidity</h3>
                  <p className="text-lg font-medium">{bed.humidity}%</p>
                </div>
              </div>
              <div>
                <div className="mb-4 staggered-item">
                  <h3 className="text-sm text-gray-600">Soil Moisture</h3>
                  <p className="text-lg font-medium">{bed.soilMoisture}%</p>
                </div>
                <div className="mb-4 staggered-item">
                  <h3 className="text-sm text-gray-600">Last Watered</h3>
                  <p className="text-lg font-medium">{formatDate(bed.lastWatered)} at {formatTime(bed.lastWatered)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Photo upload section */}
          <div className="bg-white rounded-lg shadow-sm p-6 animate-scale-in delay-200">
            <h2 className="text-xl font-semibold mb-4">Plant Documentation</h2>
            <div className="mb-4">
              <span className="text-gray-600">Last Photo Taken:</span>
              <span className="ml-2 font-medium">{formatDate(bed.lastPhotoDate)}</span>
            </div>
            
            <form onSubmit={handlePhotoUpload} className="space-y-4">
              <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover-scale transition-all ${uploadSuccess ? 'photo-upload-success border-green-500' : ''}`}>
                {photoPreview ? (
                  <div className="mb-4 animate-fade-in">
                    <img 
                      src={photoPreview} 
                      alt="Plant preview" 
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
                    htmlFor="photo-upload" 
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 hover-lift"
                  >
                    <span>Upload a photo</span>
                    <input 
                      id="photo-upload" 
                      name="photo-upload" 
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

              <button 
                type="submit" 
                disabled={!selectedPhoto}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover-lift transition-all
                  ${selectedPhoto ? 'bg-primary-600 hover:bg-primary-700' : 'bg-gray-300 cursor-not-allowed'}
                `}
              >
                Upload Photo
              </button>
              
              {uploadSuccess && (
                <div className="p-4 bg-green-100 text-green-800 rounded-md text-center animate-fade-in">
                  Photo uploaded successfully!
                </div>
              )}
            </form>
          </div>

          {/* Bed-specific tasks */}
          <div className="bg-white rounded-lg shadow-sm p-6 animate-scale-in delay-300">
            <h2 className="text-xl font-semibold mb-4">Bed Tasks</h2>
            {tasks.length === 0 ? (
              <p className="text-gray-500">No tasks for this bed.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {tasks.map((task, index) => (
                  <li key={task.id} className={`py-4 staggered-item`} style={{ animationDelay: `${300 + (index * 100)}ms` }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-medium">{task.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                        <div className="flex mt-2 items-center text-sm text-gray-500">
                          <span className="mr-3">Due: {formatDate(task.dueDate)}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          {task.requiresPhoto && (
                            <span className="ml-3 flex items-center text-xs">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Photo Required
                            </span>
                          )}
                        </div>
                      </div>
                      <button className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm hover-lift transition-all hover:bg-green-200">
                        Mark Complete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right column - Fertilizer plan timeline */}
        <div className="space-y-8">
          {/* Fertilizer plan info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Fertilizer Plan</h2>
            <div className="mb-4">
              <h3 className="text-sm text-gray-600">Current Fertilizer</h3>
              <p className="text-lg font-medium">{bed.fertilizerPlan.current}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-sm text-gray-600">Next Application</h3>
              <p className="text-lg font-medium">{formatDate(bed.fertilizerPlan.nextApplication)}</p>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{bed.fertilizerPlan.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${bed.fertilizerPlan.progress >= 75 ? 'bg-red-500' : 
                                        bed.fertilizerPlan.progress >= 50 ? 'bg-yellow-500' : 
                                        'bg-primary-500'}`}
                  style={{ width: `${bed.fertilizerPlan.progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Timeline visualization */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Fertilization Timeline</h2>
            
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              {/* Timeline events */}
              <div className="space-y-8">
                {timeline.map((event) => (
                  <div key={event.id} className="flex items-start">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 z-10 
                      ${event.completed ? 'bg-green-100 text-green-600' : 
                        event.isCurrent ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}
                    >
                      {event.completed ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : event.isCurrent ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      )}
                    </div>
                    <div className={`bg-white p-4 rounded-lg border ${event.isCurrent ? 'border-blue-200' : 'border-gray-200'} flex-grow`}>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{formatDate(event.date)}</p>
                      <p className="text-sm">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BedDetails;
