import { Button } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import {  useNavigate } from 'react-router-dom';
import './welcome.scss';

export const Welcome = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/sign-in');
  };

  return (
    <div className="welcome">
      <Button
        color="inherit"
        size="large"
        variant="outlined"
        endIcon={<DoubleArrowIcon />}
        onClick={onClick}
      >
        Get started
      </Button>
    </div>
  );
};
