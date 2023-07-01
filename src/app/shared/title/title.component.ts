import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() titulo? : string;
  @Input() iconClass? : string = 'fa fa-user';
  @Input() subtitulo? : string = 'Desde 2011'
  @Input() botaoListar: Boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public listar(): void {
    this.router.navigate([`/${this.titulo?.toLocaleLowerCase()}/lista`])
  }
}
