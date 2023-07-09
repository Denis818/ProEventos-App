import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }
  constructor(public fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validation();
  }

  private validation(): void {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9 ()-]+$')]],
      funcao: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      senha: ['', [Validators.required, Validators.minLength(5)]],
      confirmeSenha: ['', Validators.required]
    })
  }

  public resetForm(): void {
    this.form.reset();
  }

}
