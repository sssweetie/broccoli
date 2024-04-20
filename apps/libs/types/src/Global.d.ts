import { IPage } from './Navigation';

export interface MenuProps<T = {}> {
  anchorEl: HTMLElement | null;
  pages?: IPage[];
  openMenu: (event: MouseEvent<HTMLElement>) => void;
  closeMenu: T extends string ? (to: T) => void : () => void;
}
