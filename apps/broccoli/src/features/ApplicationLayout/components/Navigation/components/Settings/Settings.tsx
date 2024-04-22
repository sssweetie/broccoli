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
import { MenuProps } from 'apps/libs/types/src/Global';
import { useNavigate } from 'react-router-dom';

const setting = { name: 'Logout', link: '/sign-in' };

export const Settings: React.FC<Omit<MenuProps, 'pages'>> = ({
  anchorEl,
  openMenu,
  closeMenu,
}) => {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const callBack = () => navigate('/sign-in');
  const onClick = () => signOut(callBack);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={openMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem key={setting.name} onClick={onClick}>
          <Typography textAlign="center">{setting.name}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
