import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})

export class EventosComponent implements OnInit {
  public larguraImagem: number = 150;
  public margemImagem: number = 2;
  public exibirImagem: boolean = true;

  public eventos: any = [];
  public eventosFiltrados: any = [];
  private _filtroLista: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.eventos.filter((evento: any) => 
      evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1)
  }

  alterarImagem() {
    this.exibirImagem = !this.exibirImagem;
  }

  public getEventos(): void {
    this.http.get('https://localhost:7186/api/Events').subscribe(
      response => {
        this.eventos = response
        this.eventosFiltrados = this.eventos
      },
      error => console.log(error)
    ); 
  }
}