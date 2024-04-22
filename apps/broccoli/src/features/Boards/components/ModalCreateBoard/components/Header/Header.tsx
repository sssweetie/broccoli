import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { FC } from 'react';
import { ModalCreateBoardProps } from '../../ModalCreateBoard';

export const Header: FC<Pick<ModalCreateBoardProps, 'fetchData'>> = ({
  fetchData,
}) => {
  return (
    <div className="pick-up-image-title">
      <h3>Choose your background</h3>
      <IconButton onClick={fetchData}>
        <RefreshIcon />
      </IconButton>
    </div>
  );
};
