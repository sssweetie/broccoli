import { Box, Button } from '@mui/material';
import { Page } from 'apps/broccoli/src/types';

interface Props {
  pages: Page[];
  handleCloseNavMenu: (to: string) => void;
}

export const NavLinks = ({ handleCloseNavMenu, pages }: Props) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages.map((page) => (
        <Button
          key={page.name}
          onClick={() => handleCloseNavMenu(page.link)}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          {page.name}
        </Button>
      ))}
    </Box>
  );
};
