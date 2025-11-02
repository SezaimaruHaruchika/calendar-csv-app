'use client';

import { useState, useEffect } from 'react';
import { CalendarEvent } from '@/types/event';
import { exportToGoogleCalendarCSV } from '@/utils/csvExport';
import EventList from '@/components/EventList';
import EventForm from '@/components/EventForm';
import Header from '@/components/Header';
import { DownloadIcon, PlusIcon, TrashIcon } from '@/components/icons';
import Button from '@/components/Button'; // Buttonコンポーネントをインポート

export default function Home() {
  // ...（既存のuseStateやuseEffectなどのロジックは変更なし）...
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
      <Header />

      <main className="grow">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {!isDeleteMode ? (
              <>
                <Button 
                  onClick={() => handleOpenForm(null)} 
                  variant="secondary"
                  className="!rounded-full" // 丸い形にするためクラスを上書き
                >
                  <PlusIcon className="w-5 h-5 text-blue-500" />
                  <span>作成</span>
                </Button>
                {events.length > 0 && (
                  <>
                    <Button 
                      onClick={handleExport} 
                      variant="secondary"
                      className="!rounded-full"
                    >
                      <DownloadIcon className="w-5 h-5" />
                      <span>CSVエクスポート ({events.length})</span>
                    </Button>
                    <Button 
                      onClick={toggleDeleteMode} 
                      variant="secondary"
                      className="!rounded-full"
                    >
                      <TrashIcon className="w-5 h-5 text-red-500" />
                      <span>複数削除</span>
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Button 
                  onClick={handleDeleteSelected} 
                  disabled={selectedEventIds.length === 0} 
                  variant="danger"
                >
                  選択した項目を削除 ({selectedEventIds.length})
                </Button>
                <Button 
                  onClick={toggleDeleteMode} 
                  variant="secondary"
                >
                  キャンセル
                </Button>
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