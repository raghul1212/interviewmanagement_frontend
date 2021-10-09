import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Result } from 'src/app/dto/result/result';
import { ResultService } from 'src/app/services/result/result.service';

@Component({
  selector: 'app-view-candidate-employee-interview',
  templateUrl: './view-candidate-employee-interview.component.html',
  styleUrls: ['./view-candidate-employee-interview.component.css'],
})
export class ViewCandidateEmployeeInterviewComponent implements OnInit {
  id: number=0;//id of the result to display details
  result: Result = {};//Result object whose details to be displayed
  length:number=1;//length of object, to check result object is empty or not. default length is 1, if object is empty, we replace with 0 after invoking loadResultData
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private resultService: ResultService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.reloadResultData();
  }

  //loads result data
  reloadResultData() {
    this.resultService.getResultById(this.id).subscribe(
      (data) => {
        this.result = data.data;
      },
      (error) =>{
        this.showError(error.error.message);
        this.length=0;
      } 
    );
  }

  //to go back to manageResult page
  backToList() {
    this.router.navigate(['manageResult']);
  }

  //to show error toastr message
  showError(message: string) {
    this.toastr.error(message);
  }
}
