import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { TaskService } from 'src/app/task.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public password:any;
  public email:any;
  public name:any;
  constructor(private taskServeice:TaskService,private router: Router, private authService:AuthService) { }

  ngOnInit(): void {
  }

  onSignupButtonClicked(){
    this.authService.signup({email:this.email,password:this.password,name:this.name}).subscribe((response:any)=>{
      if(response.user){
        this.authService.userLogedIn(response);
        this.router.navigate(['/'])
      }
    })
  }

}
