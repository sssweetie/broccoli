import HistoryIcon from '@mui/icons-material/History';
import { useQuery } from '@tanstack/react-query';
import { auditApi } from 'apps/broccoli/src/api/auditApi';
import { httpClient } from 'apps/broccoli/src/services/httpClient';
import { renderAuditLogs } from 'apps/broccoli/src/utils';
interface IProps {
  taskId: string;
}

export const AuditLogs: React.FC<IProps> = ({ taskId }) => {
  const { data } = useQuery({
    queryKey: ['audit'],
    queryFn: () => auditApi(httpClient).read(taskId),
  });

  const auditLogs = renderAuditLogs(data);

  return (
    <section className="task__section  task__audit">
      <HistoryIcon />
      <div className="task__content">
        <h3>Activity</h3>
        <div className="task__audit-list">
          {auditLogs && auditLogs.length
            ? auditLogs
            : 'There is no audit data...'}
        </div>
      </div>
    </section>
  );
};
