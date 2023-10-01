import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export abstract class BaseService {

  constructor(private http: HttpClient) { }

  protected SendHttpRequest(metodo: string, url: string, dados: any = null, contentType: any = null): Observable<any> {
    
    let request = this.http.request(metodo, url, {
      body: dados,
      headers: contentType ?? 'application/json'
    });

    const response = request.pipe(map((response: any) => response?.dados),
      catchError((error: any) => {
        console.error('Ocorreu um erro:', error);
        this.ApiErrorMessage(error.error.mensagens);

        return throwError(() => error);
      })
    );

    return response;
  }

  private ApiErrorMessage(mensagens: any): void {
    mensagens.forEach((mensagem: any) => {
      if (mensagem.tipo == 400) {
        console.error('API error: ' + mensagem.descricao);
      }
    });
  }
}
