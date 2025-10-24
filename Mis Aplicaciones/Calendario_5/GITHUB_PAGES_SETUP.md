# 🚀 Configuración para GitHub Pages

## Pasos para Desplegar en GitHub Pages

### 1. Preparar el Repositorio

1. **Crea un repositorio en GitHub**:
   - Ve a [GitHub](https://github.com)
   - Crea un nuevo repositorio llamado `Calendario_5`
   - Hazlo público para GitHub Pages

2. **Sube tu código**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/Calendario_5.git
   git push -u origin main
   ```

### 2. Configurar GitHub Pages

1. **Ve a la configuración del repositorio**:
   - En tu repositorio, ve a `Settings` > `Pages`

2. **Configura la fuente**:
   - En `Source`, selecciona `GitHub Actions`
   - Esto permitirá el despliegue automático

### 3. Configurar Firebase para Producción

1. **Actualiza la configuración de Firebase**:
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Selecciona tu proyecto
   - Ve a `Settings` > `General`
   - En `Your apps`, agrega una nueva app web
   - Usa el dominio de GitHub Pages como dominio autorizado

2. **Actualiza las reglas de Firestore**:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /events/{document} {
         allow read, write: if true; // Para desarrollo
       }
     }
   }
   ```

### 4. Configurar Variables de Entorno

1. **Crea un archivo `.env`** en la raíz del proyecto:
   ```env
   VITE_FIREBASE_API_KEY=tu-api-key
   VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
   VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=tu-app-id
   ```

2. **Actualiza `src/firebase/config.ts`**:
   ```typescript
   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
     appId: import.meta.env.VITE_FIREBASE_APP_ID
   };
   ```

### 5. Despliegue Automático

El workflow de GitHub Actions se ejecutará automáticamente cuando:
- Hagas push a la rama `main` o `master`
- Se cree un pull request

### 6. Verificar el Despliegue

1. **Espera a que termine el workflow**:
   - Ve a la pestaña `Actions` en tu repositorio
   - Verifica que el workflow se ejecute correctamente

2. **Accede a tu aplicación**:
   - Tu aplicación estará disponible en:
   - `https://TU_USUARIO.github.io/Calendario_5/`

## 🔧 Configuración Adicional

### Dominio Personalizado (Opcional)

Si tienes un dominio personalizado:

1. **Crea un archivo `CNAME`** en la carpeta `public`:
   ```
   tu-dominio.com
   ```

2. **Actualiza el workflow**:
   ```yaml
   with:
     github_token: ${{ secrets.GITHUB_TOKEN }}
     publish_dir: ./dist
     cname: tu-dominio.com
   ```

### Configuración de Firebase Hosting (Alternativa)

Si prefieres usar Firebase Hosting:

1. **Instala Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Inicializa Firebase**:
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configura el build**:
   ```bash
   npm run build
   firebase deploy
   ```

## 🐛 Solución de Problemas

### Error: "404 Not Found"
- Verifica que el repositorio sea público
- Asegúrate de que GitHub Pages esté habilitado
- Verifica que el workflow se haya ejecutado correctamente

### Error: "Firebase not initialized"
- Verifica que las variables de entorno estén configuradas
- Asegúrate de que Firebase esté configurado correctamente

### Error: "Build failed"
- Verifica que todas las dependencias estén instaladas
- Revisa los logs del workflow en GitHub Actions

## 📱 Acceso Móvil

Una vez desplegado, la aplicación será:
- **Instalable** como PWA en dispositivos móviles
- **Accesible** desde cualquier navegador
- **Sincronizada** en tiempo real entre dispositivos

## 🎉 ¡Listo!

Tu aplicación CalendarioSync estará disponible en GitHub Pages y funcionará como una PWA completa con todas las características implementadas.
