'use client';

import { useState } from 'react';
import { CalendarEvent } from '@/types/event';
import { ClockIcon, DescriptionIcon, LocationIcon, RepeatIcon } from './icons';

interface EventFormProps {
  onSubmit: (event: CalendarEvent) => void;
  eventToEdit: CalendarEvent | null;
  onCancel: () => void;
}

export default function EventForm({ onSubmit, eventToEdit, onCancel }: EventFormProps) {
  const [formData, setFormData] = useState({
    subject: eventToEdit?.subject || '',
    startDate: eventToEdit?.startDate || '',
    startTime: eventToEdit?.startTime || '09:00',
    endDate: eventToEdit?.endDate || '',
    endTime: eventToEdit?.endTime || '10:00',
    allDay: eventToEdit?.allDay || false,
    description: eventToEdit?.description || '',
    location: eventToEdit?.location || '',
    repeatWeeks: eventToEdit?.repeatWeeks || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.startDate || !formData.endDate) {
      alert('件名、開始日、終了日は必須です');
      return;
    }
    const event: CalendarEvent = {
      id: eventToEdit ? eventToEdit.id : Date.now().toString(),
      ...formData
    };
    onSubmit(event);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto mb-8">
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="タイトルを追加"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full text-2xl font-normal border-b-2 focus:border-blue-500 outline-none pb-2 mb-6"
                required
            />

            <div className="space-y-6">
                {/* --- ここからが修正箇所 --- */}
                <div className="flex items-start space-x-4">
                    <ClockIcon className="text-gray-500 flex-shrink-0 mt-2" />
                    <div className="flex-grow space-y-2">
                        <div className="flex items-center gap-2">
                            <input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="p-2 border rounded-md w-full" required />
                            <span className="text-gray-500">-</span>
                            <input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="p-2 border rounded-md w-full" required />
                        </div>
                        
                        {!formData.allDay && (
                            <div className="flex items-center gap-2">
                                <input type="time" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} className="p-2 border rounded-md w-full" />
                                <span className="text-gray-500">-</span>
                                <input type="time" value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} className="p-2 border rounded-md w-full" />
                            </div>
                        )}

                        <div className="flex items-center">
                            <input type="checkbox" id="allDay" checked={formData.allDay} onChange={(e) => setFormData({ ...formData, allDay: e.target.checked })} className="h-4 w-4 rounded" />
                            <label htmlFor="allDay" className="ml-2 text-sm">終日</label>
                        </div>
                    </div>
                </div>
                {/* --- ここまでが修正箇所 --- */}

                <div className="flex items-start space-x-4">
                    <DescriptionIcon className="text-gray-500 mt-2 shrink-0" />
                    <textarea placeholder="説明を追加" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border rounded-md grow" rows={3}></textarea>
                </div>

                <div className="flex items-center space-x-4">
                    <LocationIcon className="text-gray-500 shrink-0" />
                    <input type="text" placeholder="場所を追加" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full p-2 border rounded-md grow" />
                </div>
                
                <div className="flex items-center space-x-4">
                    <RepeatIcon className="text-gray-500 shrink-0" />
                    <input type="number" value={formData.repeatWeeks} onChange={(e) => setFormData({ ...formData, repeatWeeks: parseInt(e.target.value) || 0 })} className="p-2 border rounded-md w-24" min="0" />
                    <span className="text-sm text-gray-600">週間繰り返す</span>
                </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
                <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                    キャンセル
                </button>
                <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    {eventToEdit ? '更新' : '保存'}
                </button>
            </div>
        </form>
    </div>
  );
}