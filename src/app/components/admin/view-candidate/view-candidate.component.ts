import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Candidate } from 'src/app/dto/candidate/candidate';
import { CandidateService } from 'src/app/services/candidate/candidate.service';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrls: ['./view-candidate.component.css'],
})
export class ViewCandidateComponent implements OnInit {
  candidates: Candidate[] = [];//to store available candidate list
  pageOfItems: Array<Candidate> = [];//used for pagination
  constructor(
    private candidateService: CandidateService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.reloadData();
  }

  //this method is called whenever we move once intra-page in the html(pagination)
  onChangePage(pageOfItems: Array<Candidate>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  //loads all available candidate details as a list
  reloadData() {
    this.candidateService.getAllCandidate().subscribe(
      (data) => {
        this.candidates = data.data;
      },
      (error) => {
        this.showError(error.error.message);
      }
    );
  }

  //it is used to display error toastr message
  showError(message: string) {
    this.toastr.error(message);
  }
}
