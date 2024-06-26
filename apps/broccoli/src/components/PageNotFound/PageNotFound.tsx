import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/application/boards');
  };

  return (
    <article className="center not-found">
      <h3 className="not-found__title">Page not found</h3>
      <Button variant="outlined" onClick={onClick}>
        Go to main page
      </Button>
    </article>
  );
};
