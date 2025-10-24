export interface User {
  id: string;
  name: string;
  color: string;
}

export interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  category: EventCategory;
  userId: string;
  userName: string;
  userColor: string;
  allDay?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventFormData {
  title: string;
  start: string;
  end: string;
  description?: string;
  category: EventCategory;
  allDay?: boolean;
  userId: string;
}

export interface AppState {
  users: User[];
  events: Event[];
  currentUser: User | null;
  isLoading: boolean;
  isOffline: boolean;
}

export type EventCategory = 
  | 'trabajo' 
  | 'personal' 
  | 'familia' 
  | 'salud' 
  | 'otro';
