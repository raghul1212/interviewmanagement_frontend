import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  NgbModal,
  NgbModalOptions,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import {
  InterviewService,
} from 'src/app/services/interview/interview.service';
import { Interview } from 'src/app/dto/interview/interview';

@Component({
  selector: 'app-manage-interview',
  templateUrl: './manage-interview.component.html',
  styleUrls: ['./manage-interview.component.css'],
})
export class ManageInterviewComponent implements OnInit {
  interviews: Interview[] = [];//to store array of Interview object
  pageOfItems: Array<Interview> = [];//used for pagination
  modalOptions: NgbModalOptions;//ngb modal options such as backdrop, backdropClass
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

  //this method is called whenever we move once intra-page in the html(pagination) 
  onChangePage(pageOfItems: Array<Interview>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  //loads all interview data
  reloadData() {
    this.interviewService.getAllInterview().subscribe(
      (data) => {
        this.interviews = data.data;
      },
      (error) => this.showError(error.error.message)
    );
  }

  //once user clicks updateInterview, redirect to the updateInterview page
  updateInterview(id: number) {
    this.router.navigate(['updateInterview', id]);
  }

  //to see candidate and employee details for a specific interview
  viewCandidateAndEmployee(id: number) {
    this.router.navigate(['viewCandidateEmployee', id]);
  }

  //it is used to display success toastr message
  showSuccess(message: string) {
    this.toastr.success(message);
  }

  //it is used to display error toastr message
  showError(message: string) {
    this.toastr.error(message);
  }

  //this method is used to confirm whether admin wants to cancel the interview or not.
  //modalService open method requires content which is coming from html ng-template modal of any type
  cancelInterview(content: any, interview: Interview) {
    this.modalService.open(content, this.modalOptions).result.then(
      () => {
        interview.updatedBy = localStorage.getItem(
          'adminEmail'
        )!;//assertion operator is used here because we are sure that adminEmail exists
        interview.status = 'Cancelled';//updating interview status as cancelled
        this.interviewService.updateInterview(interview).subscribe(
          (data) => {
            this.showSuccess(data.message);
          },
          (error) => this.showError(error.error.message)
        );
      }
    );
  }
 
}
