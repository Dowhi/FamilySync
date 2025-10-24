import React, { useState, useEffect } from 'react';
import { Event, EventFormData } from '../types';

interface EventFormProps {
  event?: Event;
  selectedDate?: Date;
  onSubmit: (eventData: EventFormData) => Promise<void>;
  onDelete?: () => Promise<void>;
  onClose: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, selectedDate, onSubmit, onDelete, onClose }) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    start: '',
    end: '',
    category: 'trabajo',
    allDay: false,
    userId: ''
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description || '',
        start: event.start,
        end: event.end,
        category: event.category,
        allDay: event.allDay || false,
        userId: event.userId
      });
    } else {
      const defaultStart = selectedDate ? selectedDate.toISOString().slice(0, 16) : '';
      setFormData({
        title: '',
        description: '',
        start: defaultStart,
        end: '',
        category: 'trabajo',
        allDay: false,
        userId: ''
      });
    }
  }, [event, selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.start) {
      await onSubmit(formData);
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // El componente siempre se renderiza, pero puede estar oculto por CSS

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{event ? 'Editar Evento' : 'Nuevo Evento'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="start">Inicio *</label>
              <input
                type="datetime-local"
                id="start"
                name="start"
                value={formData.start}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="end">Fin</label>
              <input
                type="datetime-local"
                id="end"
                name="end"
                value={formData.end}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="trabajo">Trabajo</option>
                <option value="personal">Personal</option>
                <option value="familia">Familia</option>
                <option value="salud">Salud</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="allDay"
                  checked={formData.allDay}
                  onChange={handleChange}
                />
                Todo el día
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancelar
            </button>
            {event && onDelete && (
              <button type="button" onClick={onDelete} className="btn-danger">
                Eliminar
              </button>
            )}
            <button type="submit" className="btn-primary">
              {event ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
