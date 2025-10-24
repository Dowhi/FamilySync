import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, User, Event, EventFormData } from '../types';
import { db } from '../firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';

// Usuarios predefinidos
const predefinedUsers: User[] = [
  { id: 'user1', name: 'Usuario 1', color: '#3B82F6' },
  { id: 'user2', name: 'Usuario 2', color: '#EF4444' },
  { id: 'user3', name: 'Usuario 3', color: '#10B981' },
  { id: 'user4', name: 'Usuario 4', color: '#F59E0B' },
  { id: 'user5', name: 'Usuario 5', color: '#8B5CF6' }
];

interface AppContextType {
  state: AppState;
  selectUser: (user: User) => void;
  createEvent: (eventData: EventFormData) => Promise<void>;
  updateEvent: (eventId: string, eventData: EventFormData) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_OFFLINE'; payload: boolean }
  | { type: 'SELECT_USER'; payload: User }
  | { type: 'SET_EVENTS'; payload: Event[] }
  | { type: 'ADD_EVENT'; payload: Event }
  | { type: 'UPDATE_EVENT'; payload: Event }
  | { type: 'DELETE_EVENT'; payload: string };

const initialState: AppState = {
  users: predefinedUsers,
  events: [],
  currentUser: null,
  isLoading: true,
  isOffline: false
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_OFFLINE':
      return { ...state, isOffline: action.payload };
    case 'SELECT_USER':
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload : event
        )
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload)
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Limpiar localStorage al cargar la aplicación
    localStorage.removeItem('currentUser');
    
    // Configurar listeners de conexión
    const handleOnline = () => dispatch({ type: 'SET_OFFLINE', payload: false });
    const handleOffline = () => dispatch({ type: 'SET_OFFLINE', payload: true });

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Configurar listener de Firestore
    const eventsQuery = query(collection(db, 'events'), orderBy('start', 'asc'));
    const unsubscribe = onSnapshot(
      eventsQuery,
      (snapshot) => {
        const events: Event[] = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            start: data.start?.toDate?.()?.toISOString() || data.start,
            end: data.end?.toDate?.()?.toISOString() || data.end,
            description: data.description,
            category: data.category,
            userId: data.userId,
            userName: data.userName,
            userColor: data.userColor,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            updatedAt: data.updatedAt?.toDate?.() || new Date()
          };
        });
        dispatch({ type: 'SET_EVENTS', payload: events });
        dispatch({ type: 'SET_LOADING', payload: false });
      },
      (error) => {
        console.error('Error listening to events:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    );

    return () => {
      unsubscribe();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const selectUser = (user: User) => {
    dispatch({ type: 'SELECT_USER', payload: user });
  };

  const createEvent = async (eventData: EventFormData) => {
    if (!state.currentUser) return;

    const event = {
      ...eventData,
      userId: state.currentUser.id,
      userName: state.currentUser.name,
      userColor: state.currentUser.color,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    try {
      await addDoc(collection(db, 'events'), event);
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  };

  const updateEvent = async (eventId: string, eventData: EventFormData) => {
    try {
      await updateDoc(doc(db, 'events', eventId), {
        ...eventData,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      await deleteDoc(doc(db, 'events', eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  };

  return (
    <AppContext.Provider
      value={{
        state,
        selectUser,
        createEvent,
        updateEvent,
        deleteEvent
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
