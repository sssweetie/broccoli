import React from 'react';
import { useCalendar } from './hooks/useCalendar';
import { renderCalendar } from '../../utils';

export const Calendar: React.FC = () => {
  const { subtasks, dateFrom, currentMonth, nextMonth, prevMonth, getToday } =
    useCalendar();

  const calendar = renderCalendar(dateFrom, subtasks);
  const currentDate = currentMonth.format('MMM YYYY');
  return (
    <div style={{ height: '100%' }}>
      <section className="calendar-navigation">
        <h1 className="calendar-navigation__title">{currentDate}</h1>
        <div className="calendar-navigation__menu">
          <button onClick={prevMonth} type="button">
            &#8592;
          </button>
          <button type="button" onClick={getToday}>
            Today
          </button>
          <button onClick={nextMonth} type="button">
            &#8594;
          </button>
          <button>Month</button>
          <button>Week</button>
        </div>
      </section>
      {calendar}
    </div>
  );
};
