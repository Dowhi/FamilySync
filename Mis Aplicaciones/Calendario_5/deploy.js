#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Desplegando CalendarioSync a GitHub Pages...');

try {
  // Build para GitHub Pages
  console.log('📦 Construyendo la aplicación...');
  execSync('npm run build:github', { stdio: 'inherit' });

  // Crear directorio dist si no existe
  if (!fs.existsSync('dist')) {
    console.log('❌ Error: Directorio dist no encontrado');
    process.exit(1);
  }

  // Crear archivo .nojekyll para GitHub Pages
  fs.writeFileSync('dist/.nojekyll', '');

  // Crear archivo CNAME si existe
  if (fs.existsSync('public/CNAME')) {
    fs.copyFileSync('public/CNAME', 'dist/CNAME');
  }

  console.log('✅ Build completado exitosamente!');
  console.log('');
  console.log('📋 Pasos siguientes:');
  console.log('1. Ve a tu repositorio en GitHub');
  console.log('2. Ve a Settings > Pages');
  console.log('3. En "Source", selecciona "Deploy from a branch"');
  console.log('4. Selecciona la rama "gh-pages" y la carpeta "/ (root)"');
  console.log('5. Haz clic en "Save"');
  console.log('');
  console.log('🌐 Tu aplicación estará disponible en:');
  console.log('https://dowhi.github.io/Calendario_5/');

} catch (error) {
  console.error('❌ Error durante el despliegue:', error.message);
  process.exit(1);
}
