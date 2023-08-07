import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export abstract class BaseService {

  constructor(private http: HttpClient) { }

  protected SendHttpRequest(metodo: string, url: string, dados: any = null, contentType: any = null): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': contentType ?? 'application/json',
    });

    let result = this.http.request(metodo, url, {
      body: dados,
      headers: headers
    })
      .pipe(map((response: any) => response?.dados),

        catchError((error: any) => {
          console.error('Ocorreu um erro:', error);
          this.ApiErrorMessage(error);

          return throwError(() => error);
        })
      );

    return result;
  }

  private ApiErrorMessage(error: any): void {
      error.error.Mensagens?.forEach((mensagem: any) => {
        if (mensagem.Tipo !== 200) {
          console.error('API error: ' + mensagem.Descricao);
        }
      });  
  }
}
