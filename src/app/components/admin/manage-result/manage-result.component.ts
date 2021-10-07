import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Result, ResultService } from 'src/app/services/result/result.service';

@Component({
  selector: 'app-manage-result',
  templateUrl: './manage-result.component.html',
  styleUrls: ['./manage-result.component.css'],
})
export class ManageResultComponent implements OnInit {
  id?: any;
  results: Result[] = [];
  pageOfItems: Array<any> = [];
  candidateResult: Result = {};
  customMessage: string = '';
  constructor(
    private router: Router,
    private resultService: ResultService,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.reloadResultData();
  }
  clearCustomMessage() {
    this.customMessage = '';
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  updateResult(id: any) {
    this.router.navigate(['updateResult', id]);
  }
  viewInterviewDetails(id: any) {
    this.router.navigate(['viewCandidateEmployeeInterview', id]);
  }
  setCandidateResult(result: any) {
    this.candidateResult = result;
  }
  sendMail(message: string) {
    this.clearCustomMessage();
    this.candidateResult.message = message;
    this.adminService.sendResultMail(this.candidateResult).subscribe(
      (data) => {
        this.showSuccess(data.message);
      },
      (error) => this.showError(error.error.message)
    );
  }

  reloadResultData() {
    this.resultService.getAllResult().subscribe(
      (data) => {
        this.results = data.data;
      },
      (error) => this.showError(error.error.message)
    );
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }
}
