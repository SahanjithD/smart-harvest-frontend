import type { Task } from '../types/task';
import { mockBeds } from './mockBeds';

export const getMockBedTasks = (bedId: string): Task[] => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const nextWeek = new Date(now);
  nextWeek.setDate(now.getDate() + 7);

  return [
    {
      id: `task-${bedId}-1`,
      bedId,
      title: 'Water plants',
      description: 'Ensure even watering throughout the bed',
      dueDate: new Date(now.setHours(now.getHours() + 3)),
      status: 'pending',
      priority: 'high',
      assignedTo: 'supervisor1',
      requiresPhoto: false
    },
    {
      id: `task-${bedId}-2`,
      bedId,
      title: 'Apply fertilizer',
      description: 'Use the specified NPK mix for this crop type',
      dueDate: tomorrow,
      status: 'pending',
      priority: 'medium',
      assignedTo: 'supervisor1',
      requiresPhoto: false
    },
    {
      id: `task-${bedId}-3`,
      bedId,
      title: 'Document leaf health',
      description: 'Take photos of representative leaves from different plants',
      dueDate: tomorrow,
      status: 'pending',
      priority: 'medium',
      assignedTo: 'supervisor1',
      requiresPhoto: true
    },
    {
      id: `task-${bedId}-4`,
      bedId,
      title: 'Check for pests',
      description: 'Inspect for common pests and record observations',
      dueDate: nextWeek,
      status: 'pending',
      priority: 'low',
      assignedTo: 'supervisor1',
      requiresPhoto: true
    }
  ];
};

// Sample fertilizer timeline events
export const getMockFertilizerTimeline = (bedId: string) => {
  const now = new Date();
  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(now.getDate() - 7);
  const twoWeeksAgo = new Date(now);
  twoWeeksAgo.setDate(now.getDate() - 14);
  const threeWeeksAgo = new Date(now);
  threeWeeksAgo.setDate(now.getDate() - 21);
  const oneWeekLater = new Date(now);
  oneWeekLater.setDate(now.getDate() + 7);

  return [
    {
      id: `fert-${bedId}-1`,
      date: threeWeeksAgo,
      title: 'Initial Fertilization',
      description: 'Applied starter NPK 10-10-10',
      completed: true
    },
    {
      id: `fert-${bedId}-2`,
      date: twoWeeksAgo,
      title: 'Micronutrient Application',
      description: 'Applied micronutrient mix for early growth',
      completed: true
    },
    {
      id: `fert-${bedId}-3`,
      date: oneWeekAgo,
      title: 'Secondary Fertilization',
      description: 'Applied NPK 5-10-5 for vegetative growth',
      completed: true
    },
    {
      id: `fert-${bedId}-4`,
      date: now,
      title: 'Current Stage',
      description: 'Monitoring nutrient levels',
      completed: false,
      isCurrent: true
    },
    {
      id: `fert-${bedId}-5`,
      date: oneWeekLater,
      title: 'Planned Application',
      description: 'Schedule to apply NPK 3-15-3 for flowering',
      completed: false
    }
  ];
};

// Generate mock tasks for all beds
export const getAllMockTasks = (): Task[] => {
  const now = new Date();
  const today = new Date(now);
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const dayAfterTomorrow = new Date(now);
  dayAfterTomorrow.setDate(now.getDate() + 2);
  const nextWeek = new Date(now);
  nextWeek.setDate(now.getDate() + 7);

  return [
    // Bed 001 Tasks
    {
      id: 'task-001',
      bedId: 'bed-001',
      title: 'Water Tomato Bed A',
      description: 'Ensure even watering throughout the bed',
      dueDate: new Date(today.setHours(today.getHours() + 3)),
      status: 'pending',
      priority: 'high',
      assignedTo: 'supervisor1',
      requiresPhoto: false
    },
    {
      id: 'task-002',
      bedId: 'bed-001',
      title: 'Apply tomato fertilizer',
      description: 'Use the NPK 5-10-5 mix for tomatoes',
      dueDate: tomorrow,
      status: 'pending',
      priority: 'medium',
      assignedTo: 'supervisor1',
      requiresPhoto: false
    },
    {
      id: 'task-003',
      bedId: 'bed-001',
      title: 'Document tomato leaf health',
      description: 'Take photos of representative leaves from different plants',
      dueDate: tomorrow,
      status: 'in-progress',
      priority: 'medium',
      assignedTo: 'supervisor2',
      requiresPhoto: true
    },
    
    // Bed 002 Tasks
    {
      id: 'task-004',
      bedId: 'bed-002',
      title: 'Water Lettuce Bed B',
      description: 'Light watering required',
      dueDate: today,
      status: 'completed',
      completedDate: new Date(today.setHours(today.getHours() - 2)),
      priority: 'high',
      assignedTo: 'supervisor1',
      requiresPhoto: false
    },
    {
      id: 'task-005',
      bedId: 'bed-002',
      title: 'Check lettuce for pests',
      description: 'Inspect for aphids and other common lettuce pests',
      dueDate: dayAfterTomorrow,
      status: 'pending',
      priority: 'low',
      assignedTo: 'supervisor2',
      requiresPhoto: true
    },
    
    // Bed 003 Tasks
    {
      id: 'task-006',
      bedId: 'bed-003',
      title: 'Apply treatment for leaf spots',
      description: 'Use the organic fungicide spray on all affected plants',
      dueDate: today,
      status: 'pending',
      priority: 'urgent',
      assignedTo: 'supervisor1',
      requiresPhoto: true
    },
    {
      id: 'task-007',
      bedId: 'bed-003',
      title: 'Prune damaged pepper leaves',
      description: 'Remove any spotted or yellowing leaves',
      dueDate: tomorrow,
      status: 'pending',
      priority: 'high',
      assignedTo: 'supervisor2',
      requiresPhoto: false
    },
    
    // Bed 004 Tasks
    {
      id: 'task-008',
      bedId: 'bed-004',
      title: 'Prune cucumber excess growth',
      description: 'Remove side shoots to promote main stem growth',
      dueDate: dayAfterTomorrow,
      status: 'delayed',
      priority: 'medium',
      assignedTo: 'supervisor1',
      requiresPhoto: false
    },
    {
      id: 'task-009',
      bedId: 'bed-004',
      title: 'Install cucumber trellises',
      description: 'Set up climbing supports for growing cucumber plants',
      dueDate: nextWeek,
      status: 'pending',
      priority: 'medium',
      assignedTo: 'supervisor2',
      requiresPhoto: false
    }
  ];
};

// Get a map of bed IDs to bed names for easy reference
export const getBedNameMap = (): Record<string, string> => {
  const bedMap: Record<string, string> = {};
  mockBeds.forEach(bed => {
    bedMap[bed.id] = bed.name;
  });
  return bedMap;
};
