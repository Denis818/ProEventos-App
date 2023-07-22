import { Injectable } from '@angular/core';
import { Evento } from '../models/Evento';
import { BaseService } from './Base/base.service';
import { HttpClient, } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, } from 'rxjs';

@Injectable()
export class EventoService extends BaseService {

  private readonly Url = 'https://localhost:7186/api/Events';

  constructor(http: HttpClient) {
    super(http);
  }

  getEventos(): Observable<Evento[]> {
    return this.SendHttpRequest('GET', this.Url).pipe(
      map(response => response.data)
    );
  }

  getEventosByTema(tema: string): Observable<Evento[]> {
    return this.SendHttpRequest('GET', `${this.Url}/tema/${tema}`).pipe(
      map(response => response.data)
    );
  }

  getEventoById(id: number): Observable<Evento> {
    return this.SendHttpRequest('GET', `${this.Url}/${id}`).pipe(
      map(response => response.data)
    );
  }
}
