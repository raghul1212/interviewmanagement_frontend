import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ResultService } from 'src/app/services/result/result.service';
import { Result } from 'src/app/dto/result/result';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.css'],
})
export class AddResultComponent implements OnInit {
  id: number = 0; //id of the interview whose result to be added
  modalOptions: NgbModalOptions;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private resultService: ResultService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    };
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  //to display success toastr message
  showSuccess(message: string) {
    this.toastr.success(message);
  }

  //to display error toastr message
  showError(message: string) {
    this.toastr.error(message);
  }

  //this method is used to confirm the add result option
  //modalService open method requires content which is coming from html ng-template modal of any type
  addResult(content: any, resultData: Result) {
    this.modalService.open(content, this.modalOptions).result.then(
      () => {
        resultData.updatedBy = localStorage.getItem('empEmail')!; //not null assertion is added here
        this.resultService.addResult(this.id, resultData).subscribe(
          (data) => {
            this.showSuccess(data.message);
            this.router.navigate(['employeeManageInterview']);
          },
          (error) => this.showError(error.error.message)
        );
      },
      (reason) => {} //to catch the promise rejection
    );
  }
}
