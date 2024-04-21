import { Table } from './Table';

export interface Board {
  _id: string;
  title: string;
  tables: Table[];
  access: string;
  backgroundImage: string;
}
