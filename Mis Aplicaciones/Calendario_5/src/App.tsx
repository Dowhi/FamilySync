import React, { useState, useEffect } from 'react';
import { useApp } from './context/AppContext';
import UserSelector from './components/UserSelector';
import Calendar from './components/Calendar';
import { testFirebaseConnection, enableOfflinePersistence } from './firebase/config';

const App: React.FC = () => {
  const { state, selectUser } = useApp();
  const [firebaseReady, setFirebaseReady] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  // Inicializar Firebase y verificar conexión
  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        console.log('Inicializando Firebase...');
        const connectionOk = await testFirebaseConnection();
        
        if (connectionOk) {
          await enableOfflinePersistence();
          setFirebaseReady(true);
          console.log('Firebase inicializado correctamente');
        } else {
          setFirebaseError('Error de conexión a Firebase');
        }
      } catch (error) {
        console.error('Error al inicializar Firebase:', error);
        setFirebaseError('Error al inicializar Firebase');
      }
    };

    initializeFirebase();
  }, []);

  // Limpiar localStorage al cargar la aplicación
  useEffect(() => {
    localStorage.removeItem('currentUser');
  }, []);

  // Mostrar error si Firebase no se puede inicializar
  if (firebaseError) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        color: 'red',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1>Error de Conexión</h1>
        <p>{firebaseError}</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  // Mostrar loading mientras Firebase se inicializa
  if (!firebaseReady) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1>CalendarioSync</h1>
        <p>Cargando...</p>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Si no hay usuario seleccionado, mostrar selector
  if (!state.currentUser) {
    return <UserSelector onUserSelect={selectUser} />;
  }

  // Si hay usuario seleccionado, mostrar calendario
  return <Calendar />;
};

export default App;
