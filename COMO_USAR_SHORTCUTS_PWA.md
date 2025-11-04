# 📱 Cómo Usar los Shortcuts (Accesos Rápidos) en tu PWA

Como tu aplicación es una **PWA (Progressive Web App)**, los widgets nativos no están disponibles directamente. Sin embargo, ya tienes **App Shortcuts** configurados que funcionan de manera similar.

---

## 🍎 **En iOS (iPhone/iPad)**

### Paso 1: Verificar que la PWA esté instalada
1. Busca el icono de "Calendario Familiar" en tu pantalla de inicio
2. Si no está, instálalo:
   - Abre Safari
   - Ve a tu app
   - Toca el botón de compartir (cuadrado con flecha ↑)
   - Selecciona "Añadir a pantalla de inicio"

### Paso 2: Usar los Shortcuts
1. **Mantén presionado** el icono de "Calendario Familiar" en la pantalla de inicio
2. **Aparecerá un menú** con el shortcut "Calendario"
3. **Toca "Calendario"** para abrir directamente el calendario

### Paso 3: Agregar Shortcut a la pantalla (iOS 14+)
1. Mantén presionado el icono de la app
2. En el menú, **mantén presionado** el shortcut "Calendario"
3. Selecciona **"Añadir a pantalla de inicio"**
4. Ahora tendrás un acceso directo al calendario en tu pantalla de inicio

---

## 🤖 **En Android**

### Paso 1: Verificar que la PWA esté instalada
1. Busca el icono de "Calendario Familiar" en tu pantalla de inicio
2. Si no está, instálalo:
   - Abre Chrome
   - Ve a tu app
   - Toca el menú (3 puntos) → "Instalar app" o "Añadir a pantalla de inicio"

### Paso 2: Usar los Shortcuts
1. **Mantén presionado** el icono de "Calendario Familiar"
2. **Aparecerán los shortcuts** disponibles
3. **Toca "Calendario"** para abrir directamente

### Paso 3: Agregar Shortcut a la pantalla
1. Mantén presionado el icono de la app
2. **Mantén presionado** el shortcut "Calendario"
3. **Arrástralo** a la pantalla de inicio
4. Suelta para crear un acceso directo

---

## ❓ **¿Por qué no aparecen los widgets nativos?**

Los widgets nativos (como los que creamos) **solo funcionan en aplicaciones nativas compiladas**, no en PWAs. Para que funcionen necesitarías:

1. **Compilar la app nativa** con Flutter
2. **Configurar el Widget Extension** en Xcode (iOS)
3. **Configurar el App Widget** en Android Studio (Android)
4. **Instalar la app compilada** en tu dispositivo

---

## ✅ **Alternativa: Widget Web Personalizado**

Si quieres algo más visual en la pantalla de inicio, puedo crear un **widget web HTML** que muestre información del calendario y que puedas agregar como acceso directo.

Este widget mostraría:
- Mes y año actual
- Próximos eventos
- Diseño similar a un widget nativo

¿Quieres que cree este widget web?

---

## 🔍 **Verificación Rápida**

### Para verificar que los shortcuts funcionan:

**iOS:**
1. Mantén presionado el icono de la app
2. ¿Aparece "Calendario" en el menú? → ✅ Funciona
3. ¿No aparece nada? → ❌ Necesitas reinstalar la PWA

**Android:**
1. Mantén presionado el icono de la app
2. ¿Aparece "Calendario" en el menú? → ✅ Funciona
3. ¿No aparece nada? → ❌ Necesitas reinstalar la PWA

---

## 📞 **Siguiente Paso**

**¿Qué prefieres?**

1. **Usar los shortcuts** (ya funcionan, solo necesitas saber cómo usarlos)
2. **Crear un widget web** personalizado (más visual, se agrega como acceso directo)
3. **Compilar app nativa** para tener widgets nativos reales (más trabajo, pero widgets nativos)

Dime qué opción prefieres y te ayudo a implementarla.

