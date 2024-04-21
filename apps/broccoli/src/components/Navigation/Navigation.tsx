import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { Logo } from '../Logo';
import { Settings } from '../Settings';
import { Links } from '../Links';
import { useNavigate } from 'react-router-dom';
import { SX } from '../../constants/Navigation';

const pages = [
  {
    name: 'Boards',
    link: '/application/boards',
  },
];

export const Navigation: React.FC = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const openNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const closeNavMenu = (to: string) => {
    setAnchorElNav(null);
    navigate(to);
  };

  const closeUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      className="app-theme navbar"
      sx={{
        backgroundColor: '#2D3748',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo sx={SX.Common} />
          <BurgerMenu
            openMenu={openNavMenu}
            closeMenu={closeNavMenu}
            anchorEl={anchorElNav}
            pages={pages}
          />
          <Logo sx={SX.Small} />
          <Links closeMenu={closeNavMenu} pages={pages} />
          <Settings
            openMenu={openUserMenu}
            closeMenu={closeUserMenu}
            anchorEl={anchorElUser}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
