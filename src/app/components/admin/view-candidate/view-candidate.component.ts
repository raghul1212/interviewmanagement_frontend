import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate, CandidateService } from 'src/app/services/candidate/candidate.service';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrls: ['./view-candidate.component.css']
})
export class ViewCandidateComponent implements OnInit {
  candidates:any[]=[];
  shouldViewByCandidateName:boolean=false;
  pageOfItems: Array<any>=[];
  constructor(private candidateService:CandidateService) { }

  ngOnInit(): void {
   this.reloadData();
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
  reloadData(){
    this.candidateService.getAllCandidate().subscribe(data=>{
      this.candidates=data;
    });
  }

  viewByCandidateName(){
    this.shouldViewByCandidateName=true;
    console.log('view by can name');
  }
  showDetails(value:any){
    console.log(value);
  //  this.candidateService.getCandidateByName(value.name).subscribe(data=>{
  //   this.candidates=data;
  //  });

  }

}
