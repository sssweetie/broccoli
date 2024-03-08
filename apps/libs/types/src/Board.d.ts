import { ITable } from './Table';

export interface IBoard {
  _id: string;
  title: string;
  tables: ITable[];
  access: string;
  backgroundImage: string;
}
