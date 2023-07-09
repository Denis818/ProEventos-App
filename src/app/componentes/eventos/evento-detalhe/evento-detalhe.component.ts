import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent {

  form: FormGroup;

  get f(): any {
    return this.form.controls;
  }
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validation();
  }

  public validation(): void {

    this.form = this.fb.group(
      {
        tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        local: ['', [Validators.required]],
        dataEvento: ['', [Validators.required, Validators.pattern('^[0-9 /-]+$')]],
        qtdPessoas: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.max(120000)]],
        telefone: ['', [Validators.required, Validators.pattern('^[0-9 ()-]+$')]],
        email: ['', [Validators.required, Validators.email]],
        imagemURL: ['', [Validators.required]],
      }
    )
  }

  public resetForm(): void {
    this.form.reset();
  }
}
