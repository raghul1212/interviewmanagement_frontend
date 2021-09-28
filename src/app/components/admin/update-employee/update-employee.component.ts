import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employee:Employee={};
  id?:any;
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(data=>{
    this.employee=data;
  })
  }

  updateEmployee(employee:Employee){
    employee.id=this.id;
    employee.addedOn=this.employee.addedOn;
    this.employeeService.updateEmployee(employee).subscribe(data=>{
     window.alert(data);
     this.router.navigate(['manageEmployee']);
   },error=> window.alert(error.error)
   );
  }

}
