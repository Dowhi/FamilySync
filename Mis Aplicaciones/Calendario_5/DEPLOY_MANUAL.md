# 🚀 Despliegue Manual a GitHub Pages

## ❌ Problema con GitHub Actions

El workflow de GitHub Actions está fallando debido a permisos. Vamos a usar un método de despliegue manual más confiable.

## 📋 Pasos para Desplegar Manualmente

### **Paso 1: Construir la Aplicación**

Ejecuta uno de estos comandos:

```bash
# Opción 1: Script de Node.js
npm run deploy

# Opción 2: Script de PowerShell (Windows)
.\deploy.ps1

# Opción 3: Comando manual
npm run build:github
```

### **Paso 2: Configurar GitHub Pages**

1. **Ve a tu repositorio**: `https://github.com/Dowhi/Calendario_5`
2. **Ve a Settings** > **Pages**
3. **En "Source"**:
   - Selecciona **"Deploy from a branch"**
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
4. **Haz clic en "Save"**

### **Paso 3: Subir el Build a GitHub**

```bash
# Crear rama gh-pages si no existe
git checkout -b gh-pages

# Agregar archivos del build
git add dist/
git commit -m "Deploy to GitHub Pages"

# Subir a GitHub
git push origin gh-pages
```

### **Paso 4: Verificar el Despliegue**

Tu aplicación estará disponible en:
`https://dowhi.github.io/Calendario_5/`

## 🔧 Solución Alternativa: Netlify

Si GitHub Pages sigue dando problemas, puedes usar Netlify:

1. **Ve a [Netlify](https://netlify.com)**
2. **Conecta tu repositorio de GitHub**
3. **Configura el build**:
   - Build command: `npm run build:github`
   - Publish directory: `dist`
4. **Despliega**

## 🎯 Ventajas del Despliegue Manual

- ✅ **Más confiable** que GitHub Actions
- ✅ **Control total** sobre el proceso
- ✅ **Menos problemas** de permisos
- ✅ **Más rápido** para configurar

## 📱 Una vez desplegado

Tu aplicación CalendarioSync estará disponible como una PWA completa con todas las características implementadas.

¡Disfruta tu calendario compartido! 🎉
