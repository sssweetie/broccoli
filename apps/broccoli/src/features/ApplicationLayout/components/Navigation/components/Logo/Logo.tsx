import { Typography } from '@mui/material';
import ForestIcon from '@mui/icons-material/Forest';

interface sx {
  icon: object;
  text: object;
}
interface LogoProps {
  sx: sx;
}

export const Logo: React.FC<LogoProps> = ({ sx }) => {
  const { icon, text } = sx;
  return (
    <>
      <ForestIcon sx={icon} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/application"
        sx={text}
      >
        BI
      </Typography>
    </>
  );
};
