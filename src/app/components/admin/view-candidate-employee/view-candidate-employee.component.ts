import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Interview, InterviewService } from 'src/app/services/interview/interview.service';

@Component({
  selector: 'app-view-candidate-employee',
  templateUrl: './view-candidate-employee.component.html',
  styleUrls: ['./view-candidate-employee.component.css']
})
export class ViewCandidateEmployeeComponent implements OnInit {
  interview:Interview={};
  id:any;
  constructor(private router:Router,private activatedRoute:ActivatedRoute,
    private interviewService:InterviewService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.reloadInterviewData();
  }

  backToList(){
    this.router.navigate(['manageInterview']);
  }
reloadInterviewData(){
  this.interviewService.getInterviewById(this.id).subscribe(data=>{
    this.interview=data.data;
  },error=> this.showError(error.error.message)
  );
}

showError(message:string){
  this.toastr.error(message);
}

}
