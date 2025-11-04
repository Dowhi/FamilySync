# Instrucciones para Integrar Widget en AndroidManifest Existente

Si ya tienes un `AndroidManifest.xml` existente, necesitas agregar estas secciones en lugar de reemplazar el archivo completo.

## Pasos para Integrar

### 1. Agregar el Receiver del Widget

Agrega esto dentro del tag `<application>`:

```xml
<!-- Configuración del widget -->
<receiver android:name=".widget.CalendarWidgetProvider"
    android:exported="true">
    <intent-filter>
        <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
    </intent-filter>
    <meta-data
        android:name="android.appwidget.provider"
        android:resource="@xml/calendar_widget_info" />
</receiver>
```

### 2. Agregar Deep Link al Intent-Filter de MainActivity

Si ya tienes una actividad principal, agrega este intent-filter dentro de la actividad:

```xml
<!-- Deep link para widget -->
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="calendariofamiliar"
          android:host="calendar" />
</intent-filter>
```

### 3. Manejar el Intent en MainActivity

Si tienes un `MainActivity.kt` o `MainActivity.java`, necesitas agregar código para manejar el intent:

**Kotlin:**
```kotlin
import android.content.Intent
import android.os.Bundle
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity: FlutterActivity() {
    private val CHANNEL = "com.calendariofamiliar/widget"
    
    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler { call, result ->
            if (call.method == "openCalendar") {
                // Navegar a calendar.html en Flutter
                // Esto se manejará en el código Dart
                result.success(null)
            } else {
                result.notImplemented()
            }
        }
    }
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Manejar intent cuando se abre desde el widget
        handleIntent(intent)
    }
    
    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        handleIntent(intent)
    }
    
    private fun handleIntent(intent: Intent?) {
        if (intent?.data?.scheme == "calendariofamiliar" && 
            intent.data?.host == "calendar") {
            // Enviar mensaje a Flutter para navegar
            flutterEngine?.dartExecutor?.binaryMessenger?.let { messenger ->
                MethodChannel(messenger, CHANNEL).invokeMethod("openCalendar", null)
            }
        }
    }
}
```

**Java:**
```java
import android.content.Intent;
import android.os.Bundle;
import io.flutter.embedding.android.FlutterActivity;
import io.flutter.embedding.engine.FlutterEngine;
import io.flutter.plugin.common.MethodChannel;

public class MainActivity extends FlutterActivity {
    private static final String CHANNEL = "com.calendariofamiliar/widget";
    
    @Override
    public void configureFlutterEngine(FlutterEngine flutterEngine) {
        super.configureFlutterEngine(flutterEngine);
        
        new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL)
            .setMethodCallHandler((call, result) -> {
                if (call.method.equals("openCalendar")) {
                    // Navegar a calendar.html en Flutter
                    result.success(null);
                } else {
                    result.notImplemented();
                }
            });
    }
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        handleIntent(getIntent());
    }
    
    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleIntent(intent);
    }
    
    private void handleIntent(Intent intent) {
        if (intent != null && intent.getData() != null) {
            String scheme = intent.getData().getScheme();
            String host = intent.getData().getHost();
            
            if ("calendariofamiliar".equals(scheme) && "calendar".equals(host)) {
                FlutterEngine engine = getFlutterEngine();
                if (engine != null) {
                    new MethodChannel(engine.getDartExecutor().getBinaryMessenger(), CHANNEL)
                        .invokeMethod("openCalendar", null);
                }
            }
        }
    }
}
```

### 4. Manejar en Flutter (Dart)

En tu código Dart, agrega un listener para el método channel:

```dart
import 'package:flutter/services.dart';

class WidgetHandler {
  static const MethodChannel _channel = MethodChannel('com.calendariofamiliar/widget');
  
  static void init() {
    _channel.setMethodCallHandler((call) async {
      if (call.method == 'openCalendar') {
        // Navegar a calendar.html o a la ruta del calendario
        // Ejemplo con go_router:
        // context.go('/calendar');
        // O si es web:
        // window.location.href = 'calendar.html';
      }
    });
  }
}
```

Luego llama a `WidgetHandler.init()` en tu `main()` o en `initState()` de tu widget principal.

## Verificación

1. Compila la app: `flutter build apk`
2. Instala en un dispositivo Android
3. Agrega el widget a la pantalla de inicio
4. Toca el widget - debería abrir la app y navegar al calendario

