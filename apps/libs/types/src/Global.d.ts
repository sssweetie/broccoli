import { Page } from './Navigation';

export interface MenuProps<T = {}> {
  anchorEl: HTMLElement | null;
  pages?: Page[];
  openMenu: (event: MouseEvent<HTMLElement>) => void;
  closeMenu: T extends string ? (to: T) => void : VoidFunction;
}

export type VoidFunction = () => void;
