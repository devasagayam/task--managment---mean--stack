import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { TaskService } from 'src/app/task.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public password:any;
  public email:any;
  constructor(private taskServeice:TaskService,private router: Router, private authService:AuthService) { }

  ngOnInit(): void {
  }
  onLoginButtonClicked(){
    this.authService.login({email:this.email,password:this.password}).subscribe((response:any)=>{
      if(response.token){
        this.authService.userLogedIn(response);
        this.router.navigate(['/'])
      }
      
    })
  }
}
