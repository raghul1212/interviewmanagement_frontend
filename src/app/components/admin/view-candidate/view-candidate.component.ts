import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CandidateService } from 'src/app/services/candidate/candidate.service';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrls: ['./view-candidate.component.css']
})
export class ViewCandidateComponent implements OnInit {
  candidates:any[]=[];
  pageOfItems: Array<any>=[];
  constructor(private candidateService:CandidateService, private toastr:ToastrService) { }

  ngOnInit(): void {
   this.reloadData();
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
  reloadData(){
    this.candidateService.getAllCandidate().subscribe(data=>{
      this.candidates=data.data;
    },error=>{ 
     this.showError(error.error.message)
    });
  }

 
  showError(message:string){
    this.toastr.error(message);
  }
 

}
