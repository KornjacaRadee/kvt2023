import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth.service.service';
import { PostService } from 'src/app/services/post.service';


@Injectable()
export class TokeninterceptorInterceptor implements HttpInterceptor {

  constructor(public auth: AuthServiceService, post:PostService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.tokenInUse()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.findToken()}`
        }
      });
    }
    return next.handle(request);
  }
}
