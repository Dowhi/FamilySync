// Service Worker para manejar alarmas en segundo plano
const CACHE_NAME = 'alarm-cache-v1';

// Instalar Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker instalado para alarmas');
    self.skipWaiting(); // Activar inmediatamente
});

// Activar Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker activado para alarmas');
    event.waitUntil(
        Promise.all([
            self.clients.claim(),
            // Limpiar alarmas antiguas
            clearOldAlarms()
        ])
    );
});

// Limpiar alarmas pasadas
function clearOldAlarms() {
    const now = Date.now();
    scheduledAlarms.forEach((timeoutId, alarmId) => {
        // Las alarmas pasadas serán eliminadas automáticamente cuando se ejecuten
        // O podemos verificar aquí si son muy antiguas
    });
}

// Manejar notificaciones
self.addEventListener('notificationclick', (event) => {
    console.log('Notificación clickeada:', event.notification.tag);
    event.notification.close();
    
    // Obtener datos de la notificación
    const data = event.notification.data || {};
    const alarmUrl = data.url || '/alarm-notification.html';
    
    // Abrir o enfocar la ventana de la alarma
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // Buscar si ya hay una ventana abierta con la página de alarma
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url.includes('alarm-notification.html') && 'focus' in client) {
                    return client.focus();
                }
            }
            
            // Si no hay ventana abierta, abrir una nueva
            if (clients.openWindow) {
                return clients.openWindow(data.url || alarmUrl);
            }
        })
    );
});

// Sincronización periódica para verificar alarmas
self.addEventListener('sync', (event) => {
    if (event.tag === 'check-alarms') {
        event.waitUntil(checkAlarmsFromSW());
    }
});

// Verificar alarmas desde el Service Worker
async function checkAlarmsFromSW() {
    try {
        // Obtener la fecha actual y próximos 7 días
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const alarmsToCheck = [];
        
        // Verificar alarmas de hoy y próximos 7 días
        for (let i = 0; i < 7; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() + i);
            const dateStr = checkDate.toISOString().split('T')[0];
            
            // Nota: Necesitamos acceso a Firebase desde el SW
            // Por ahora, esto se manejará desde la página principal
        }
        
        // Mostrar notificaciones para alarmas activas
        const now = new Date();
        const currentTime = now.getTime();
        
        // Esto se completará con la lógica de Firebase desde la página principal
    } catch (error) {
        console.error('Error verificando alarmas en SW:', error);
    }
}

// Almacenar alarmas programadas
const scheduledAlarms = new Map();


// Escuchar mensajes de la página principal
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SCHEDULE_ALARM') {
        const { alarmDate, alarmTime, noteText, userName, alarmId } = event.data;
        
        // Calcular tiempo hasta la alarma
        const alarmDateTime = new Date(`${alarmDate}T${alarmTime}`);
        const now = new Date();
        const timeUntilAlarm = alarmDateTime.getTime() - now.getTime();
        
        if (timeUntilAlarm > 0 && timeUntilAlarm <= 30 * 24 * 60 * 60 * 1000) {
            // Cancelar alarma anterior si existe
            if (scheduledAlarms.has(alarmId)) {
                clearTimeout(scheduledAlarms.get(alarmId));
            }
            
            // Programar notificación y apertura de página
            const timeoutId = setTimeout(async () => {
                const params = new URLSearchParams({
                    date: alarmDate,
                    time: alarmTime,
                    note: encodeURIComponent(noteText || ''),
                    user: encodeURIComponent(userName || 'Usuario')
                });
                
                const alarmUrl = `alarm-notification.html?${params.toString()}`;
                
                // Intentar mostrar notificación si hay permiso
                // Nota: Los Service Workers no pueden verificar Notification.permission directamente
                // Intentamos mostrar la notificación y si falla por falta de permiso, simplemente continuamos
                try {
                    await self.registration.showNotification('🔔 Recordatorio', {
                        body: `Tienes una alarma programada`,
                        icon: './icons/Icon-192.png',
                        badge: './icons/Icon-192.png',
                        tag: `alarm-${alarmId}`,
                        requireInteraction: true,
                        vibrate: [200, 100, 200, 100, 200],
                        data: {
                            url: alarmUrl,
                            alarmId: alarmId,
                            date: alarmDate,
                            time: alarmTime,
                            note: noteText,
                            user: userName
                        }
                    });
                } catch (error) {
                    // Si no hay permiso o falla la notificación, simplemente continuamos
                    // La página de alarma se abrirá de todas formas
                    console.log('Notificación no disponible (permiso requerido):', error.message);
                }
                
                // Siempre intentar abrir la página de alarma
                try {
                    const clientList = await clients.matchAll({ type: 'window', includeUncontrolled: true });
                    
                    // Intentar abrir en una ventana nueva
                    const openedWindow = await clients.openWindow(alarmUrl);
                    
                    // Si no se pudo abrir, intentar enfocar una ventana existente
                    if (!openedWindow && clientList.length > 0) {
                        // Buscar si hay una ventana de calendario abierta
                        for (const client of clientList) {
                            if (client.url.includes('calendar.html') || client.url.includes('alarm-notification.html')) {
                                await client.focus();
                                // Enviar mensaje para que abra la página de alarma
                                client.postMessage({
                                    type: 'OPEN_ALARM',
                                    url: alarmUrl
                                });
                                break;
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error abriendo página de alarma:', error);
                }
                
                scheduledAlarms.delete(alarmId);
            }, timeUntilAlarm);
            
            scheduledAlarms.set(alarmId, timeoutId);
            console.log(`Alarma programada: ${alarmId} en ${Math.round(timeUntilAlarm / 1000)} segundos`);
        }
    } else if (event.data && event.data.type === 'CANCEL_ALARM') {
        // Cancelar una alarma específica
        const { alarmId } = event.data;
        if (scheduledAlarms.has(alarmId)) {
            clearTimeout(scheduledAlarms.get(alarmId));
            scheduledAlarms.delete(alarmId);
            console.log(`Alarma cancelada: ${alarmId}`);
        }
    } else if (event.data && event.data.type === 'CANCEL_ALL_ALARMS') {
        // Cancelar todas las alarmas
        scheduledAlarms.forEach((timeoutId) => clearTimeout(timeoutId));
        scheduledAlarms.clear();
        console.log('Todas las alarmas canceladas');
    }
});

