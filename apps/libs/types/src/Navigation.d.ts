import { MouseEvent } from 'react';

export interface IPage {
  name: string;
  link: string;
}

export interface IAppBar {
  handleOpenUserMenu: (event: MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu?: (to: string) => void;
  anchorElUser?: HTMLElement | null;
  pages: IPage[];
}
