import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'src/app/dto/result/result';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private baseUrl = 'http://localhost:8083/result';

  constructor(private http: HttpClient) {}

  /*result related methods start here */
  getAllResult(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getResultById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  addResult(interviewId: number, result: Result): Observable<any> {
    const headers = new HttpHeaders().set(
      'content-type',
      'application/json;charset:utf-8'
    );
    return this.http.post(`${this.baseUrl}/${interviewId}`, result, {
      headers,
    });
  }

  updateResult(result: Result): Observable<any> {
    const headers = new HttpHeaders().set(
      'content-type',
      'application/json;charset:utf-8'
    );
    return this.http.put(`${this.baseUrl}`, result, { headers });
  }
  /*result related methods end here */

  getResultByInterviewId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/interview/${id}`);
  }

  getResultByCandidateId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/candidate/${id}`);
  }

  getResultByEmployeeId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee/${id}`);
  }
}

