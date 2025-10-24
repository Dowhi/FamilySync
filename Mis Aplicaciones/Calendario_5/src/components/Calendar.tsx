import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Event, EventFormData } from '../types';
import { useApp } from '../context/AppContext';
import EventForm from './EventForm';

const Calendar: React.FC = () => {
  const { state, createEvent, updateEvent, deleteEvent } = useApp();
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(undefined);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const calendarRef = useRef<FullCalendar>(null);


  const handleDateSelect = (selectInfo: any) => {
    setSelectedDate(selectInfo.start);
    setIsEventFormOpen(true);
  };

  const handleEventClick = (clickInfo: any) => {
    const event = state.events.find(e => e.id === clickInfo.event.id);
    if (event) {
      setSelectedEvent(event);
      setIsEventFormOpen(true);
    }
  };

  const handleEventSubmit = async (eventData: EventFormData) => {
    if (selectedEvent) {
      await updateEvent(selectedEvent.id, eventData);
    } else {
      await createEvent(eventData);
    }
    setIsEventFormOpen(false);
    setSelectedEvent(undefined);
    setSelectedDate(undefined);
  };

  const handleEventDelete = async () => {
    if (selectedEvent) {
      await deleteEvent(selectedEvent.id);
      setIsEventFormOpen(false);
      setSelectedEvent(undefined);
    }
  };

  const handleCloseForm = () => {
    setIsEventFormOpen(false);
    setSelectedEvent(undefined);
    setSelectedDate(undefined);
  };

  const formatEventsForFullCalendar = (events: Event[]) => {
    return events.map(event => ({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      backgroundColor: event.userColor,
      borderColor: event.userColor,
      textColor: '#ffffff',
      extendedProps: {
        description: event.description,
        category: event.category,
        userName: event.userName,
        userColor: event.userColor,
        isOwnEvent: event.userId === state.currentUser?.id
      }
    }));
  };

  return (
    <div className="calendar-container">
      {/* Header */}
      <div className="calendar-header">
        <div className="header-left">
          <h1>CalendarioSync</h1>
          <div className="user-info">
            <div 
              className="user-indicator" 
              style={{ backgroundColor: state.currentUser?.color }}
            >
              {state.currentUser?.name.charAt(0)}
            </div>
            <span>{state.currentUser?.name}</span>
          </div>
        </div>
        
        <div className="header-right">
          {state.isOffline && (
            <div className="offline-indicator">
              <span>Sin conexión</span>
            </div>
          )}
        </div>
      </div>

      {/* Calendar */}
      <div className="calendar-wrapper">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={false}
          height="100%"
          events={formatEventsForFullCalendar(state.events)}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          locale="es"
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={(eventInfo) => (
            <div className="event-content">
              <div className="event-title">{eventInfo.event.title}</div>
              <div className="event-user">{eventInfo.event.extendedProps.userName}</div>
            </div>
          )}
        />
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bottom-nav-bar">
        <button className="nav-button">
          <span className="nav-icon">🎨</span>
          <span className="nav-text">Pintar</span>
        </button>
        <button className="nav-button">
          <span className="nav-icon">✏️</span>
          <span className="nav-text">Editar</span>
        </button>
        <button className="nav-button">
          <span className="nav-icon">🔄</span>
          <span className="nav-text">Turnos</span>
        </button>
      </div>

      {/* Event Form Modal */}
      {isEventFormOpen && (
        <EventForm
          event={selectedEvent}
          selectedDate={selectedDate}
          onSubmit={handleEventSubmit}
          onDelete={selectedEvent ? handleEventDelete : undefined}
          onClose={handleCloseForm}
        />
      )}

      <style>{`
        .calendar-container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f8fafc;
        }
        
        .bottom-nav-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: white;
          border-top: 1px solid #e2e8f0;
          display: flex;
          z-index: 1000;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .nav-button {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          transition: background-color 0.2s;
          gap: 4px;
        }
        
        .nav-button:hover {
          background: #f3f4f6;
        }
        
        .nav-button:active {
          background: #e5e7eb;
        }
        
        .nav-icon {
          font-size: 20px;
          line-height: 1;
        }
        
        .nav-text {
          font-size: 12px;
          font-weight: 500;
          color: #374151;
          line-height: 1;
        }
        
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: white;
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .header-left {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        
        .header-left h1 {
          margin: 0;
          color: #1e293b;
          font-size: 1.5rem;
          font-weight: 700;
        }
        
        .user-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .user-indicator {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 0.875rem;
        }
        
        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .offline-indicator {
          background: #ef4444;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .calendar-wrapper {
          flex: 1;
          padding: 1rem 2rem;
          padding-bottom: 80px; /* Espacio para la barra inferior */
        }
        
        .event-content {
          padding: 0.25rem;
          font-size: 0.75rem;
          line-height: 1.2;
        }
        
        .event-title {
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .event-user {
          font-size: 0.625rem;
          opacity: 0.8;
        }
        
        @media (max-width: 768px) {
          .calendar-header {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }
          
          .header-left {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          
          .header-right {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .calendar-wrapper {
            padding: 0.5rem;
            padding-bottom: 80px; /* Espacio para la barra inferior en móvil */
          }
        }
      `}</style>
    </div>
  );
};

export default Calendar;
