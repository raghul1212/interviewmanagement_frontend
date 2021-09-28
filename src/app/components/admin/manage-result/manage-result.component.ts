import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Result, ResultService } from 'src/app/services/result/result.service';

@Component({
  selector: 'app-manage-result',
  templateUrl: './manage-result.component.html',
  styleUrls: ['./manage-result.component.css']
})
export class ManageResultComponent implements OnInit {
  id?:any;
  results:Result[]=[];
  pageOfItems: Array<any>=[];

  constructor(private router:Router,private resultService:ResultService,private adminService:AdminService) { }

    ngOnInit(): void {
      this.reloadResultData();
    }
    onChangePage(pageOfItems: Array<any>) {
      // update current page of items
      this.pageOfItems = pageOfItems;
  }
  updateResult(id:any){
    this.router.navigate(['updateResult',id]);
  }
  viewInterviewDetails(id:any){
    this.router.navigate(['viewCandidateEmployeeInterview',id]);
  }
  sendMail(result:Result){
   this.adminService.sendResultMail(result).subscribe(data=>{
    window.alert(data.message);
   },error=> window.alert(error.error));
  }

  reloadResultData(){
  this.resultService.getAllResult().subscribe(data=>{
    this.results=data.data;
  });
  }
}
