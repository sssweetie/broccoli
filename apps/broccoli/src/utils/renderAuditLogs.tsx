import { Audit } from 'apps/libs/types/src';
import { AuditLog } from '../features/AuditLogs/components/AuditLog';
import { DESCRIPTION, TITLE } from '../features/AuditLogs/constants';

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

const getAuditLogText = ({ params, userName }: Audit) => {
  let auditLogText = '';

  if (params.type === TITLE) {
    auditLogText = `${userName} changes title on "${params.newName}"`;
  }

  if (params.type === DESCRIPTION) {
    auditLogText = `${userName} updates task description`;
  }

  return auditLogText;
};

export const renderAuditLogs = (data?: Audit[]) => {
  if (!data) {
    return null;
  }

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
        key={auditLog.date.toString()}
      />
    );
  });
};
