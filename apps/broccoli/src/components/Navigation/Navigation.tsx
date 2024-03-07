import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { Logo } from '../Logo';
import { Settings } from '../Settings';
import { Links } from '../Links';
import { useNavigate } from 'react-router-dom';
import { SX } from '../../constants/Navigation/styles';

const pages = [
  {
    name: 'Boards',
    link: '/application/boards',
  },
  {
    name: 'Drag&Drop',
    link: '/application/dragdrop',
  },
];

export const Navigation = () => {
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

  return (
    <AppBar position="static" className="app-theme navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo sx={SX.Common} />
          <BurgerMenu
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
            anchorElNav={anchorElNav}
            pages={pages}
          />
          <Logo sx={SX.Small} />
          <Links handleCloseNavMenu={handleCloseNavMenu} pages={pages} />
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
