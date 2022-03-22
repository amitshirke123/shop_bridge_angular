import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor,
  } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  import { Injectable } from '@angular/core';
  import * as _ from 'lodash';
  @Injectable()
  export class ErrorInterceptor implements HttpInterceptor {
  
    constructor(
    ) { }
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            if (!!error.error.message) {
              this.handlErrorResponse(error.error);
            }
          } else {
  
            switch (error.status) {
              case 400: {
                alert(`Error Status: ${error.status}`);
                this.handlErrorResponse(error);
                break;
              }
              case 401: {
                alert(
                  `Error Status: ${error.status}\nMessage: Unauthorized`
                );
                break;
              }
              case 403: {
                alert(
                  `Error Status: ${error.status}\nMessage: Forbidden`
                );
                break;
              }
              case 405: {
                alert(
                  `Error Status: ${error.status}\nMessage: Method Not Allowed`
                );
                break;
              }
              case 409: {
                alert(
                  `Error Status: ${error.status}\nMessage: Conflict`
                );
                break;
              }
              case 422: {
                alert(
                  `Error Status: ${error.status}\nMessage: Unprocessable Entity`
                );
                break;
              }
              case 500: {
                alert(
                  `Error Status: ${error.status}\nMessage: Internal Server Error`
                );
                break;
              }
              case 501: {
                alert(
                  `Error Status: ${error.status}\nMessage: Service Unavailable`
                );
                break;
              }
              default: {
                alert('System error occured please contact our support team!');
                break;
              }
            }
          }
          return throwError(error);
        })
      );
    }

    handlErrorResponse(error: any) {
        if (!!error) {
          if (error.Errors !== undefined && error.Errors.length > 0) {
            _.each(error.Errors, (x: any) => {
              alert(x.message);
            });
          } else if (error.message !== undefined && error.message !== '') {
            alert(error.message);
          }
        } else {
          alert('System Error Occured Please contact our support team');
        }
      }
  }