import type { Task } from '../types/task';

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
