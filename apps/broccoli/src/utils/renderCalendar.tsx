import moment, { Moment } from 'moment';
import { Day } from '../features/Calendar/components/Day';
import { Week } from '../features/Calendar/components/Week';
import { ISubTask } from 'apps/libs/types/src';

const WEEK_LENGTH = 7;
const WEEK_COUNT = 6;

export const getDates = () => {
  const firstDayOfTheMonth = moment().startOf('month').isoWeekday();
  const dateFrom = moment()
    .startOf('month')
    .subtract(firstDayOfTheMonth - 1, 'days');
  const dateTo = dateFrom.clone().add(41, 'day');

  return { dateTo, dateFrom };
};

export const renderCalendar = (
  dateFrom: Moment,
  subtasks: ISubTask | undefined
) => {
  const calendarDate = dateFrom.clone();

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

  return calendar;
};
