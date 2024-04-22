import * as React from 'react';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ProgressBarProps {
  value: number;
}

const LinearProgressWithLabel: React.FC<LinearProgressProps> = ({ value }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{ borderRadius: '6px', height: '6px' }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          value ?? 0
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <Box sx={{ width: '100%', marginBottom: '8px' }}>
      <LinearProgressWithLabel value={value} />
    </Box>
  );
};
