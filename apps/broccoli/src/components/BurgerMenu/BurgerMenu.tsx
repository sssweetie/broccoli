import { MouseEvent } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { IPage } from 'apps/libs/types/src';

interface Props {
  anchorElNav: null | HTMLElement;
  pages: IPage[];
  handleOpenNavMenu: (event: MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu: (to: string) => void;
}

export const BurgerMenu: React.FC<Props> = ({
  anchorElNav,
  pages,
  handleOpenNavMenu,
  handleCloseNavMenu,
}) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {pages.map((page) => (
          <MenuItem
            key={page.name}
            onClick={() => handleCloseNavMenu(page.link)}
          >
            <Typography textAlign="center">{page.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
