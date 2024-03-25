import React from 'react';
import { useCalendar } from './hooks/useCalendar';
import { httpClient } from '../../services/httpClient';
import { subtasksAPI } from '../../api/subtasksAPI';
import { getDates, renderCalendar } from '../../utils';

export const Calendar = () => {
  const dates = getDates();
  const subtasks = useCalendar(subtasksAPI(httpClient), dates);

  const calendar = renderCalendar(dates.dateFrom, subtasks);

  return <div style={{ height: '100%' }}>{calendar}</div>;
};
