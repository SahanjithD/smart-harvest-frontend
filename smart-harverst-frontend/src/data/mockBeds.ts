import type { Bed } from '../types/bed';

export const mockBeds: Bed[] = [
  {
    id: 'bed-001',
    name: 'Tomato Bed A',
    cropType: 'Tomatoes',
    health: 'healthy',
    lastWatered: new Date(2025, 5, 26, 8, 0), // June 26, 2025, 8:00 AM
    nextTask: 'Check for pests',
    nextTaskDue: new Date(2025, 5, 26, 16, 0), // June 26, 2025, 4:00 PM
    currentTemp: 25,
    humidity: 65,
    soilMoisture: 75,
    lastPhotoDate: new Date(2025, 5, 25), // June 25, 2025
    fertilizerPlan: {
      current: 'NPK 5-10-5',
      nextApplication: new Date(2025, 5, 28), // June 28, 2025
      progress: 60,
    },
  },
  {
    id: 'bed-002',
    name: 'Lettuce Bed B',
    cropType: 'Lettuce',
    health: 'needs-attention',
    lastWatered: new Date(2025, 5, 26, 7, 30),
    nextTask: 'Water plants',
    nextTaskDue: new Date(2025, 5, 26, 14, 0),
    currentTemp: 23,
    humidity: 55,
    soilMoisture: 45,
    lastPhotoDate: new Date(2025, 5, 25),
    fertilizerPlan: {
      current: 'NPK 3-15-3',
      nextApplication: new Date(2025, 5, 27),
      progress: 75,
    },
  },
  {
    id: 'bed-003',
    name: 'Pepper Bed C',
    cropType: 'Bell Peppers',
    health: 'critical',
    lastWatered: new Date(2025, 5, 26, 7, 0),
    nextTask: 'Apply treatment for leaf spots',
    nextTaskDue: new Date(2025, 5, 26, 12, 0),
    currentTemp: 28,
    humidity: 70,
    soilMoisture: 30,
    lastPhotoDate: new Date(2025, 5, 25),
    fertilizerPlan: {
      current: 'NPK 5-5-5',
      nextApplication: new Date(2025, 5, 26),
      progress: 90,
    },
  },
  {
    id: 'bed-004',
    name: 'Cucumber Bed D',
    cropType: 'Cucumbers',
    health: 'healthy',
    lastWatered: new Date(2025, 5, 26, 8, 30),
    nextTask: 'Prune excess growth',
    nextTaskDue: new Date(2025, 5, 27, 10, 0),
    currentTemp: 24,
    humidity: 60,
    soilMoisture: 70,
    lastPhotoDate: new Date(2025, 5, 25),
    fertilizerPlan: {
      current: 'NPK 7-3-7',
      nextApplication: new Date(2025, 5, 29),
      progress: 40,
    },
  },
];
