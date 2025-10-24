# 🚀 Inicio Rápido - CalendarioSync

## ⚡ Configuración en 5 Minutos

### 1. Configurar Firebase (2 minutos)

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto llamado "calendario-sync"
3. Habilita **Firestore Database** en modo de prueba
4. Copia la configuración del proyecto

### 2. Actualizar Configuración (1 minuto)

Edita `src/firebase/config.ts` y reemplaza la configuración:

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

### 3. Ejecutar la Aplicación (1 minuto)

```bash
npm install
npm run dev
```

### 4. ¡Listo! 🎉

La aplicación estará disponible en `http://localhost:3000`

## 📱 Características Principales

- ✅ **PWA Completa**: Instalable en móviles y escritorio
- ✅ **Sincronización en Tiempo Real**: Cambios instantáneos entre dispositivos
- ✅ **Funcionalidad Offline**: Funciona sin conexión
- ✅ **Diseño Responsive**: Optimizado para todos los dispositivos
- ✅ **5 Usuarios Predefinidos**: Sin necesidad de autenticación compleja

## 🎯 Cómo Usar

1. **Seleccionar Usuario**: Elige tu perfil al iniciar
2. **Crear Eventos**: Haz clic en cualquier fecha para crear un evento
3. **Ver Eventos**: Los eventos se muestran con colores según el usuario
4. **Cambiar Vistas**: Usa los botones Mes/Semana/Día/Lista
5. **Sincronización**: Los cambios se sincronizan automáticamente

## 🔧 Personalización

### Cambiar Usuarios
Edita `src/context/AppContext.tsx`:

```typescript
const predefinedUsers: User[] = [
  { id: 'user1', name: 'Tu Nombre', color: '#3B82F6', isActive: true },
  // ... más usuarios
];
```

### Cambiar Categorías
Edita `src/types/index.ts`:

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

## 📦 Despliegue

### Netlify (Recomendado)
1. Conecta tu repositorio a Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Conecta tu repositorio a Vercel
2. El build se detecta automáticamente

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 🆘 Solución de Problemas

### Error: "Firebase not initialized"
- Verifica que la configuración de Firebase sea correcta
- Asegúrate de que Firestore esté habilitado

### Error: "Permission denied"
- Verifica que Firestore esté en modo de prueba
- Asegúrate de que las reglas permitan lectura/escritura

### La app no funciona offline
- Verifica que el navegador soporte IndexedDB
- Asegúrate de que la persistencia esté habilitada

## 📞 Soporte

Si tienes problemas:
1. Revisa la documentación completa en `README.md`
2. Verifica la configuración de Firebase en `FIREBASE_SETUP.md`
3. Asegúrate de que todas las dependencias estén instaladas

¡Disfruta tu calendario compartido! 🎉
