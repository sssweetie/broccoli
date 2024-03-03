import { MouseEvent } from 'react';

export interface Page {
  name: string;
  link: string;
}

export interface AppBar {
  handleOpenUserMenu: (event: MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu?: (to: string) => void;
  anchorElUser?: HTMLElement | null;
  pages: Page[];
}
