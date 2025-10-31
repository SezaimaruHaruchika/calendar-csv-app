import { CalendarEvent } from '@/types/event';

export function exportToGoogleCalendarCSV(events: CalendarEvent[]): void {
  const headers = [
    'Subject',
    'Start Date',
    'Start Time',
    'End Date',
    'End Time',
    'All Day Event',
    'Description',
    'Location'
  ];

  const csvContent = [
    headers.join(','),
    ...events.map(event => [
      `"${event.subject}"`,
      event.startDate,
      event.allDay ? '' : event.startTime,
      event.endDate,
      event.allDay ? '' : event.endTime,
      event.allDay ? 'True' : 'False',
      `"${event.description || ''}"`,
      `"${event.location || ''}"`
    ].join(','))
  ].join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `calendar_events_${new Date().getTime()}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}