import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { MenuProps } from 'apps/libs/types/src/Global';
import { BURGER_MENU } from '../../constants/BurgerMenu';

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
    <Box sx={BURGER_MENU.boxSX}>
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
        open={Boolean(anchorEl)}
        anchorOrigin={BURGER_MENU.anchorOrigin}
        transformOrigin={BURGER_MENU.transformOrigin}
        sx={BURGER_MENU.menuSX}
        onClose={closeMenu}
        keepMounted
      >
        {menuItems}
      </Menu>
    </Box>
  );
};
