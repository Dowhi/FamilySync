import Flutter
import UIKit

@main
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    GeneratedPluginRegistrant.register(with: self)
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
  
  // Manejar deep links desde el widget
  override func application(
    _ app: UIApplication,
    open url: URL,
    options: [UIApplication.OpenURLOptionsKey : Any] = [:]
  ) -> Bool {
    // Si el URL es del widget, navegar a calendar.html
    if url.scheme == "calendariofamiliar" && url.host == "calendar" {
      // Enviar mensaje a Flutter para navegar al calendario
      if let controller = window?.rootViewController as? FlutterViewController {
        let channel = FlutterMethodChannel(
          name: "com.calendariofamiliar/widget",
          binaryMessenger: controller.binaryMessenger
        )
        channel.invokeMethod("openCalendar", arguments: nil)
      }
      
      // Alternativa: Abrir directamente la URL web si es PWA
      if let webURL = URL(string: "calendar.html") {
        UIApplication.shared.open(webURL)
      }
      
      return true
    }
    return super.application(app, open: url, options: options)
  }
}
