import { useClerk } from '@clerk/clerk-react';
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  anchorElUser: HTMLElement | null;
  handleOpenUserMenu: (event: MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
}

const setting = { name: 'Logout', link: '/sign-in' };

export const Settings: React.FC<IProps> = ({
  anchorElUser,
  handleOpenUserMenu,
  handleCloseUserMenu,
}) => {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const onClick = () => signOut(() => navigate('/sign-in'));

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key={setting.name} onClick={onClick}>
          <Typography textAlign="center">{setting.name}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
