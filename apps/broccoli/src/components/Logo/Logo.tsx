import { Typography } from '@mui/material';
import ForestIcon from '@mui/icons-material/Forest';

interface sx {
  icon: object;
  text: object;
}
interface Props {
  sx: sx;
}

export const Logo: React.FC<Props> = ({ sx }) => {
  return (
    <>
      <ForestIcon sx={sx.icon} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/application"
        sx={sx.text}
      >
        BI
      </Typography>
    </>
  );
};
