package com.calendariofamiliar.widget

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import java.text.SimpleDateFormat
import java.util.*

class CalendarWidgetProvider : AppWidgetProvider() {
    
    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (appWidgetId in appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }
    
    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)
        if (intent.action == AppWidgetManager.ACTION_APPWIDGET_UPDATE) {
            val appWidgetManager = AppWidgetManager.getInstance(context)
            val appWidgetIds = appWidgetManager.getAppWidgetIds(
                android.content.ComponentName(context, CalendarWidgetProvider::class.java)
            )
            onUpdate(context, appWidgetManager, appWidgetIds)
        }
    }
    
    private fun updateAppWidget(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetId: Int
    ) {
        // Obtener mes y año actual
        val calendar = Calendar.getInstance()
        val monthFormatter = SimpleDateFormat("MMMM", Locale("es", "ES"))
        val yearFormatter = SimpleDateFormat("yyyy", Locale.getDefault())
        
        val monthName = monthFormatter.format(calendar.time).uppercase()
        val year = yearFormatter.format(calendar.time)
        
        // Crear la vista del widget
        val views = RemoteViews(context.packageName, R.layout.calendar_widget)
        
        // Establecer el texto del mes y año
        views.setTextViewText(R.id.widget_month_text, monthName)
        views.setTextViewText(R.id.widget_year_text, year)
        
        // Crear intent para abrir calendar.html
        val intent = Intent(Intent.ACTION_VIEW).apply {
            // Si la app es PWA, usar el intent de la app
            setClassName(context, "com.calendariofamiliar.MainActivity")
            putExtra("url", "calendar.html")
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
        }
        
        // Intent alternativo para abrir URL web
        val webIntent = Intent(Intent.ACTION_VIEW).apply {
            data = android.net.Uri.parse("https://tu-dominio.com/calendar.html")
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
        }
        
        // Usar PendingIntent para abrir la app
        val pendingIntent = PendingIntent.getActivity(
            context,
            0,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        
        // Asignar el click listener
        views.setOnClickPendingIntent(R.id.widget_container, pendingIntent)
        
        // Actualizar el widget
        appWidgetManager.updateAppWidget(appWidgetId, views)
    }
}

