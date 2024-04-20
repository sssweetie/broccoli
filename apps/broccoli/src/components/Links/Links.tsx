import { Box, Button } from '@mui/material';
import { MenuProps } from 'apps/libs/types/src/Global';

const boxSX = { flexGrow: 1, display: { xs: 'none', md: 'flex' } };
const buttonSX = { my: 2, color: 'white', display: 'block' };

type LinksProps = 'pages' | 'closeMenu';

export const Links: React.FC<Pick<MenuProps<string>, LinksProps>> = ({
  pages,
  closeMenu,
}) => {
  const buttons = pages?.map((page) => (
    <Button key={page.name} onClick={() => closeMenu(page.link)} sx={buttonSX}>
      {page.name}
    </Button>
  ));

  return <Box sx={boxSX}>{buttons}</Box>;
};
