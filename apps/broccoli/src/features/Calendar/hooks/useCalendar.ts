import { useQuery } from '@tanstack/react-query';
import { ISubtasksAPI } from 'apps/broccoli/src/api/subtasksAPI';
import { Moment } from 'moment';

interface IDate {
  dateFrom: Moment;
  dateTo: Moment;
}

export const useCalendar = (subtasksAPI: ISubtasksAPI, dates: IDate) => {
  const getSubtasksForPeriod = async ({ queryKey }: { queryKey: string[] }) => {
    const [, dateTo, dateFrom] = queryKey;
    const res = await subtasksAPI.read(dateFrom, dateTo);
    return res;
  };

  const { data } = useQuery({
    queryKey: [
      'calendar-subtasks',
      dates.dateTo.toString(),
      dates.dateFrom.toString(),
    ],
    queryFn: getSubtasksForPeriod,
  });

  return data;
};
