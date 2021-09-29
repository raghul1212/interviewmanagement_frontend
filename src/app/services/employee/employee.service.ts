import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interview } from '../interview/interview.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl='http://localhost:8083/employee';

  constructor(private http:HttpClient) { }

  getAllEmployee():Observable<any>{
   return this.http.get(`${this.baseUrl}`);
  }

  getEmployeeById(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
   }

   getEmployeeByName(name:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/name/${name}`);
   }

   getEmployeeByEmailId(employee:Employee):Observable<any>{
    return this.http.post(`${this.baseUrl}/email`,employee);//add header if response is not received appropriately
   }

   getEmployeeByPhone(employee:Employee):Observable<any>{
    return this.http.post(`${this.baseUrl}/phone`,employee);//add header if response is not received appropriately
   }

   getEmployeeByEmployeeId(employee:Employee):Observable<any>{
    return this.http.post(`${this.baseUrl}/employee-id`,employee);//add header if response is not received appropriately
   }

   getEmployeeByDesignationId(employee:Employee):Observable<any>{
    return this.http.post(`${this.baseUrl}/designation-id`,employee);//add header if response is not received appropriately
   }

   addEmployee(employee:Employee):Observable<any>{
    const headers=new HttpHeaders().set('content-type','application/json;charset:utf-8');
    return this.http.post(`${this.baseUrl}`,employee,{headers,responseType:'text'})
   }

   updateEmployee(employee:Employee):Observable<any>{
    const headers=new HttpHeaders().set('content-type','application/json;charset:utf-8');
    return this.http.put(`${this.baseUrl}`,employee,{headers,responseType:'text'})
   }

   deleteEmployeeById(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`,{responseType:'text'});//add header if response is not received appropriately
   }

}

export class Employee{
    id?:number;
    employeeId?:number;
    designationId?:number;
    firstName?:string;
    lastName?:string;
    phoneNumber?:string;
    emailId?:string;
    interview?:Interview;
    addedOn?:Date;
    updatedOn?:Date;
    updatedBy?:string;
}

