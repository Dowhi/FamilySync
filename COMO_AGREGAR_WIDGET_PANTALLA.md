# 📱 Cómo Agregar el Widget a la Pantalla de Inicio

Guía detallada paso a paso para agregar el widget del Calendario Familiar a la pantalla de inicio en Android e iOS.

---

## 🍎 iOS (iPhone/iPad)

### Método 1: Desde la Pantalla de Inicio (iOS 14+)

#### Paso 1: Entrar en Modo Edición
1. **Desbloquea tu iPhone/iPad**
2. **Navega a la pantalla de inicio** donde quieres agregar el widget
3. **Mantén presionada** cualquier área vacía de la pantalla de inicio
4. Cuando los iconos empiecen a "bailar" (modo edición), suelta el dedo

#### Paso 2: Agregar Widget
1. En la esquina **superior izquierda**, verás un botón **"+"** (más)
2. **Toca el botón "+"**
3. Se abrirá la **galería de widgets** de iOS

#### Paso 3: Buscar el Widget
1. En la parte superior hay una **barra de búsqueda** - escribe: **"Calendario Familiar"**
2. O desplázate hacia abajo en la lista de widgets hasta encontrar **"Calendario Familiar"**
3. También puedes buscar por categoría: **Productividad** o **Utilidades**

#### Paso 4: Seleccionar Tamaño
1. Una vez que encuentres el widget, verás **diferentes tamaños disponibles**:
   - **Pequeño** (Small) - 2x2 iconos
   - **Mediano** (Medium) - 4x2 iconos
2. **Desliza** entre los tamaños para ver una vista previa
3. **Selecciona el tamaño** que prefieras tocando en él

#### Paso 5: Agregar a la Pantalla
1. **Toca el botón "Agregar Widget"** en la parte inferior
2. El widget aparecerá en la pantalla de inicio
3. Puedes **arrastrarlo** a la posición que desees
4. **Presiona "Listo"** en la esquina superior derecha para salir del modo edición

### Método 2: Desde la Biblioteca de Widgets

#### Paso 1: Acceder a la Biblioteca
1. **Desliza hacia la derecha** desde la primera pantalla de inicio
2. Llegarás a la **pantalla de widgets** (Today View)
3. **Desliza hasta el final** de esta pantalla
4. **Toca "Editar"** en la parte inferior

#### Paso 2: Agregar Widget
1. **Toca el botón "+"** en la esquina superior izquierda
2. Busca **"Calendario Familiar"**
3. Selecciona el tamaño y toca **"Agregar Widget"**

---

## 🤖 Android

### Método 1: Desde la Pantalla de Inicio (Launcher)

#### Paso 1: Entrar en Modo Edición
1. **Desbloquea tu dispositivo Android**
2. **Navega a la pantalla de inicio** donde quieres agregar el widget
3. **Mantén presionada** cualquier área vacía de la pantalla (sin iconos)
4. Después de 1-2 segundos, aparecerá un **menú contextual**

#### Paso 2: Acceder a Widgets
1. En el menú que aparece, busca y **toca "Widgets"** o **"Widgets"**
   - El texto exacto puede variar según el launcher:
     - **Samsung**: "Widgets"
     - **Google Pixel**: "Widgets"
     - **Xiaomi**: "Widgets" o "Widgets"
     - **Otros**: Puede ser un icono de "cuadrícula" o "más"

#### Paso 3: Buscar el Widget
1. Se abrirá la **lista de widgets disponibles**
2. **Desplázate** hacia abajo o usa la barra de búsqueda
3. Busca **"Calendario Familiar"** o el nombre de tu app
4. El widget puede aparecer agrupado con otros widgets de la app

#### Paso 4: Seleccionar y Colocar
1. **Mantén presionado** el widget "Calendario Familiar"
2. El widget se "pegara" a tu dedo
3. **Arrastra** el widget a la pantalla de inicio
4. **Mueve** el widget a la posición deseada
5. **Suelta** el dedo para colocarlo

#### Paso 5: Ajustar Tamaño (Opcional)
1. Algunos launchers permiten **redimensionar** el widget:
   - **Mantén presionado** el widget ya colocado
   - Si aparece un **borde azul** con puntos, puedes **arrastrar las esquinas** para cambiar el tamaño
   - En algunos launchers, aparece un menú con opciones de tamaño

### Método 2: Desde el Menú de Aplicaciones

#### Paso 1: Abrir Menú de Apps
1. **Toca el icono** de todas las aplicaciones (normalmente en la parte inferior central)
2. O **desliza hacia arriba** desde la parte inferior de la pantalla

#### Paso 2: Acceder a Widgets
1. En el menú de aplicaciones, busca la pestaña o sección **"Widgets"**
2. O busca **"Calendario Familiar"** en la lista de apps
3. Si encuentras la app, **mantén presionada** y aparecerán opciones, incluyendo widgets

### Método 3: Desde Configuración del Launcher

#### Para Launchers Personalizados (Nova, Action, etc.):
1. **Mantén presionada** la pantalla de inicio
2. Selecciona **"Widgets"** o **"Agregar"**
3. Busca **"Calendario Familiar"**
4. Arrastra a la pantalla

