import { useQuery } from '@tanstack/react-query';
import { ISubtasksAPI } from 'apps/broccoli/src/api/subtasksAPI';
import { Moment } from 'moment';
import moment from 'moment';
import { useState } from 'react';

const calendarFirstDayOfMonth = moment().startOf('month').isoWeekday();
const calendarDateFrom = moment()
  .startOf('month')
  .subtract(calendarFirstDayOfMonth - 1, 'days');
const calendarDateTo = calendarDateFrom.clone().add(41, 'day');

export const useCalendar = (subtasksAPI: ISubtasksAPI) => {
  const [dateTo, setDateTo] = useState<Moment>(calendarDateTo);
  const [dateFrom, setDateFrom] = useState<Moment>(calendarDateFrom);
  const [currentMonth, setCurrentMonth] = useState<Moment>(
    moment().clone().startOf('month')
  );

  const getSubtasksForPeriod = async ({ queryKey }: { queryKey: string[] }) => {
    const [, dateTo, dateFrom] = queryKey;
    const data = await subtasksAPI.read(dateFrom, dateTo);
    return data;
  };

  const nextMonth = () => {
    const newMonth = currentMonth.clone().add(1, 'month').startOf('month');
    setNewDates(newMonth);
  };

  const prevMonth = () => {
    const newMonth = currentMonth.clone().subtract(1, 'month').startOf('month');
    setNewDates(newMonth);
  };

  const getToday = () => {
    const newMonth = moment().startOf('month');
    setNewDates(newMonth);
  };

  const setNewDates = (newMonth: Moment) => {
    const newFirstDay = newMonth.clone().startOf('month').isoWeekday();
    const newDateFrom = newMonth
      .clone()
      .startOf('month')
      .subtract(newFirstDay - 1, 'days');
    const newDateTo = newDateFrom.clone().add(41, 'day');

    setDateTo(newDateTo);
    setDateFrom(newDateFrom);
    setCurrentMonth(newMonth);
  };

  const { data } = useQuery({
    queryKey: ['calendar-subtasks', dateTo.toString(), dateFrom.toString()],
    queryFn: getSubtasksForPeriod,
  });

  return {
    subtasks: data,
    nextMonth,
    prevMonth,
    getToday,
    currentMonth,
    dateFrom,
  };
};
