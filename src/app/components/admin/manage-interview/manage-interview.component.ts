import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  NgbModal,
  NgbModalOptions,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import {
  Interview,
  InterviewService,
} from 'src/app/services/interview/interview.service';

@Component({
  selector: 'app-manage-interview',
  templateUrl: './manage-interview.component.html',
  styleUrls: ['./manage-interview.component.css'],
})
export class ManageInterviewComponent implements OnInit {
  interviews: Interview[] = [];
  pageOfItems: Array<any> = [];
  closeResult: string = '';
  modalOptions: NgbModalOptions;
  constructor(
    private router: Router,
    private interviewService: InterviewService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    };
  }

  ngOnInit(): void {
    this.reloadData();
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  reloadData() {
    this.interviewService.getAllInterview().subscribe(
      (data) => {
        this.interviews = data.data;
      },
      (error) => this.showError(error.error.message)
    );
  }

  updateInterview(id: any) {
    this.router.navigate(['updateInterview', id]);
  }

  viewCandidateAndEmployee(id: any) {
    this.router.navigate(['viewCandidateEmployee', id]);
  }
  showSuccess(message: string) {
    this.toastr.success(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }

  //this method is used to confirm whether admin wants to cancel the interview or not.
  open(content: any, interview: any) {
    this.modalService.open(content, this.modalOptions).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        interview.updatedBy = localStorage.getItem(
          'adminEmail'
        ) as any as string;
        interview.status = 'Cancelled';
        this.interviewService.updateInterview(interview).subscribe(
          (data) => {
            this.showSuccess(data.message);
          },
          (error) => this.showError(error.error.message)
        );
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
