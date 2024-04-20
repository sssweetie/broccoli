import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import {
  IconButton,
  Menu,
  MenuItem,
  PopoverOrigin,
  Typography,
} from '@mui/material';
import { MenuProps } from 'apps/libs/types/src/Global';

const boxSX = { flexGrow: 1, display: { xs: 'flex', md: 'none' } };
const menuSX = {
  display: { xs: 'block', md: 'none' },
};
const anchorOrigin: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
};
const transformOrigin: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'left',
};

export const BurgerMenu: React.FC<MenuProps<string>> = ({
  anchorEl,
  pages,
  openMenu,
  closeMenu,
}) => {
  const menuItems = pages?.map((page) => (
    <MenuItem key={page.name} onClick={() => closeMenu(page.link)}>
      <Typography textAlign="center">{page.name}</Typography>
    </MenuItem>
  ));

  return (
    <Box sx={boxSX}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={openMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        keepMounted
        transformOrigin={transformOrigin}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        sx={menuSX}
      >
        {menuItems}
      </Menu>
    </Box>
  );
};
