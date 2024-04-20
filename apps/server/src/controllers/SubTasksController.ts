import { SubTaskModel } from '../models/SubTaskModel';
import moment from 'moment';

const MOMENT_TEMPLATE = 'ddd MMM DD YYYY HH:mm:ss [GMT] ZZ';

export const SubTasksController = {
  read: async (dateFrom: string, dateTo: string) => {
    const momentDateFrom = moment(dateFrom, MOMENT_TEMPLATE);
    const momentDateTo = moment(dateTo, MOMENT_TEMPLATE);

    const subTasks = await SubTaskModel.find();

    const filteredSubtasks = subTasks.filter((subTask) => {
      const momentSubtask = moment(subTask.date);
      if (
        momentSubtask.isAfter(momentDateFrom) &&
        momentSubtask.isBefore(momentDateTo)
      ) {
        return true;
      }

      return false;
    });

    filteredSubtasks.sort((a, b) => moment(a.date).diff(moment(b.date)));

    return filteredSubtasks;
  },
};
