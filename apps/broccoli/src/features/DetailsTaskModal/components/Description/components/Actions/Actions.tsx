import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';

interface ActionsProps {
  deleteTable: () => Promise<void>;
  deleteTask: () => Promise<void>;
}

export const Actions: React.FC<ActionsProps> = ({
  deleteTable,
  deleteTask,
}) => {
  return (
    <section className="task__action">
      <h4>Actions</h4>
      <button className="button" onClick={deleteTable}>
        <DeleteIcon />
        Delete table
      </button>
      <button className="button" onClick={deleteTask}>
        <ClearIcon />
        Delete task
      </button>
    </section>
  );
};
