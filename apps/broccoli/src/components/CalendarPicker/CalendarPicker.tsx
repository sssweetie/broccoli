import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DateCalendar } from '@mui/x-date-pickers';
import { Moment } from 'moment';
import { FC, MouseEvent, useState } from 'react';

interface CalendarPickerProps {
  changeSubtaskDate: (date: Date) => void;
  date: Moment;
}

const sx = { position: 'absolute', backgroundColor: '#FFFFFF' };
const DATE_FORMAT = 'MMM DD';

export const CalendarPicker: FC<CalendarPickerProps> = ({
  date,
  changeSubtaskDate,
}) => {
  const [isOpen, setOpen] = useState(false);

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
        <span>{date.format(DATE_FORMAT)}</span>
      </div>
      {isOpen && <DateCalendar value={date} onChange={onChange} sx={sx} />}
    </div>
  );
};
