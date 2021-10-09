import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Candidate } from 'src/app/dto/candidate/candidate';
import { CandidateService } from 'src/app/services/candidate/candidate.service';

@Component({
  selector: 'app-view-candidate-by-id',
  templateUrl: './view-candidate-by-id.component.html',
  styleUrls: ['./view-candidate-by-id.component.css'],
})
export class ViewCandidateByIdComponent implements OnInit {
  candidate: Candidate = {}; //to store candidate details as a Candidate object
  id: number = 0; //id of the candidate whose details to be displayed
  length = 1; //to indicate candidate is empty or not, length means non-empty
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private candidateService: CandidateService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.reloadCandidateData();
  }

  //to go back to the employeeManageInterview Page, because this page will be viewed by employee to get details of a specific candidate
  backToList() {
    this.router.navigate(['employeeManageInterview']);
  }

  //to load candidate data
  reloadCandidateData() {
    this.candidateService.getCandidateById(this.id).subscribe(
      (data) => {
        this.candidate = data.data;
      },
      (error) => {
        this.showError(error.error.message);
        this.length = 0; //if an error occurs that means no data found. so making length to 0
      }
    );
  }

  //to display error message
  showError(message: string) {
    this.toastr.error(message);
  }
}
