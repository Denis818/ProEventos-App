import { Injectable } from '@angular/core';

@Injectable()
export abstract class BaseService {

  constructor() { }

  async SendHttpRequest(metodo: string, url: string, dados: any = null, contentType: any = null) {
    try {
      const response = await fetch(url, {
        method: metodo,
        headers: {
          'Content-Type': contentType ?? 'application/json',
        },
        body: dados
      });

      const data = await response.json();

      if (!response.ok){
        console.log(data);    
      }       

      return data;
    }
    catch (error) {
      console.log(error);
    }
  }
}
