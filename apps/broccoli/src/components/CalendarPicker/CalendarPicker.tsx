import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DateCalendar } from '@mui/x-date-pickers';
import { Moment } from 'moment';
import { FC, MouseEvent, useState } from 'react';

interface Props {
  changeSubtaskDate: (date: Date) => void;
  date: Moment;
}

export const CalendarPicker: FC<Props> = ({ date, changeSubtaskDate }) => {
  const [isOpen, setOpen] = useState(false);

  //   const closeCalendar = () => {
  //     setOpen(false);
  //   };

  //   const openCalendar = () => {
  //     setOpen(true);
  //   };

  const toggleCalendar = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    setOpen((prevState) => !prevState);
  };

  const onChange = (momentDate: Moment) => {
    changeSubtaskDate(momentDate.toDate());
    setOpen(false);
  };

  return (
    <div className="calendar-picker">
      <div className="calendar-picker__icons">
        <CalendarMonthIcon onClick={toggleCalendar} />
        <span>{date.format('MMM DD')}</span>
      </div>
      {isOpen && (
        <DateCalendar
          value={date}
          onChange={onChange}
          sx={{ position: 'absolute', backgroundColor: '#FFFFFF' }}
        />
      )}
    </div>
  );
};
