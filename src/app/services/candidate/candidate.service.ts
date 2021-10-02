import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Interview } from '../interview/interview.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
 private baseUrl='http://localhost:8083/candidate';

  constructor(private http:HttpClient) { }

  getAllCandidate():Observable<any>{
   return this.http.get(`${this.baseUrl}`);
  }

  getCandidateById(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
   }

   getCandidateByName(name:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/name/${name}`);
   }

   getCandidateByEmailId(emailId:string):Observable<any>{
    let candidate=new Candidate();
    candidate.emailId=emailId;
    return this.http.post(`${this.baseUrl}/email`,candidate);//add header if response is not received appropriately
   }

   getCandidateByPhone(candidate:Candidate):Observable<any>{
    return this.http.post(`${this.baseUrl}/phone`,candidate);
   }

   getAllExperience():Observable<any>{
    return this.http.get(`${this.baseUrl}/experience`);
   }
   getAllJobRole():Observable<any>{
    return this.http.get(`${this.baseUrl}/role`);
   }
   getCandidateByExperience(experinece:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/experience/${experinece}`);
   }

   getCandidateByRole(role:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/role/${role}`);
   }

   validateRole(candidate:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/validate-role`,candidate);
   }

   addCandidate(candidate:Candidate):Observable<any>{
    const headers=new HttpHeaders().set('content-type','application/json;charset:utf-8');
    return this.http.post(`${this.baseUrl}`,candidate,{headers});
   }

   updateCandidate(candidate:Candidate):Observable<any>{
    const headers=new HttpHeaders().set('content-type','application/json;charset:utf-8');
    return this.http.put<any>(`${this.baseUrl}`,candidate,{headers});
   }

}

export class Candidate{
  id?:number;
  firstName?:string;
  lastName?:string;
  emailId?:string;
  phoneNumber?:string;
  jobRole?:string;
  experience?:string;
  resumeLink?:string;
  interview?:Interview;
  addedOn?:Date;
  updatedOn?:Date;
  updatedBy?:string;
}
