import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { EventoService } from '../services/evento.service';
import { Evento } from '../models/Evento';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})

export class EventosComponent implements OnInit {
  modalRef?: BsModalRef;
  public larguraImagem: number = 150;
  public margemImagem: number = 2;
  public exibirImagem: boolean = true;

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  private _filtroLista: string = '';

  constructor(
    private eventoService: EventoService, 
    private modalService: BsModalService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.GetAllEventos();
  }

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ?
      this.FiltrarEventos(this.filtroLista) : this.eventos
  }

  public FiltrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.eventos.filter(evento =>
      evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );

  }

  public AlterarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  public async GetAllEventos(): Promise<void> {
    await this.eventoService.getEventos().then((_eventos: Evento[]) => {
      this.eventos = _eventos
      this.eventosFiltrados = this.eventos
    });
  }

  public openModal(template: TemplateRef<any>) : void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('Hello world!', 'Toastr fun!');

  }

  public decline(): void {
    this.modalRef?.hide();
  }
}

