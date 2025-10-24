import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuración de Firebase - Usa variables de entorno
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCOkbtTUgsNI-oTvcXsI59Y4wjh96uS2fg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "calendario-sync-9e37f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "calendario-sync-9e37f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "calendario-sync-9e37f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "459599516875",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:459599516875:web:e68f83fbeb30c53755f74e"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
export const db = getFirestore(app);
export const auth = getAuth(app);

// Configurar emulador en desarrollo (opcional)
if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.log('Conectado al emulador de Firestore');
  } catch (error) {
    console.log('Emulador de Firestore ya está conectado');
  }
}

// Habilitar persistencia offline
export const enableOfflinePersistence = async () => {
  try {
    await import('firebase/firestore').then(({ enableIndexedDbPersistence }) => {
      enableIndexedDbPersistence(db);
    });
    console.log('Persistencia offline habilitada');
  } catch (err: any) {
    if (err.code === 'failed-precondition') {
      console.warn('Persistencia offline no disponible - múltiples pestañas abiertas');
    } else if (err.code === 'unimplemented') {
      console.warn('Persistencia offline no disponible - navegador no compatible');
    } else {
      console.error('Error al habilitar persistencia offline:', err);
    }
  }
};

// Función para verificar la conexión de Firebase
export const testFirebaseConnection = async () => {
  try {
    console.log('Probando conexión a Firebase...');
    console.log('Configuración Firebase:', {
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain
    });
    return true;
  } catch (error) {
    console.error('Error de conexión a Firebase:', error);
    return false;
  }
};

export default app;
