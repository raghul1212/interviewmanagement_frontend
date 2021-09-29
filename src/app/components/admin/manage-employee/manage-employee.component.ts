import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee, EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {
   employees:Employee[]=[];
   pageOfItems: Array<any>=[];
  constructor(private router:Router,private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.reloadData();
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

  deleteEmployee(id:any){
    if(window.confirm('Are you sure to delete this employee?')==true){
      this.employeeService.deleteEmployeeById(id).subscribe(data=>{
        window.alert(data);
        this.reloadData();
       },error=> window.alert(error.error)
       );
    }
  }
  updateEmployee(id:any){
    this.router.navigate(['updateEmployee',id]);
  }

  reloadData(){
    this.employeeService.getAllEmployee().subscribe(data=>{
      this.employees=data;
    });
  }

}
