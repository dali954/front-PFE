import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GitlabProjectInterceptor implements HttpInterceptor {

  token : string="glpat-Mya-QzqZZz97oBhet99G"
  constructor() {}



  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url =request.url;
    if(url.includes('http://localhost:8082/api/gitlab')){
      const gitlabrequest=request.clone({

        setHeaders:{Authorization:this.token}
        
      })
      console.log("gitlab:",gitlabrequest );
      return next.handle(gitlabrequest);


    }else
    return next.handle(request);
  }
}
