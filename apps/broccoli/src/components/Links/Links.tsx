import { Box, Button } from '@mui/material';
import { IPage } from 'apps/libs/types/src';

interface LinksProps {
  pages: IPage[];
  handleCloseNavMenu: (to: string) => void;
}

const boxSX = { flexGrow: 1, display: { xs: 'none', md: 'flex' } };
const buttonSX = { my: 2, color: 'white', display: 'block' };

export const Links: React.FC<LinksProps> = ({ pages, handleCloseNavMenu }) => {
  const buttons = pages.map((page) => (
    <Button
      key={page.name}
      onClick={() => handleCloseNavMenu(page.link)}
      sx={buttonSX}
    >
      {page.name}
    </Button>
  ));

  return <Box sx={boxSX}>{buttons}</Box>;
};
