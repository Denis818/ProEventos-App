import { Injectable } from '@angular/core';
import { Evento } from '../models/Evento';
import { BaseService } from './Base/base.service';

@Injectable()
export class EventoService extends BaseService {

  private readonly Url = 'https://localhost:7186/api/Events';

  constructor() {
    super();
  }

  async getEventos(): Promise<Evento[]> {
    return await this.SendHttpRequest('GET', this.Url)
      .then(data => data?.data);
  }

  async getEventosByTema(tema: string): Promise<Evento[]> {
    return await this.SendHttpRequest('GET', `${this.Url}/tema/${tema}`)
      .then(data => data?.data);
  }

  async getEventoById(id: number): Promise<Evento> {
    return await this.SendHttpRequest('GET', `${this.Url}/${id}`)
      .then(data => data?.data);
  }
}
