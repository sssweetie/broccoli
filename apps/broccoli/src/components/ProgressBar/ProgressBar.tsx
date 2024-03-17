import * as React from 'react';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface IProgressBar {
  value: number;
}

const LinearProgressWithLabel: React.FC<LinearProgressProps> = (props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value as number
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

export const ProgressBar: React.FC<IProgressBar> = ({ value }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={value} />
    </Box>
  );
};
