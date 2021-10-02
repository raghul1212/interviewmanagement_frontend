import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResultService } from 'src/app/services/result/result.service';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.css']
})
export class AddResultComponent implements OnInit {
  id:any;
  constructor(private router:Router,private activatedRoute:ActivatedRoute,
    private resultService:ResultService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];

  }
addResult(result:any){
  if (confirm("Do you want to add result for this interview?") == true) {
    result.updatedBy=localStorage.getItem('empEmail') as any as string;
    this.resultService.addResult(this.id,result).subscribe(data=>{
     this.showSuccess(data.message);
      this.router.navigate(['employeeManageInterview']);
    },error=> this.showError(error.error.message));
 
  } 
 
  
}

showSuccess(message:string){
  this.toastr.success(message);
}

showError(message:string){
  this.toastr.error(message);
}
 

}
