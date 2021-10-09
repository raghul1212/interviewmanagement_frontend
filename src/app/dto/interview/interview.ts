import { Time } from "@angular/common";
import { Candidate } from "../candidate/candidate";
import { Employee } from "../employee/employee";
import { Result } from "../result/result";

export class Interview {
    id?: number;
    interviewType?: string;
    callScheduledDate?: Date;
    callScheduledTime?: Time;
    status?: string;
    result?: Result;
    candidate?: Candidate;
    employee?: Employee;
    addedOn?: Date;
    updatedOn?: Date;
    updatedBy?: string;
}