import HistoryIcon from '@mui/icons-material/History';
import { useQuery } from '@tanstack/react-query';
import { auditAPI } from 'apps/broccoli/src/api/auditAPI';
import { renderAuditLogs } from 'apps/broccoli/src/utils';
interface AuditLogsProps {
  taskId: string;
}

export const AuditLogs: React.FC<AuditLogsProps> = ({ taskId }) => {
  const { data } = useQuery({
    queryKey: ['audit'],
    queryFn: () => auditAPI.read(taskId),
  });

  const auditLogs = renderAuditLogs(data);

  return (
    <section className="task__section  task__audit">
      <HistoryIcon />
      <div className="task__content">
        <h3>Activity</h3>
        <div className="task__audit-list">
          {auditLogs ? auditLogs : 'There is no audit data...'}
        </div>
      </div>
    </section>
  );
};
