import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:calendario_familiar/core/firebase/firebase_options.dart';
import 'package:calendario_familiar/routing/app_router.dart';
import 'package:calendario_familiar/theme/app_theme.dart';
import 'package:calendario_familiar/core/services/time_service.dart';
import 'package:calendario_familiar/core/services/notification_service.dart';
import 'package:calendario_familiar/core/services/alarm_service.dart';
import 'package:calendario_familiar/core/providers/theme_provider.dart';
import 'package:calendario_familiar/core/providers/current_user_provider.dart';
import 'package:go_router/go_router.dart';

void main(List<String> args) async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Forzar nuevo despliegue - versión sin login
  
  // Forzar recompilación para eliminar pantalla de login
  
  // Inicializar Firebase INMEDIATAMENTE para web
  try {
    if (Firebase.apps.isEmpty) {
      await Firebase.initializeApp(
        options: DefaultFirebaseOptions.currentPlatform,
      );
      print('✅ Firebase inicializado correctamente');
    } else {
      print('ℹ️ Firebase ya estaba inicializado');
    }
  } catch (e) {
    print('❌ Error inicializando Firebase: $e');
  }
  
  // Procesar argumentos si venimos desde AlarmActivity
  if (args.isNotEmpty) {
    for (final arg in args) {
      print('🔔 Argumento recibido: $arg');
      if (arg.startsWith('--route=')) {
        final route = arg.substring(8); // Quitar "--route="
        print('🔔 Ruta recibida: $route');
        
        // Parsear query parameters
        final uri = Uri.parse(route);
        if (uri.path == '/alarm' && uri.queryParameters.isNotEmpty) {
          initialAlarmData = uri.queryParameters;
          openedFromNotification = true;
          print('🔔 initialAlarmData establecido desde args: $initialAlarmData');
        }
      }
    }
  }

  // Inicializar AlarmService temprano (requerido por android_alarm_manager_plus)
  try {
    await AlarmService.initialize();
    print('✅ AlarmService inicializado temprano');
  } catch (e) {
    print('❌ Error inicializando AlarmService temprano: $e');
  }

  // Arrancar la UI
  final container = ProviderContainer();
  
  // 🔹 Establecer el listener para actualizar el userId en NotificationService cuando cambie
  container.listen<int>(
    currentUserIdProvider,
    (previous, next) {
      NotificationService.setCurrentUserId(next);
      print('🔔 UserId actualizado en NotificationService: $next');
    },
    fireImmediately: true,
  );
  
  runApp(UncontrolledProviderScope(container: container, child: const CalendarioFamiliarApp()));

  // Inicialización diferida para servicios no críticos
  Future(() async {

    try {
      if (!kIsWeb) {
        await TimeService.initialize();
        print('✅ TimeService inicializado');

        await NotificationService.initialize(
          onSelectNotification: (payload) async {
            if (payload == null) return;
            print('🔔 Payload recibido en main: $payload');
            if (payload.startsWith('alarm|')) {
              // NO navegar automáticamente a la pantalla de alarma
              // ya que ahora usamos AlarmActivity nativa independiente
              print('🔔 Notificación de alarma tocada - AlarmActivity nativa ya se mostró');
              print('🔔 NO navegando a /alarm para evitar conflictos');
            }
          },
        );
        print('✅ NotificationService inicializado');

        await AlarmService.initialize();
        print('✅ AlarmService inicializado');

        // Solicitar permisos de notificación
        final hasPermissions = await NotificationService.areNotificationsEnabled();
        if (!hasPermissions) {
          final granted = await NotificationService.requestPermissions();
          print(granted ? '✅ Permisos concedidos' : '❌ Permisos denegados');
        }

        // Manejar arranque desde notificación cuando la app estaba terminada
        final launch = await NotificationService.getNotificationAppLaunchDetails();
        final launched = launch?.didNotificationLaunchApp ?? false;
        if (launched) {
          final payload = launch!.notificationResponse?.payload;
          if (payload != null && payload.startsWith('alarm|')) {
            final parts = payload.split('|');
            final data = <String, String>{};
            for (final p in parts.skip(1)) {
              final i = p.indexOf('=');
              if (i > 0) {
                data[p.substring(0, i)] = Uri.decodeComponent(p.substring(i + 1));
              }
            }
            initialAlarmData = data;
            openedFromNotification = true;
            if (navigatorKey.currentState != null && navigatorKey.currentState!.context.mounted) {
              navigatorKey.currentState!.context.go(Uri(path: '/alarm', queryParameters: data).toString());
            }
          }
        }
        // iOS maneja las notificaciones de manera diferente
        // Las notificaciones se manejan a través del sistema nativo de iOS
      } else {
        print('ℹ️ Servicios de notificaciones locales no disponibles en web');
      }
    } catch (e) {
      print('❌ Error inicializando servicios base: $e');
    }
  });
}


class CalendarioFamiliarApp extends ConsumerWidget {
  const CalendarioFamiliarApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDarkMode = ref.watch(themeProvider);
    
    return MaterialApp.router(
      title: 'Calendario Familiar',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: isDarkMode ? ThemeMode.dark : ThemeMode.light,
      routerConfig: appRouter,
      debugShowCheckedModeBanner: false,
    );
  }
}