import { Interview } from '../interview/interview';

export class Result {
  id?: number;
  remarks?: string;
  status?: string;
  message?: string;
  interview?: Interview;
  addedOn?: Date;
  updatedOn?: Date;
  updatedBy?: string;
}
