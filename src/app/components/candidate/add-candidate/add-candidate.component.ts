import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate, CandidateService } from 'src/app/services/candidate/candidate.service';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {
  candidate?:Candidate;
  jobRoles:any[]=['Java Developer','Python Developer','Testing','HR'];
  constructor(private candidateService:CandidateService,private router:Router) { }

  ngOnInit(): void {
  }

  addCandidate(candidate:Candidate){
    this.candidateService.addCandidate(candidate).subscribe(data=>{
      localStorage.setItem('canEmail',candidate.emailId as any as string);
      window.alert(data.message);
      this.router.navigate(['viewCurrentApplication']);
    },error=> window.alert(error.error)
    );
   
  }

}
