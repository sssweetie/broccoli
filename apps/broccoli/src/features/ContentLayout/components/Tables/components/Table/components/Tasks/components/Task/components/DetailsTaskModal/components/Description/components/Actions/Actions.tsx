import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';

interface Props {
  handleDeleteTable: () => Promise<void>;
  handleDeleteTask: () => Promise<void>;
}

export const Actions: React.FC<Props> = ({
  handleDeleteTable,
  handleDeleteTask,
}) => {
  return (
    <section className="task__action">
      <h4>Actions</h4>
      <button className="button" onClick={handleDeleteTable}>
        <DeleteIcon />
        Delete table
      </button>
      <button className="button" onClick={handleDeleteTask}>
        <ClearIcon />
        Delete task
      </button>
    </section>
  );
};
