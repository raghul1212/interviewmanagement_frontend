import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Result } from 'src/app/dto/result/result';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ResultService } from 'src/app/services/result/result.service';

@Component({
  selector: 'app-manage-result',
  templateUrl: './manage-result.component.html',
  styleUrls: ['./manage-result.component.css'],
})
export class ManageResultComponent implements OnInit {
  results: Result[] = []; //to store array of Result objects
  pageOfItems: Array<Result> = []; //used for pagination
  candidateResult: Result = {}; //used to store the result of a particular candidate, useful while sending result email
  customMessage: string = ''; //used to clear the custom message after admin sends the message
  constructor(
    private router: Router,
    private resultService: ResultService,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.reloadResultData();
  }
  //used to clear the custom message textarea box in the html, whenever user closes or after sending email
  clearCustomMessage() {
    this.customMessage = '';
  }

  //this method is called whenever we move once intra-page in the html(pagination)
  onChangePage(pageOfItems: Array<Result>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  //to display candidate,employee and interview details for a specific result
  viewInterviewDetails(id: number) {
    this.router.navigate(['viewCandidateEmployeeInterview', id]);
  }

  //used to set result for a specific candidate, will be used to send result email, invoked when user tries to add custom message for a candidate
  setCandidateResult(result: Result) {
    this.candidateResult = result;
  }

  //used to send email with message coming from html and candidate Result is set once user tries to add result custom message
  sendMail(message: string) {
    this.clearCustomMessage(); //invokes this method to clear the message textarea box
    this.candidateResult.message = message; //gets message coming from html textarea
    this.adminService.sendResultMail(this.candidateResult).subscribe(
      (data) => {
        this.showSuccess(data.message);
      },
      (error) => this.showError(error.error.message)
    );
  }

  //loads the result data
  reloadResultData() {
    this.resultService.getAllResult().subscribe(
      (data) => {
        this.results = data.data;
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
}
