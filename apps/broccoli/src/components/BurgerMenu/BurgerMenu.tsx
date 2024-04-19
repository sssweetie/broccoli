import { MouseEvent } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import {
  IconButton,
  Menu,
  MenuItem,
  PopoverOrigin,
  Typography,
} from '@mui/material';
import { IPage } from 'apps/libs/types/src';

interface BurgerMenuProps {
  anchorElNav: null | HTMLElement;
  pages: IPage[];
  handleOpenNavMenu: (event: MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu: (to: string) => void;
}

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

export const BurgerMenu: React.FC<BurgerMenuProps> = ({
  anchorElNav,
  pages,
  handleOpenNavMenu,
  handleCloseNavMenu,
}) => {
  const menuItems = pages.map((page) => (
    <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page.link)}>
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
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={anchorOrigin}
        keepMounted
        transformOrigin={transformOrigin}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={menuSX}
      >
        {menuItems}
      </Menu>
    </Box>
  );
};
