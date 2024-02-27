import { IAudit } from 'apps/libs/types/src';
import { UPDATE } from '../constants/DragDrop';
import { AuditLog } from '../features/DragDrop/components/Tables/components/Table/components/Tasks/components/Task/components/DetailsTaskModal/components/AuditLogs/components';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getAuditLogText = ({ params, userName }: IAudit) => {
  let auditLogText = '';

  if (params.type === UPDATE.TITLE) {
    auditLogText = `${userName} changes title on "${params.newName}"`;
  }

  if (params.type === UPDATE.DESCRIPTION) {
    auditLogText = `${userName} updates task description`;
  }

  return auditLogText;
};

export const renderAuditLogs = (data: IAudit[] | undefined) => {
  if (data) {
    return data.map((auditLog) => {
      const logDate = new Date(auditLog.date);
      const auditLogText = getAuditLogText(auditLog);

      const date = `${logDate.getDate()} ${months[logDate.getMonth()]}, ${
        logDate.toTimeString().split(' ')[0]
      }`;

      return (
        <AuditLog
          date={date}
          auditLogText={auditLogText}
          userImg={auditLog.userImg}
        />
      );
    });
  }
  return null;
};
