import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interview } from '../interview/interview.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8083/employee';

  constructor(private http: HttpClient) {}

  getAllEmployee(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getEmployeeByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/name/${name}`);
  }

  getEmployeeByEmailId(employee: Employee): Observable<any> {
    return this.http.post(`${this.baseUrl}/email`, employee);
  }

  getEmployeeByPhone(employee: Employee): Observable<any> {
    return this.http.post(`${this.baseUrl}/phone`, employee);
  }

  getEmployeeByDesignation(employee: Employee): Observable<any> {
    return this.http.post(`${this.baseUrl}/designation-id`, employee);
  }

  getAllDesignation(): Observable<any> {
    return this.http.get(`${this.baseUrl}/designation`);
  }

  addEmployee(employee: Employee): Observable<any> {
    const headers = new HttpHeaders().set(
      'content-type',
      'application/json;charset:utf-8'
    );
    return this.http.post(`${this.baseUrl}`, employee, { headers });
  }

  updateEmployee(employee: Employee): Observable<any> {
    const headers = new HttpHeaders().set(
      'content-type',
      'application/json;charset:utf-8'
    );
    return this.http.put(`${this.baseUrl}`, employee, { headers });
  }

  deleteEmployeeById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

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
