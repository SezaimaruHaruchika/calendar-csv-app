'use client';

import { useState, useEffect } from 'react';
import { CalendarEvent } from '@/types/event';
import { exportToGoogleCalendarCSV } from '@/utils/csvExport';
import EventList from '@/components/EventList';
import EventForm from '@/components/EventForm';
import { CalendarIcon, DownloadIcon, PlusIcon, TrashIcon } from '@/components/icons';

export default function Home() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      try {
        const savedEvents = localStorage.getItem('calendarEvents');
        if (savedEvents) {
          setEvents(JSON.parse(savedEvents));
        }
      } catch (error) {
        console.error("Failed to parse events from localStorage", error);
      }
    }
  }, [hasMounted]);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('calendarEvents', JSON.stringify(events));
    }
  }, [events, hasMounted]);

  const handleOpenForm = (event: CalendarEvent | null) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  const handleSaveEvent = (event: CalendarEvent) => {
    if (editingEvent) {
      setEvents(events.map(e => e.id === event.id ? event : e));
    } else {
      const newEventsList: CalendarEvent[] = [];
      const baseId = Date.now().toString();
      const originalEvent = { ...event, id: `${baseId}-0` };
      newEventsList.push(originalEvent);

      if (event.repeatWeeks && event.repeatWeeks > 0) {
        for (let i = 1; i <= event.repeatWeeks; i++) {
          const startDate = new Date(event.startDate);
          startDate.setDate(startDate.getDate() + 7 * i);
          const endDate = new Date(event.endDate);
          endDate.setDate(endDate.getDate() + 7 * i);

          newEventsList.push({
            ...event,
            id: `${baseId}-${i}`,
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
          });
        }
      }
      setEvents([...events, ...newEventsList]);
    }
    handleCloseForm();
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedEventIds([]);
  };

  const handleSelectionChange = (id: string, isSelected: boolean) => {
    setSelectedEventIds(prev => isSelected ? [...prev, id] : prev.filter(eventId => eventId !== id));
  };

  const handleDeleteSelected = () => {
    setEvents(events.filter(event => !selectedEventIds.includes(event.id)));
    toggleDeleteMode();
  };

  const handleExport = () => {
    if (events.length === 0) {
      alert('エクスポートするイベントがありません');
      return;
    }
    exportToGoogleCalendarCSV(events);
  };

  if (!hasMounted) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <header className="p-4 border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center">
          <CalendarIcon className="text-blue-500 w-8 h-8" />
          <h1 className="text-xl font-semibold ml-3">カレンダーイベント管理</h1>
        </div>
      </header>

      <main className="grow">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {!isDeleteMode ? (
              <>
                <button 
                  onClick={() => handleOpenForm(null)} 
                  className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-full border shadow-sm hover:bg-gray-100 transition"
                >
                  <PlusIcon className="w-5 h-5 text-blue-500" />
                  <span>作成</span>
                </button>
                {events.length > 0 && (
                  <>
                    <button 
                      onClick={handleExport} 
                      className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-full border shadow-sm hover:bg-gray-100 transition"
                    >
                      <DownloadIcon className="w-5 h-5" />
                      <span>CSVエクスポート ({events.length})</span>
                    </button>
                    <button 
                      onClick={toggleDeleteMode} 
                      className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 rounded-full border shadow-sm hover:bg-gray-100 transition"
                    >
                      <TrashIcon className="w-5 h-5 text-red-500" />
                      <span>複数削除</span>
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <button 
                  onClick={handleDeleteSelected} 
                  disabled={selectedEventIds.length === 0} 
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 transition"
                >
                  選択した項目を削除 ({selectedEventIds.length})
                </button>
                <button 
                  onClick={toggleDeleteMode} 
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                >
                  キャンセル
                </button>
              </>
            )}
          </div>

          {showForm && (
            <div 
              className="fixed inset-0 bg-gray-700/50 z-20 flex justify-center items-center p-4"
              onClick={handleCloseForm}
            >
                <div onClick={(e) => e.stopPropagation()}>
                    <EventForm 
                        onSubmit={handleSaveEvent} 
                        eventToEdit={editingEvent} 
                        onCancel={handleCloseForm} 
                    />
                </div>
            </div>
          )}

          <EventList 
            events={events} 
            onEdit={handleOpenForm} 
            onDelete={deleteEvent}
            isDeleteMode={isDeleteMode}
            selectedEventIds={selectedEventIds}
            onSelectionChange={handleSelectionChange}
          />
        </div>
      </main>
    </div>
  );
}