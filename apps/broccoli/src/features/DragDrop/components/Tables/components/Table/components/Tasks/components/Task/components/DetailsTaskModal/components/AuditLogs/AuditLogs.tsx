import HistoryIcon from '@mui/icons-material/History';
import { auditApi } from 'apps/broccoli/src/features/DragDrop/api/auditApi';
import { useAudit } from 'apps/broccoli/src/features/DragDrop/hooks/useAudit';
import { httpClient } from 'apps/broccoli/src/services/httpClient';
interface Props {
  taskId: string;
}

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

export const AuditLogs = ({ taskId }: Props) => {
  const auditProps = { auditAPI: auditApi(httpClient), taskId };
  const { data } = useAudit(auditProps);
  const auditLogs = data?.map((auditLog) => {
    let auditLogText: string | null = null;

    if (auditLog.params.type === 'updateTitle') {
      auditLogText = `${auditLog.userName} changes title on "${auditLog.params.newName}"`;
    }

    if (auditLog.params.type === 'updateDescription') {
      auditLogText = `${auditLog.userName} updates task description`;
    }

    // const date =
    const logDate = new Date(auditLog.date);

    const date = `${logDate.getDate()} ${months[logDate.getMonth()]}, ${
      logDate.toTimeString().split(' ')[0]
    }
    `;

    return (
      <article className="audit" key={auditLog.date.toString()}>
        <img src={auditLog.userImg} alt="person" className="audit__img" />
        <span className="audit__text">{auditLogText}</span>
        <span className="audit__date">{date}</span>
      </article>
    );
  });

  return (
    <section className="task__section  task__audit">
      <HistoryIcon />
      <div className="task__content">
        <h3>Activity</h3>
        <div className="task__audit-list">{auditLogs}</div>
      </div>
    </section>
  );
};
