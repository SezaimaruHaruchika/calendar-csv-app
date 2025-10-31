export interface CalendarEvent {
  id: string;
  subject: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  allDay: boolean;
  description?: string;
  location?: string;
  repeatWeeks?: number;
}