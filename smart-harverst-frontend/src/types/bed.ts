export type BedHealth = 'healthy' | 'needs-attention' | 'critical';

export interface Bed {
  id: string;
  name: string;
  cropType: string;
  health: BedHealth;
  lastWatered: Date;
  nextTask: string;
  nextTaskDue: Date;
  currentTemp: number;
  humidity: number;
  soilMoisture: number;
  lastPhotoDate: Date;
  fertilizerPlan: {
    current: string;
    nextApplication: Date;
    progress: number;
  };
}
