import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DateCalendar } from '@mui/x-date-pickers';
import { Moment } from 'moment';
import { FC, MouseEvent } from 'react';
import { useModal } from '../../hooks/useModal';
import { DATE_FORMAT, sx } from './constants';

interface CalendarPickerProps {
  date: Moment;
  changeSubtaskDate: (date: Date) => void;
}

export const CalendarPicker: FC<CalendarPickerProps> = ({
  date,
  changeSubtaskDate,
}) => {
  const { isOpen, closeModal, toggleModal } = useModal();

  const toggleCalendar = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    toggleModal();
  };

  const onChange = (momentDate: Moment) => {
    changeSubtaskDate(momentDate.toDate());
    closeModal();
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
