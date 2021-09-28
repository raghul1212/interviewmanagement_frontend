import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee, EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private router:Router,private employeeService:EmployeeService) { }

  ngOnInit(): void {
  }
addEmployee(employee:Employee){
    this.employeeService.addEmployee(employee).subscribe(data=>{
      window.alert(data);
    if (confirm("Do you want to add one more employee?") == true) {
      location.reload();
    } else {
      this.router.navigate(['manageEmployee']);
    }
    },error=> window.alert(error.error)
    );
   
  }
}
