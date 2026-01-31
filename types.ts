export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export enum HealthMetricType {
  STEPS = 'STEPS',
  HEART_RATE = 'HEART_RATE',
  SLEEP = 'SLEEP',
  CALORIES = 'CALORIES'
}

export interface HealthMetric {
  id: string;
  type: HealthMetricType;
  value: number;
  unit: string;
  timestamp: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}
