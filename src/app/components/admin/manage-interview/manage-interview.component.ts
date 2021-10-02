import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Interview, InterviewService } from 'src/app/services/interview/interview.service';

@Component({
  selector: 'app-manage-interview',
  templateUrl: './manage-interview.component.html',
  styleUrls: ['./manage-interview.component.css']
})
export class ManageInterviewComponent implements OnInit {
  interviews:Interview[]=[] ;
  pageOfItems: Array<any>=[];
  constructor(private router:Router,private interviewService:InterviewService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.reloadData();
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
  reloadData(){
   this.interviewService.getAllInterview().subscribe(data=>{
    this.interviews=data.data;
   },error=> this.showError(error.error.message));
  }

  updateInterview(id:any){
    this.router.navigate(['updateInterview',id]);
  }

  cancelInterview(interview:any){
    if(window.confirm('Are you sure to cancel this interview?')==true){
      interview.updatedBy=localStorage.getItem('adminEmail') as any as string;
      interview.status='Cancelled';
      this.interviewService.updateInterview(interview).subscribe(data=>{
      this.showSuccess(data.message);
      },error=> this.showError(error.error.message));
     
    }
   
  }
  viewCandidateAndEmployee(id:any){
    this.router.navigate(['viewCandidateEmployee',id]);
  }
  showSuccess(message:string){
    this.toastr.success(message);
  }

  showError(message:string){
    this.toastr.error(message);
  }
}
