import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate, CandidateService } from 'src/app/services/candidate/candidate.service';

@Component({
  selector: 'app-update-candidate',
  templateUrl: './update-candidate.component.html',
  styleUrls: ['./update-candidate.component.css']
})
export class UpdateCandidateComponent implements OnInit {
candidate:Candidate= {};
id:any;
jobRoles:any[]=['Java Developer','Python Developer','Testing','HR'];
  constructor(private router:Router,private activaedRoute:ActivatedRoute,private candidateService:CandidateService) { }

  ngOnInit(): void {
    this.id=this.activaedRoute.snapshot.params['id'];
    this.candidateService.getCandidateById(this.id).subscribe(data=>{
      this.candidate=data;
    },error=> window.alert(error.error)
    );
      
    }
  
  updateCandidate(candidate:Candidate){
    candidate.id=this.id;
    candidate.addedOn=this.candidate.addedOn;
   this.candidateService.updateCandidate(candidate).subscribe(data=>{
     window.alert(data);
   },error=> window.alert(error.error));
  }

}
