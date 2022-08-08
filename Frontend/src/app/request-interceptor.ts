import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor{

  constructor(private authService:AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    req=this.addAuthHeader(req)
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);

        if (error.status === 401) {
          // 401 error so we are unauthorized
          this.authService.logOut();
        }

        return throwError(error);
      })
    )
  }

  addAuthHeader(request: HttpRequest<any>) {
    // get the access token
    const token = localStorage.getItem('token');

    if (token) {
      // append the access token to the request header
      return request.clone({
        setHeaders: {
          'Authorization': 'Bearer '+ token
        }
      })
    }
    return request;
  }
}
