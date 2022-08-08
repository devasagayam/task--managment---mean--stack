import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl=''

  constructor(private http:HttpClient,private router:Router) { 
    this.baseUrl='http://localhost:3000'
  }

  login(data:any){
    return this.http.post(this.baseUrl+'/users/login',data)
  }
  signup(data:any){
    return this.http.post(this.baseUrl+'/users',data)
  }

  userLogedIn(loggedData:any){
    localStorage.setItem('token',loggedData.token)
    localStorage.setItem('currentUser', JSON.stringify(loggedData.user));
  }

  public userIsLoggedIn() {
    let user = localStorage.getItem('currentUser');
    if (user) {
      let data = JSON.parse(user);
      if (data.user && data.user._id) {
        return data;
      } else {
        if (user) {
          return user;
        }
      }
    } else {
      return false;
    }

  }

  logOut(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('login')
  }

}
