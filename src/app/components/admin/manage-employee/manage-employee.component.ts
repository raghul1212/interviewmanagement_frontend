import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Employee, EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {
   employees:Employee[]=[];
   pageOfItems: Array<any>=[];
   closeResult: string='';
  modalOptions:NgbModalOptions;
  constructor(private router:Router,private employeeService:EmployeeService
    ,private toastr:ToastrService,private modalService: NgbModal) {
      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop'
      }

     }

  ngOnInit(): void {
    this.reloadData();
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

  
  updateEmployee(id:any){
    this.router.navigate(['updateEmployee',id]);
  }

  reloadData(){
    this.employeeService.getAllEmployee().subscribe(data=>{
      this.employees=data.data;
    },error=> this.showError(error.error.message));
  }
  showSuccess(message:string){
    this.toastr.success(message);
  }

  showError(message:string){
    this.toastr.error(message);
  }

  //this method is used to confirm whether admin wants to delete the employee or not.
  open(content:any,employeeId:number) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.employeeService.deleteEmployeeById(employeeId).subscribe(data=>{
            this.showSuccess(data.message);
            this.reloadData();
           },error=> this.showError(error.error.message)
           );
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }



}
