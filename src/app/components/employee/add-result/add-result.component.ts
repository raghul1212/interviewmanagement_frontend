import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResultService } from 'src/app/services/result/result.service';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.css']
})
export class AddResultComponent implements OnInit {
  id:any;
  closeResult: string='';
  modalOptions:NgbModalOptions;
  constructor(private router:Router,private activatedRoute:ActivatedRoute,
    private resultService:ResultService, private toastr:ToastrService,private modalService: NgbModal) {
      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop'
      }
    }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];

  }

showSuccess(message:string){
  this.toastr.success(message);
}

showError(message:string){
  this.toastr.error(message);
}

//this method is used to confirm the add result option
open(content:any,resultData:any) {
  this.modalService.open(content, this.modalOptions).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    resultData.updatedBy=localStorage.getItem('empEmail') as any as string;
    this.resultService.addResult(this.id,resultData).subscribe(data=>{
     this.showSuccess(data.message);
      this.router.navigate(['employeeManageInterview']);
    },error=> this.showError(error.error.message));
 
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
