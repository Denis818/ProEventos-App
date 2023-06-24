import { Injectable } from '@angular/core';

@Injectable()
export abstract class BaseService {

  constructor() { }

  async SendHttpRequest(metodo: string, url: string, dados = null, contentType = null) {
    const response = await fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': contentType ?? 'application/json',
      },
      body: dados
    }).then(response => response.json()).catch(error => console.log(error.json()));

    return response;
  }
}