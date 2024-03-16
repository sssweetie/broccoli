import { IBoard } from './Board';

export interface IOrg {
  clerkOrgId: string;
  boards: IBoard[];
}
