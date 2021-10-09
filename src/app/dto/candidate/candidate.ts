import { Interview } from "../interview/interview";

export class Candidate {
    id?: number;
    firstName?: string;
    lastName?: string;
    emailId?: string;
    phoneNumber?: string;
    jobRole?: string;
    experience?: string;
    resumeLink?: string;
    interview?: Interview;
    addedOn?: Date;
    updatedOn?: Date;
    updatedBy?: string;
  }