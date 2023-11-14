import { Interview } from '../interview/interview';

export class Employee {
  id?: number;
  designation?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  status?: string;
  emailId?: string;
  interview?: Interview;
  addedOn?: Date;
  updatedOn?: Date;
  updatedBy?: string;
}
