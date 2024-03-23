import React from 'react';
import moment from 'moment';
import { Day } from './components/Day';
import { Week } from './components/Week';
const WEEK_LENGTH = 7;
const WEEK_COUNT = 6;

const firstDayOfTheMonth = moment().startOf('month').isoWeekday();
const calendarDate = moment()
  .startOf('month')
  .subtract(firstDayOfTheMonth - 1, 'days');
const today = moment();

const calendar: JSX.Element[] = [];
const header = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

for (let i = 0; i < WEEK_COUNT; i++) {
  const week: JSX.Element[] = [];
  for (let j = 0; j < WEEK_LENGTH; j++) {
    let day: JSX.Element = <></>;
    let className: string | undefined = 'day';

    if (calendarDate.isSame(today, 'day')) {
      className += ' day--today';
    }

    if (calendarDate.isoWeekday() === 6 || calendarDate.isoWeekday() === 7) {
      className += ' day--weekend';
    }

    if (i === 0) {
      day = (
        <Day className={className}>
          <div className="day__header">{header[j]}</div>
          <div className="day__number">{calendarDate.format('D')}</div>
        </Day>
      );
    }

    if (i !== 0) {
      day = (
        <Day className={className}>
          <div className="day__number">{calendarDate.format('D')}</div>
        </Day>
      );
    }

    week.push(day);
    calendarDate.add(1, 'd');
  }
  calendar.push(<Week>{week}</Week>);
}

export const Calendar = () => {
  return <div style={{ height: '100%' }}>{calendar}</div>;
};
