import { useQuery } from '@tanstack/react-query';
import { AuditAPI } from '../api/auditApi';

interface Props {
  auditAPI: AuditAPI;
  taskId: string;
}

export const useAudit = ({ auditAPI, taskId }: Props) => {
  const { data } = useQuery({
    queryKey: ['audit'],
    queryFn: () => auditAPI.read(taskId),
  });

  return { data };
};
