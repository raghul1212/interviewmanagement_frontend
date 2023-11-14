import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css'],
})
export class CandidateComponent implements OnInit {
  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('canEmail');
    this.router.navigate(['login']);
    this.showSuccess();
  }

  showSuccess() {
    this.toastr.success('Logged out successfully!');
  }
}
