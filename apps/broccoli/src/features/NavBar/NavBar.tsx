import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { BurgerMenu } from './components/BurgerMenu/BurgerMenu';
import { Logo } from './components/Logo';
import { Settings } from './components/Settings';
import { NavLinks } from './components/NavLinks';
import { useNavigate } from 'react-router-dom';

const pages = [
  {
    name: 'Dashboard',
    link: '/application/dashboard',
  },
  {
    name: 'Datatable',
    link: '/application/datatable',
  },
  {
    name: 'Drag&Drop',
    link: '/application/dragdrop',
  },
];

export const NavBar = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (to: string) => {
    setAnchorElNav(null);
    navigate(to);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const sxCommon = {
    icon: { display: { xs: 'none', md: 'flex' }, mr: 1 },
    text: {
      mr: 2,
      display: { xs: 'none', md: 'flex' },
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'inherit',
      textDecoration: 'none',
    },
  };

  const sxSmall = {
    icon: { display: { xs: 'flex', md: 'none' }, mr: 1 },
    text: {
      mr: 2,
      display: { xs: 'flex', md: 'none' },
      flexGrow: 1,
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'inherit',
      textDecoration: 'none',
    },
  };

  return (
    <AppBar position="static" className="app-theme">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo sx={sxCommon} />
          <BurgerMenu
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
            anchorElNav={anchorElNav}
            pages={pages}
          />
          <Logo sx={sxSmall} />
          <NavLinks handleCloseNavMenu={handleCloseNavMenu} pages={pages} />
          <Settings
            handleOpenUserMenu={handleOpenUserMenu}
            handleCloseUserMenu={handleCloseUserMenu}
            anchorElUser={anchorElUser}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
