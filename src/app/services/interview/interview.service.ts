import { Time } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from 'src/app/dto/candidate/candidate';
import { Employee } from 'src/app/dto/employee/employee';
import { Interview } from 'src/app/dto/interview/interview';

@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  private baseUrl = 'http://localhost:8083/interview';

  constructor(private http: HttpClient) {}

  /*interview related methods start here */
  getAllInterview(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getAllInterviewType(): Observable<any> {
    return this.http.get(`${this.baseUrl}/interview-type`);
  }

  getInterviewById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getInterviewByType(type: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/type/${type}`);
  }

  getInterviewByScheduledDate(schedluedDate: Date): Observable<any> {
    return this.http.get(`${this.baseUrl}/scheduled-date/${schedluedDate}`);
  }

  addInterview(
    candidateId: number,
    employeeId: number,
    interview: Interview
  ): Observable<any> {
    const headers = new HttpHeaders().set(
      'content-type',
      'application/json;charset:utf-8'
    );
   
    return this.http.post(
      `${this.baseUrl}/${candidateId}/${employeeId}`,
      interview,
      { headers }
    );
  }

  updateInterview(interview: Interview): Observable<any> {
    const headers = new HttpHeaders().set(
      'content-type',
      'application/json;charset:utf-8'
    );
    return this.http.put(`${this.baseUrl}`, interview, { headers });
  }
  /*interview related methods end here */

  /*candidate related methods start here */
  getInterviewByCandidateName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/candidate/name/${name}`);
  }

  getInterviewByCandidateId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/candidate/${id}`);
  }

  getInterviewByCandidateEmailId(candidate: Candidate): Observable<any> {
    return this.http.post(`${this.baseUrl}/candidate/email`, candidate); //add header if response is not received appropriately
  }

  getInterviewByCandidatePhone(candidate: Candidate): Observable<any> {
    return this.http.post(`${this.baseUrl}/candidate/phone`, candidate); //add header if response is not received appropriately
  }

  getInterviewByCandidateRole(role: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/candidate/role/${role}`);
  }

  getInterviewByCandidateExperience(experience: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/candidate/experience/${experience}`);
  }
  /*candidate related methods end here */

  /*employee related methods start here */
  getInterviewByEmployeeName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee/name/${name}`);
  }

  getInterviewByEmpId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee/${id}`);
  }

  getInterviewByEmployeeEmailId(employee: Employee): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee/email`, employee);
  }

  getInterviewByEmployeePhone(employee: Employee): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee/phone`, employee);
  }

  getInterviewByEmployeeId(employee: Employee): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee/employee-id`, employee);
  }

  getInterviewByDesignationId(employee: Employee): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee/designation-id`, employee);
  }
  /*employee related methods end here */
}