---

## 🔍 Solución de Problemas

### iOS: "No encuentro el widget"

**Problema**: El widget no aparece en la lista de widgets disponibles.

**Soluciones**:
1. **Verifica que la app esté instalada**:
   - Busca el icono de "Calendario Familiar" en la pantalla de inicio
   - Si no está, instala la app primero

2. **Reinicia el dispositivo**:
   - Mantén presionado el botón de encendido + volumen bajo hasta que aparezca el slider
   - Apaga y vuelve a encender

3. **Verifica que el widget esté habilitado**:
   - Ve a Configuración → Pantalla de inicio y Dock
   - Asegúrate de que los widgets estén habilitados

4. **Recompila la app**:
   - Si desarrollaste la app, asegúrate de que el widget extension esté incluido en el build
   - Abre Xcode y verifica que el target "CalendarWidget" esté seleccionado

### Android: "No encuentro el widget"

**Problema**: El widget no aparece en la lista de widgets.

**Soluciones**:
1. **Verifica que la app esté instalada**:
   - Ve a Configuración → Aplicaciones
   - Busca "Calendario Familiar"
   - Si no está, instala la app primero

2. **Reinicia el launcher**:
   - Ve a Configuración → Aplicaciones → [Tu Launcher] → Forzar Detención
   - O simplemente reinicia el dispositivo

3. **Verifica permisos**:
   - Algunos launchers requieren permisos especiales
   - Ve a Configuración → Aplicaciones → [Tu Launcher] → Permisos

4. **Limpia la caché**:
   - Ve a Configuración → Aplicaciones → [Tu Launcher] → Almacenamiento → Limpiar Caché

5. **Recompila la app**:
   - Si desarrollaste la app, verifica que el widget esté configurado en AndroidManifest.xml
   - Ejecuta: `flutter clean` y luego `flutter build apk`

### El widget no se puede mover

**iOS**:
- Asegúrate de estar en modo edición (iconos bailando)
- Mantén presionado el widget y arrastra

**Android**:
- Algunos launchers bloquean ciertas áreas (como el dock)
- Intenta moverlo a otra área de la pantalla
- Verifica que no haya restricciones de accesibilidad activadas

### El widget no abre la app

**iOS**:
1. Verifica que el URL scheme esté configurado en Info.plist
2. Verifica que AppDelegate maneje el deep link correctamente
3. Reinstala la app

**Android**:
1. Verifica que el AndroidManifest.xml tenga el intent-filter configurado
2. Verifica que MainActivity maneje el intent
3. Reinstala la app

---

## 📐 Tamaños de Widget Disponibles

### iOS
- **Small (Pequeño)**: 2x2 iconos - Muestra mes, año e icono
- **Medium (Mediano)**: 4x2 iconos - Muestra más información

### Android
- **Tamaño mínimo**: 110dp x 110dp (2x2 iconos aproximadamente)
- **Redimensionable**: Sí, dependiendo del launcher

---

## 🎨 Personalización

### Cambiar Posición
- **iOS**: Mantén presionado el widget → Arrastra → Suelta
- **Android**: Mantén presionado el widget → Arrastra → Suelta

### Eliminar Widget
- **iOS**: Mantén presionado el widget → Toca "Quitar Widget" → "Quitar"
- **Android**: Mantén presionado el widget → Arrastra a "Eliminar" o "Papelera" (arriba)

### Actualizar Widget
- **iOS**: Mantén presionado el widget → "Editar Widget" → Cambiar opciones
- **Android**: El widget se actualiza automáticamente cada hora

---

## ✅ Verificación

Después de agregar el widget, verifica que:

1. ✅ El widget aparece en la pantalla de inicio
2. ✅ Muestra el mes y año correctos
3. ✅ Al tocarlo, abre la app
4. ✅ La app navega a calendar.html (o a la pantalla del calendario)

---

## 📞 Ayuda Adicional

Si después de seguir estos pasos el widget no aparece o no funciona:

1. **Verifica la documentación técnica**:
   - `GUIA_WIDGETS.md` - Información técnica de implementación
   - `INSTRUCCIONES_WIDGET_ANDROID.md` - Instrucciones para desarrolladores

2. **Revisa los logs**:
   - iOS: Xcode → Window → Devices and Simulators → Ver logs
   - Android: `adb logcat | grep CalendarWidget`

3. **Contacta al equipo de desarrollo** con:
   - Versión del sistema operativo
   - Versión de la app
   - Pasos que seguiste
   - Capturas de pantalla del problema

---

## 🎯 Resumen Rápido

### iOS
```
Pantalla de inicio → Mantén presionado → Botón "+" → Buscar "Calendario Familiar" → Seleccionar tamaño → Agregar Widget → Listo
```

### Android
```
Pantalla de inicio → Mantén presionado → Widgets → Buscar "Calendario Familiar" → Arrastrar a pantalla → Soltar
```

¡Listo! Ya tienes el widget en tu pantalla de inicio. 🎉

