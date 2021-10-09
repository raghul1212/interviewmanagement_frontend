import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  NgbModal,
  NgbModalOptions,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/dto/employee/employee';
import {
  EmployeeService,
} from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css'],
})
export class ManageEmployeeComponent implements OnInit {
  employees: Employee[] = [];//get the employee details from database and store in a array of Employee objects
  pageOfItems: Array<Employee> = [];//used for pagination
  modalOptions: NgbModalOptions;//modal options such as backdrop, backdropClass
  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.modalOptions = { //it is used for bootsrap ngb modal setup
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    };
  }

  ngOnInit(): void {
    this.reloadData();
  }

  //this method is called whenever we move once intra-page in the html(pagination) 
  onChangePage(pageOfItems: Array<Employee>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  //once user clicks update Employee button, redirect to update employee page
  updateEmployee(id: number) {
    this.router.navigate(['updateEmployee', id]);
  }

//loads the employee data
  reloadData() {
    this.employeeService.getAllEmployee().subscribe(
      (data) => {
        this.employees = data.data;
      },
      (error) => this.showError(error.error.message)
    );
  }

  //it is used to display success toastr message
  showSuccess(message: string) {
    this.toastr.success(message);
  }

  //it is used to display error toastr message
  showError(message: string) {
    this.toastr.error(message);
  }

  //this method is used to confirm whether admin wants to delete the employee or not.
  //modalService open method requires content which is coming from html ng-template modal of any type
 deleteEmployee(content: any, employeeId: number) {
    this.modalService.open(content, this.modalOptions).result.then(
      () => {
        //once modal is resolved, then we call deleteEmployeeById of employee service
        this.employeeService.deleteEmployeeById(employeeId).subscribe(
          (data) => {
            this.showSuccess(data.message);
            this.reloadData();//reload the employee data, once deletion is success
          },
          (error) => this.showError(error.error.message)
        );
      }
     
    );
  }
 
  
}
