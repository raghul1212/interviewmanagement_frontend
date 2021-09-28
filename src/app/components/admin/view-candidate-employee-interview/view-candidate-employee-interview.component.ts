import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Result, ResultService } from 'src/app/services/result/result.service';

@Component({
  selector: 'app-view-candidate-employee-interview',
  templateUrl: './view-candidate-employee-interview.component.html',
  styleUrls: ['./view-candidate-employee-interview.component.css']
})
export class ViewCandidateEmployeeInterviewComponent implements OnInit {
  id:any;
  result:Result={};
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private resultService:ResultService) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.reloadResultData();
  }

  reloadResultData(){
    this.resultService.getResultById(this.id).subscribe(data=>{
      this.result=data.data;
    },error=>window.alert(error.error));
  }

  backToList(){
    this.router.navigate(['manageResult']);
  }

}
