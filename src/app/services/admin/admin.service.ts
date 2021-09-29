import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl1='http://localhost:8083/interview';
  constructor(private http:HttpClient) { }
  sendScheduledInterviewMail(candidateId:any,empId:any,interview:any):Observable<any>{
    const headers=new HttpHeaders().set('content-type','application/json;charset:utf-8');
    return this.http.post(`${this.baseUrl1}/scheduled-interview/${candidateId}/${empId}`,interview,{headers});
  }

  sendRescheduledInterviewMail(candidateId:any,empId:any,interview:any):Observable<any>{
    const headers=new HttpHeaders().set('content-type','application/json;charset:utf-8');
    return this.http.put(`${this.baseUrl1}/rescheduled-interview/${candidateId}/${empId}`,interview,{headers});
  }
  private baseUrl2='http://localhost:8083/result';
  sendResultMail(result:any):Observable<any>{
    const headers=new HttpHeaders().set('content-type','application/json;charset:utf-8');
    return this.http.post(`${this.baseUrl2}/email`,result,{headers});
  }
  
}



