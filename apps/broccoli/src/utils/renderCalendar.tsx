import moment, { Moment } from 'moment';
import { Day } from '../features/Calendar/components/Day';
import { Week } from '../features/Calendar/components/Week';
import { SubTask } from 'apps/libs/types/src';

const WEEK_LENGTH = 7;
const WEEK_COUNT = 6;

export const renderCalendar = (
  dateFrom: Moment,
  subtasks: SubTask[] | undefined
) => {
  const calendarDate = dateFrom.clone();

  const today = moment();

  const calendar: JSX.Element[] = [];
  const header = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  for (let i = 0; i < WEEK_COUNT; i++) {
    const week: JSX.Element[] = [];
    for (let j = 0; j < WEEK_LENGTH; j++) {
      const daySubtasks = subtasks
        ? subtasks.filter((subtask) => {
            return (
              subtask.date &&
              moment(subtask.date).format('DD-MM') ===
                calendarDate.format('DD-MM')
            );
          })
        : [];

      let day: JSX.Element = <></>;
      const className: string[] = ['day'];

      if (calendarDate.isSame(today, 'day')) {
        className.push('day--today');
      }

      if (calendarDate.isoWeekday() === 6 || calendarDate.isoWeekday() === 7) {
        className.push('day--weekend');
      }

      if (j === 0) {
        className.push('day--edge');
      }

      const daySubtasksLength =
        daySubtasks.length > 0 ? (
          <span className="day__cards-count">{daySubtasks.length} cards</span>
        ) : null;

      if (i === 0) {
        className.push('day--header');
        const headerTitle = header[j] + ' ' + calendarDate.format('D') + ' ';

        day = (
          <Day className={className.join(' ')} daySubtasks={daySubtasks}>
            <div className="day__number">
              {headerTitle}
              {daySubtasksLength}
            </div>
          </Day>
        );
      }

      if (i !== 0) {
        day = (
          <Day className={className.join(' ')} daySubtasks={daySubtasks}>
            <div className="day__number">
              {calendarDate.format('D') + ' '}
              {daySubtasksLength}
            </div>
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
