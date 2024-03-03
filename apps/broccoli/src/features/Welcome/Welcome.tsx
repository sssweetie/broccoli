import { Button } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useNavigate } from 'react-router-dom';

export const Welcome = () => {
  const navigate = useNavigate();

  const onClick = () => {
    setTimeout(() => navigate('/sign-in'), 500);
  };

  return (
    <div className="welcome app-color">
      <Button
        className="welcome__get-started"
        color="inherit"
        variant="outlined"
        endIcon={<DoubleArrowIcon />}
        onClick={onClick}
      >
        Get started
      </Button>
    </div>
  );
};
