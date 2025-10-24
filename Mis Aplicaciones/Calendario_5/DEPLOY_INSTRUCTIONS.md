# 🚀 Instrucciones de Despliegue en GitHub Pages

## ✅ Configuración Completada

Tu aplicación CalendarioSync ya está configurada para funcionar en GitHub Pages. Aquí están los pasos finales:

## 📋 Pasos para Desplegar

### 1. Configurar Firebase (IMPORTANTE)

1. **Crea un proyecto en Firebase**:
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Crea un nuevo proyecto
   - Habilita Firestore Database

2. **Configura las variables de entorno**:
   - Copia `env.example` como `.env`
   - Reemplaza los valores con tu configuración de Firebase

### 2. Subir a GitHub

```bash
# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit - CalendarioSync PWA"

# Conectar con GitHub (reemplaza TU_USUARIO)
git remote add origin https://github.com/TU_USUARIO/Calendario_5.git

# Subir a GitHub
git push -u origin main
```

### 3. Configurar GitHub Pages

1. **Ve a tu repositorio en GitHub**
2. **Settings** > **Pages**
3. **Source**: Selecciona "GitHub Actions"
4. **Espera** a que se ejecute el workflow automáticamente

### 4. Acceder a tu Aplicación

Tu aplicación estará disponible en:
`https://TU_USUARIO.github.io/Calendario_5/`

## 🔧 Configuración Adicional

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=tu-app-id
```

### Dominio Personalizado (Opcional)

Si tienes un dominio personalizado:
1. Edita `public/CNAME`
2. Reemplaza el contenido con tu dominio
3. Configura DNS para apuntar a GitHub Pages

## 🎯 Características Implementadas

- ✅ **PWA Completa**: Instalable en dispositivos móviles
- ✅ **Sincronización en Tiempo Real**: Firebase Firestore
- ✅ **Funcionalidad Offline**: Service Worker configurado
- ✅ **Diseño Responsive**: Optimizado para todos los dispositivos
- ✅ **Despliegue Automático**: GitHub Actions configurado
- ✅ **5 Usuarios Predefinidos**: Sin autenticación compleja

## 🐛 Solución de Problemas

### Error: "404 Not Found"
- Verifica que el repositorio sea público
- Asegúrate de que GitHub Pages esté habilitado
- Revisa que el workflow se haya ejecutado correctamente

### Error: "Firebase not initialized"
- Verifica que las variables de entorno estén configuradas
- Asegúrate de que Firebase esté configurado correctamente

### Error: "Build failed"
- Revisa los logs del workflow en GitHub Actions
- Verifica que todas las dependencias estén instaladas

## 📱 Uso de la Aplicación

1. **Seleccionar Usuario**: Elige tu perfil al iniciar
2. **Crear Eventos**: Haz clic en cualquier fecha
3. **Ver Eventos**: Los eventos se muestran con colores por usuario
4. **Cambiar Vistas**: Usa los botones Mes/Semana/Día/Lista
5. **Sincronización**: Los cambios se sincronizan automáticamente

## 🎉 ¡Listo!

Tu aplicación CalendarioSync estará disponible como una PWA completa en GitHub Pages con todas las características implementadas.

### Enlaces Útiles

- [Documentación Completa](README.md)
- [Configuración de Firebase](FIREBASE_SETUP.md)
- [Configuración de GitHub Pages](GITHUB_PAGES_SETUP.md)
- [Inicio Rápido](QUICK_START.md)
