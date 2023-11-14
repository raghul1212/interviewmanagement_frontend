import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Candidate } from 'src/app/dto/candidate/candidate';
import { CandidateService } from 'src/app/services/candidate/candidate.service';

@Component({
  selector: 'app-view-current-application',
  templateUrl: './view-current-application.component.html',
  styleUrls: ['./view-current-application.component.css'],
})
export class ViewCurrentApplicationComponent implements OnInit {
  emailId: string = localStorage.getItem('canEmail') || ''; //if localstorage returns a string, that values will be assigned, if null is returned then empty string('') is assigned to the variable
  candidate: Candidate[] = []; //to store list of candidate application data
  constructor(
    private router: Router,
    private candidateService: CandidateService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    //if localstorage email is valid then this.emailId is not-empty otherwise empty string
    if (this.emailId == '') {
      this.showInfo('Log in to continue..');
      this.router.navigate(['login']);
    } else {
      this.reloadData();
    }
  }

  //to load candidate applications based on loggedIn  email id
  reloadData() {
    this.candidateService.getCandidateByEmailId(this.emailId).subscribe(
      (data) => {
        this.candidate = data.data;
      },
      (error) => {
        //if error code is 404, then no data found for candidate, so redirect to login page to enter valid email id, to get application details
        if (error.error.statusCode == 404) {
          this.showInfo('please enter a valid login credentials to proceed..');
          this.router.navigate(['login']);
        } else {
          this.showError(error.error.message);
        }
      }
    );
  }

  //to display info toastr message
  showInfo(message: string) {
    this.toastr.info(message);
  }

  //to display error toastr message
  showError(message: string) {
    this.toastr.error(message);
  }
}
