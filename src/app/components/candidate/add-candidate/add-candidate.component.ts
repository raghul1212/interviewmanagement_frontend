import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Candidate } from 'src/app/dto/candidate/candidate';
import { CandidateService } from 'src/app/services/candidate/candidate.service';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css'],
})
export class AddCandidateComponent implements OnInit {
  jobRoles: [number, string][] = []; //to store available job roles which is taken from database
  experienceArray: [number, string][] = []; //to store available experience for candidate to choose
  role: string = ''; //role variable is used to store value of job role selected by the candidate and passed to the validateJobRole function and checks whether this candidate is able to choose this role or not, this logic is done in backend
  email: string = ''; //email is used to validate job role of the candidate. As we identify candidate by email, so we are checking candidate email with job role and validate job role for candidate
  isValidRole: boolean = true; //value is initially set to true and when user choose a role, then validateRole method will be invoked and checks emailId and job role and decides whether the candidate is able to choose that role or not. If false, candidate cannot choose the role
  constructor(
    private candidateService: CandidateService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    //if localstorage is null then redirect to login page
    if (localStorage.getItem('canEmail') == null) {
      this.showInfo('Log in to continue');
      this.router.navigate(['login']);
    } else {
      this.reloadJobRoleData();
      this.reloadExperienceData();
    }
  }

  //to add candidate once they successfully applied for a job
  addCandidate(candidate: Candidate) {
    candidate.updatedBy = candidate.emailId!;
    this.candidateService.addCandidate(candidate).subscribe(
      (data) => {
        this.showSuccess(data.message);
        this.router.navigate(['viewCurrentApplication']);
      },
      (error) => this.showError(error.error.message)
    );
  }

  //to load the available experience data
  reloadExperienceData() {
    this.candidateService.getAllExperience().subscribe((data) => {
      this.experienceArray = data.data;
    });
  }

  //to load the available job roles
  reloadJobRoleData() {
    this.candidateService.getAllJobRole().subscribe((data) => {
      this.jobRoles = data.data;
    });
  }

  //to set candidate role for validation
  //after setting role, we are invoking validateRole method, because candidate can fill email id and role in any order, so we calling and validateRole method is executed only when both are non-empty
  setRole(role: string) {
    this.role = role;
    this.validateRole();
  }
  //to set email id and for validation
  //after setting email, we are invoking validateRole method, because candidate can fill email id and role in any order, so we calling and validateRole method is executed only when both are non-empty
  setEmail(email: string) {
    this.email = email;
    this.validateRole();
  }

  //to validate email and job of a candidate, because a candidate cannot apply for a same role within 3 months
  validateRole(): void {
    //as we initialized email and role as empty string, we only check when both email and role become non-empty
    if (this.email != '' && this.role != '') {
      const candidate = new Candidate(); //as validateRole of candidate service supports  only candidate object
      candidate.emailId = this.email;
      candidate.jobRole = this.role;
      this.candidateService.validateRole(candidate).subscribe(
        (data) => {
          this.isValidRole = data.data; //it value is either true or false, depending upon validation
        },
        (error) => {
          this.showError(error.error.message);
          this.isValidRole = false;
          //if any error occurs validation is set to false
        }
      );
    } else {
      this.isValidRole = true;
      //if any of the email or role is empty then, validation is true but we cannot apply the form without mandatory fields
    }
  }
  //to display info toastr message
  showInfo(message: string) {
    this.toastr.info(message);
  }

  //to display success toastr message
  showSuccess(message: string) {
    this.toastr.success(message);
  }

  //to display error toastr message
  showError(message: string) {
    this.toastr.error(message);
  }
}
