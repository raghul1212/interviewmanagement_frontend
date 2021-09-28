import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate, CandidateService } from 'src/app/services/candidate/candidate.service';

@Component({
  selector: 'app-view-candidate-by-id',
  templateUrl: './view-candidate-by-id.component.html',
  styleUrls: ['./view-candidate-by-id.component.css']
})
export class ViewCandidateByIdComponent implements OnInit {
  candidate:Candidate={};
  id:any;
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private candidateService:CandidateService) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.reloadCandidateData();
  }

  backToList(){
    this.router.navigate(['employeeManageInterview']);
  }
  reloadCandidateData(){
    this.candidateService.getCandidateById(this.id).subscribe(data=>{
      this.candidate=data.data;
     });
  }

}
