import { Box } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { boxSX } from '../../constants';

interface LayoutProps {
  header: ReactNode;
  images: ReactNode;
  submitForm: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ header, images, submitForm }) => {
  return (
    <Box sx={boxSX}>
      {header}
      {images}
      {submitForm}
    </Box>
  );
};
