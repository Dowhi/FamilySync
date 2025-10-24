# CalendarioSync - Calendario Compartido

Una aplicación web progresiva (PWA) para gestión de calendarios compartidos con sincronización en tiempo real.

## Características

- ✅ **PWA Completa**: Instalable en dispositivos móviles y escritorio
- ✅ **Sincronización en Tiempo Real**: Usando Firebase Firestore
- ✅ **Funcionalidad Offline**: Persistencia local con sincronización automática
- ✅ **Diseño Responsive**: Optimizado para móvil, tablet y escritorio
- ✅ **Calendario Interactivo**: Vistas de mes, semana, día y lista
- ✅ **Gestión de Eventos**: CRUD completo con categorías
- ✅ **Usuarios Predefinidos**: Sistema simple sin autenticación compleja

## Configuración Inicial

### 1. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita Firestore Database
4. Configura las reglas de Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /events/{document} {
      allow read, write: if true; // Para desarrollo - ajustar para producción
    }
  }
}
```

5. Copia la configuración de Firebase y actualiza `src/firebase/config.ts`:

```typescript
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Ejecutar en Desarrollo

```bash
npm run dev
```

### 4. Construir para Producción

```bash
npm run build
```

### 5. Previsualizar Build de Producción

```bash
npm run preview
```

## Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Calendar.tsx     # Componente principal del calendario
│   ├── EventForm.tsx    # Formulario de eventos
│   └── UserSelector.tsx # Selector de usuario
├── context/             # Context API para estado global
│   └── AppContext.tsx   # Contexto principal
├── firebase/            # Configuración de Firebase
│   └── config.ts        # Configuración y servicios
├── types/               # Tipos TypeScript
│   └── index.ts         # Definiciones de tipos
├── App.tsx              # Componente principal
├── main.tsx             # Punto de entrada
└── style.css            # Estilos globales
```

## Funcionalidades

### Gestión de Usuarios
- 5 usuarios predefinidos con colores únicos
- Selección simple sin autenticación
- Persistencia en localStorage

### Gestión de Eventos
- Crear, editar y eliminar eventos
- Categorías: Médico, Pádel, Pago, Trabajo, Personal, Familiar, Otro
- Visualización diferenciada por usuario
- Sincronización automática entre dispositivos

### Vistas del Calendario
- **Mes**: Vista mensual tradicional
- **Semana**: Vista semanal detallada
- **Día**: Vista diaria con horas
- **Lista**: Lista de eventos próximos

### Funcionalidad Offline
- Persistencia local automática
- Sincronización cuando se restaura la conexión
- Indicador visual de estado offline

## Personalización

### Usuarios
Edita `src/context/AppContext.tsx` para modificar los usuarios predefinidos:

```typescript
const predefinedUsers: User[] = [
  { id: 'user1', name: 'Usuario 1', color: '#3B82F6', isActive: true },
  // ... más usuarios
];
```

### Categorías
Modifica `src/types/index.ts` para agregar nuevas categorías:

```typescript
export type EventCategory = 
  | 'medico'
  | 'padel'
  | 'pago'
  | 'trabajo'
  | 'personal'
  | 'familiar'
  | 'otro'
  | 'nueva-categoria'; // Agregar aquí
```

## Despliegue

### Netlify
1. Conecta tu repositorio a Netlify
2. Configura el build command: `npm run build`
3. Configura el publish directory: `dist`

### Vercel
1. Conecta tu repositorio a Vercel
2. El build se detecta automáticamente

### Firebase Hosting
1. Instala Firebase CLI: `npm install -g firebase-tools`
2. Inicializa: `firebase init hosting`
3. Despliega: `firebase deploy`

## Tecnologías Utilizadas

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Firebase** - Backend como servicio
- **FullCalendar** - Librería de calendario
- **PWA** - Aplicación web progresiva

## Licencia

MIT License
