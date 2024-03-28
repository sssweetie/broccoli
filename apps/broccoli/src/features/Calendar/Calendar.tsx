import React from 'react';
import { useCalendar } from './hooks/useCalendar';
import { httpClient } from '../../services/httpClient';
import { subtasksAPI } from '../../api/subtasksAPI';
import { getDates, renderCalendar } from '../../utils';

export const Calendar = () => {
  const dates = getDates();
  const subtasks = useCalendar(subtasksAPI(httpClient), dates);

  const calendar = renderCalendar(dates.dateFrom, subtasks);
  
  return (
    <div style={{ height: '100%' }}>
      <section className="calendar-navigation">
        <h1 className="calendar-navigation__title">March 2024</h1>
        <div className="calendar-navigation__menu">
          <button>&#8592;</button>
          <button>Today</button>
          <button>&#8594;</button>
          <button>Month</button>
          <button>Week</button>
        </div>
      </section>
      {calendar}
    </div>
  );
};
