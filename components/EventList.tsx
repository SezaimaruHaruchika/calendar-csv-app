'use client';

import { CalendarEvent } from '@/types/event';

interface EventListProps {
  events: CalendarEvent[];
  onDelete: (id: string) => void;
  onEdit: (event: CalendarEvent) => void;
  isDeleteMode: boolean;
  selectedEventIds: string[];
  onSelectionChange: (id: string, isSelected: boolean) => void;
}

export default function EventList({ events, onDelete, onEdit, isDeleteMode, selectedEventIds, onSelectionChange }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        イベントがありません。新規イベントを追加してください。
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div 
          key={event.id} 
          className={`bg-white p-4 rounded-lg shadow-md transition-all duration-200 border ${selectedEventIds.includes(event.id) ? 'border-blue-400 bg-blue-50 shadow-lg' : 'border-transparent'} ${isDeleteMode ? 'cursor-pointer hover:bg-gray-50' : ''}`}
          onClick={isDeleteMode ? () => onSelectionChange(event.id, !selectedEventIds.includes(event.id)) : undefined}
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{event.subject}</h3>
              
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  <span className="font-medium">📅</span> {event.startDate} {!event.allDay && event.startTime} 
                  {' → '} 
                  {event.endDate} {!event.allDay && event.endTime}
                  {event.allDay && ' (終日)'}
                </div>
                
                {event.location && (
                  <div><span className="font-medium">📍</span> {event.location}</div>
                )}
                
                {event.description && (
                  <div className="mt-2 pt-2 border-t text-gray-700 whitespace-pre-wrap">{event.description}</div>
                )}
              </div>
            </div>
            
            {!isDeleteMode && (
              <div className="flex items-center shrink-0">
                <button
                  onClick={(e) => { e.stopPropagation(); onEdit(event); }}
                  className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 border rounded-md"
                >
                  編集
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(event.id); }}
                  className="ml-2 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 border rounded-md"
                >
                  削除
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}