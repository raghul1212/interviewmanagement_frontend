import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Interview } from 'src/app/dto/interview/interview';
import { InterviewService } from 'src/app/services/interview/interview.service';

@Component({
  selector: 'app-view-candidate-employee',
  templateUrl: './view-candidate-employee.component.html',
  styleUrls: ['./view-candidate-employee.component.css'],
})
export class ViewCandidateEmployeeComponent implements OnInit {
  interview: Interview = {}; //to display candidate and employee details of a specific interview
  id: number = 0; //id of the interview to be displayed
  length: number = 1; //length of object, to check object is empty or not. default length is 1, if object is empty, we replace with 0 after invoking loadInterviewData
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private interviewService: InterviewService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.reloadInterviewData();
  }

  //to go back to the manageInterview page
  backToList() {
    this.router.navigate(['manageInterview']);
  }

  //loads the interview details
  reloadInterviewData() {
    this.interviewService.getInterviewById(this.id).subscribe(
      (data) => {
        this.interview = data.data;
      },
      (error) => {
        this.showError(error.error.message);
        this.length = 0;
      }
    );
  }
  //it is used to display error toastr message
  showError(message: string) {
    this.toastr.error(message);
  }
}
