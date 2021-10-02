import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Candidate, CandidateService } from 'src/app/services/candidate/candidate.service';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {
  candidate:Candidate[]=[];
  jobRoles:any;
  experienceArray:any;
  role?:string;
  email?:string;
  isValidRole:boolean=true;
  constructor(private candidateService:CandidateService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('canEmail')==null){
      this.showInfo();
      this.router.navigate(['login']);
    }else{
      this.reloadJobRoleData();
      this.reloadExperienceData();
    }
    
  }

  addCandidate(candidate:Candidate){
    localStorage.setItem('canEmail',candidate.emailId as any as string);
    candidate.updatedBy=localStorage.getItem('canEmail') as any as string;
    this.candidateService.addCandidate(candidate).subscribe(data=>{
      this.showSuccess(data.message);
      this.router.navigate(['viewCurrentApplication']);
    },error=>this.showError(error.error.message)
    );
   
  }

reloadExperienceData(){
  this.candidateService.getAllExperience().subscribe(data=>{
    this.experienceArray=data.data;
  });
}

reloadJobRoleData(){
  this.candidateService.getAllJobRole().subscribe(data=>{
    this.jobRoles=data.data;
  });
}


setRole(role:string){
this.role=role;
this.validateRole();
}
setEmail(email:string){
this.email=email;
this.validateRole();
}
validateRole():boolean{
  if(this.email !=null && this.role !=null){
    const candidate=new Candidate();
    candidate.emailId=this.email;
    candidate.jobRole=this.role;
    this.candidateService.validateRole(candidate).subscribe(data=>{
      this.isValidRole=data.data;
    },error=>{
     this.showError(error.error.message);
      return false;
    } 
  );
 
  }
  return false;
}
  showInfo(){
    this.toastr.info('Log in to continue');
  }
  showSuccess(message:string){
    this.toastr.success(message);
  }

  showError(message:string){
    this.toastr.error(message);
  }
}
