import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export abstract class BaseService {

  constructor(private http: HttpClient) { }

  SendHttpRequest(metodo: string, url: string, dados: any = null, contentType: any = null): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': contentType ?? 'application/json',
    });

    return this.http.request(metodo, url, {
      body: dados,
      headers: headers
    }).pipe(
      catchError((error: any) => {
        console.error('Ocorreu um erro:', error);
        return throwError(() => error);
      })
    );
  }
}
