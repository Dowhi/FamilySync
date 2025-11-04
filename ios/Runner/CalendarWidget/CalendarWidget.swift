import WidgetKit
import SwiftUI

struct CalendarWidget: Widget {
    let kind: String = "CalendarWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: CalendarProvider()) { entry in
            CalendarWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Calendario Familiar")
        .description("Acceso rápido al calendario familiar")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

struct CalendarProvider: TimelineProvider {
    func placeholder(in context: Context) -> CalendarEntry {
        CalendarEntry(date: Date(), monthName: "NOVIEMBRE", year: "2025")
    }

    func getSnapshot(in context: Context, completion: @escaping (CalendarEntry) -> ()) {
        let entry = CalendarEntry(date: Date(), monthName: getMonthName(), year: getYear())
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        let currentDate = Date()
        let entry = CalendarEntry(date: currentDate, monthName: getMonthName(), year: getYear())
        
        // Actualizar cada hora
        let nextUpdate = Calendar.current.date(byAdding: .hour, value: 1, to: currentDate)!
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
    }
    
    private func getMonthName() -> String {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "es_ES")
        formatter.dateFormat = "MMMM"
        return formatter.string(from: Date()).uppercased()
    }
    
    private func getYear() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy"
        return formatter.string(from: Date())
    }
}

struct CalendarEntry: TimelineEntry {
    let date: Date
    let monthName: String
    let year: String
}

struct CalendarWidgetEntryView: View {
    var entry: CalendarProvider.Entry
    
    var body: some View {
        ZStack {
            // Fondo verde
            Color(red: 0.106, green: 0.369, blue: 0.125) // #1B5E20
            
            VStack(spacing: 8) {
                // Título del mes y año
                VStack(spacing: 4) {
                    Text(entry.monthName)
                        .font(.system(size: 20, weight: .bold))
                        .foregroundColor(.white)
                    
                    Text(entry.year)
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundColor(.white.opacity(0.9))
                }
                
                // Icono de calendario
                Image(systemName: "calendar")
                    .font(.system(size: 40))
                    .foregroundColor(.white.opacity(0.9))
                
                // Texto descriptivo
                Text("Calendario")
                    .font(.system(size: 12, weight: .medium))
                    .foregroundColor(.white.opacity(0.8))
            }
            .padding()
        }
        .widgetURL(URL(string: "calendariofamiliar://calendar"))
    }
}

#Preview(as: .systemSmall) {
    CalendarWidget()
} timeline: {
    CalendarEntry(date: .now, monthName: "NOVIEMBRE", year: "2025")
    CalendarEntry(date: .now, monthName: "DICIEMBRE", year: "2025")
}

