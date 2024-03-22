import { Box, Button } from '@mui/material';
import { IPage } from 'apps/libs/types/src';

interface Props {
  pages: IPage[];
  handleCloseNavMenu: (to: string) => void;
}

export const Links: React.FC<Props> = ({ pages, handleCloseNavMenu }) => {
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
