import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

/*
AUTH INTERCEPTOR
Intercepts all HTTP requests for this website
Inserts the BioIdToken into the header from local storage
resends the request
*/

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //take token from storage
        const token = localStorage.getItem('BioIdToken');

        //if no token then resend request
        if(!token){
            return next.handle(req);
        }

        //clone the request and insert the token with Bearer into the header under Authorization
        const tempReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
        });

        //send the cloned request
        return next.handle(tempReq);
    }
}