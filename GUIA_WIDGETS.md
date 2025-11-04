# Guía de Implementación de Widgets para Calendario Familiar

Esta guía explica cómo se han implementado los widgets nativos para Android e iOS que permiten acceso rápido al calendario desde la pantalla de inicio.

## 📱 Widgets Implementados

### iOS Widget (WidgetKit)
- **Ubicación**: `ios/Runner/CalendarWidget/`
- **Archivos**:
  - `CalendarWidget.swift` - Widget principal
  - `CalendarWidgetBundle.swift` - Bundle del widget

### Android Widget (App Widget)
- **Ubicación**: `android/app/src/main/`
- **Archivos**:
  - `java/com/calendariofamiliar/widget/CalendarWidgetProvider.kt` - Proveedor del widget
  - `res/layout/calendar_widget.xml` - Diseño del widget
  - `res/xml/calendar_widget_info.xml` - Configuración del widget

## 🎨 Diseño del Widget

El widget muestra:
- **Fondo**: Verde oscuro (#1B5E20) - color de la app
- **Mes actual**: En mayúsculas (ej: "NOVIEMBRE")
- **Año actual**: Debajo del mes
- **Icono**: Icono de calendario
- **Texto**: "Calendario"

## 🔗 Funcionalidad

Al tocar el widget:
1. **iOS**: Abre la app usando el deep link `calendariofamiliar://calendar`
2. **Android**: Abre la actividad principal con intent hacia `calendar.html`

## 📋 Pasos para Compilar y Usar

### iOS

1. **Abrir el proyecto en Xcode**:
   ```bash
   open ios/Runner.xcworkspace
   ```

2. **Agregar el Widget Extension**:
   - En Xcode, selecciona File → New → Target
   - Elige "Widget Extension"
   - Nombre: "CalendarWidget"
   - Idioma: Swift
   - **IMPORTANTE**: Reemplaza los archivos generados con los archivos creados en `ios/Runner/CalendarWidget/`

3. **Configurar el Widget**:
   - Asegúrate de que el target "CalendarWidget" esté incluido en el workspace
   - Verifica que el Bundle Identifier sea: `com.calendariofamiliar.CalendarWidget`

4. **Compilar**:
   ```bash
   flutter build ios
   ```

5. **Agregar el widget a la pantalla de inicio**:
   - Mantén presionada la pantalla de inicio
   - Toca el botón "+" en la esquina superior izquierda
   - Busca "Calendario Familiar"
   - Selecciona el tamaño del widget
   - Toca "Agregar Widget"

### Android

1. **Verificar estructura**:
   Asegúrate de que la estructura de carpetas existe:
   ```
   android/app/src/main/
   ├── java/com/calendariofamiliar/widget/
   │   └── CalendarWidgetProvider.kt
   ├── res/
   │   ├── layout/
   │   │   └── calendar_widget.xml
   │   ├── xml/
   │   │   └── calendar_widget_info.xml
   │   └── values/
   │       └── strings.xml
   └── AndroidManifest.xml
   ```

2. **Compilar**:
   ```bash
   flutter build apk
   # o
   flutter build appbundle
   ```

3. **Agregar el widget a la pantalla de inicio**:
   - Mantén presionada la pantalla de inicio
   - Selecciona "Widgets"
   - Busca "Calendario Familiar"
   - Arrastra el widget a la pantalla de inicio

## 🔧 Configuración Adicional

### Deep Linking en iOS

El widget usa el URL scheme `calendariofamiliar://calendar` que está configurado en:
- `Info.plist` - CFBundleURLTypes
- `AppDelegate.swift` - Manejo de deep links

### Deep Linking en Android

El widget usa intents que abren la actividad principal con el extra `url: "calendar.html"`.

### Actualizar el Widget Manualmente

**iOS**: El widget se actualiza automáticamente cada hora.

**Android**: El widget se actualiza cada hora (`updatePeriodMillis="3600000"`).

Para actualizar manualmente:
- iOS: Mantén presionado el widget → "Actualizar Widget"
- Android: El sistema lo actualiza automáticamente

## 🐛 Solución de Problemas

### iOS

**Problema**: El widget no aparece en la lista de widgets disponibles.
- **Solución**: Verifica que el target "CalendarWidget" esté incluido en el build scheme.

**Problema**: El widget no abre la app al tocarlo.
- **Solución**: Verifica que el URL scheme esté configurado correctamente en `Info.plist`.

### Android

**Problema**: El widget no aparece después de compilar.
- **Solución**: Verifica que el `AndroidManifest.xml` incluya la configuración del receiver.

**Problema**: El widget no abre calendar.html.
- **Solución**: Verifica que la actividad principal maneje el intent correctamente. Puede que necesites modificar `MainActivity.kt` para manejar el intent.

## 📝 Notas Importantes

1. **Para Flutter Web (PWA)**: Si la app es principalmente web, los widgets pueden necesitar ajustes adicionales para abrir la URL web correcta.

2. **Personalización**: Puedes modificar los colores, tamaños y diseño en:
   - iOS: `CalendarWidget.swift` (línea del Color y diseño)
   - Android: `calendar_widget.xml` (colores y diseño)

3. **Tamaños de Widget**:
   - iOS: Soporta systemSmall y systemMedium
   - Android: Tamaño mínimo 110dp x 110dp, redimensionable

## 🚀 Próximos Pasos

Para mejorar los widgets en el futuro:
- Mostrar eventos del día actual
- Mostrar mini calendario del mes
- Actualizar en tiempo real cuando cambia el mes
- Soporte para diferentes tamaños de widget

