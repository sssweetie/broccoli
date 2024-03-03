import DescriptionIcon from '@mui/icons-material/Description';
import { UseMutateFunction } from '@tanstack/react-query';
import { Actions } from './components/Actions';
import { Content } from './components/Content';
import { useDescription } from './hooks/useDescription';
import { IDescription } from '../../DetailsTaskModal';

interface Props {
  description: IDescription;
  updateDescription: (description: string) => Promise<void>;
  deleteTable: UseMutateFunction<void, Error, string, unknown>;
  deleteTask: UseMutateFunction<void, Error, string, unknown>;
}

export const Description = ({
  description,
  updateDescription,
  deleteTable,
  deleteTask,
}: Props) => {
  const mutations = { updateDescription, deleteTable, deleteTask };
  const { models, operations } = useDescription({
    description,
    mutations,
  });
  return (
    <form onSubmit={operations.onSubmit} className="task__section">
      <DescriptionIcon />
      <Content
        isEdit={models.isEdit}
        value={models.descriptionState}
        onClick={operations.onClick}
        onChange={operations.onChange}
        onBlur={operations.onBlur}
      />
      <Actions
        handleDeleteTable={operations.handleDeleteTable}
        handleDeleteTask={operations.handleDeleteTask}
      />
    </form>
  );
};
