import { Button } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/sign-in');
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
