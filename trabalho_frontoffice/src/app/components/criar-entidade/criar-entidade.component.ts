import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Entidade } from '../../models/Utilizador';
import { AutenticationServiceService } from '../../services/autentication-service.service';
import { UploadFilesComponent } from '../upload-files/upload-files.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-criar-entidade',
  standalone: true,
  imports: [
    FormsModule,
    UploadFilesComponent,
    IonicModule,
    CommonModule,
    NgbAlertModule,
  ],
  templateUrl: './criar-entidade.component.html',
  styleUrl: './criar-entidade.component.css',
})
export class CriarEntidadeComponent {
  @Input() entidade: Entidade;
  registoError: string;

  constructor(
    private router: Router,
    private servicoAuth: AutenticationServiceService
  ) {
    this.entidade = new Entidade();
    this.registoError = '';
  }

  ngOnInit(): void {}

  // Método para criar uma entidade
  criarEntidade(): void {
    this.servicoAuth.registerEntidade(this.entidade).subscribe(
      (data: Entidade) => {
        alert('Registo Bem Sucedido!');
        this.login();
      },
      (err: any) => {
        console.log(err.error);

        // error callback
        this.registoError = err.error.message;

        setTimeout(() => (this.registoError = ''), 50000);
      }
    );
  }

  // Método chamado ao fazer upload de ficheiro
  onFilesUploaded(filename: String[]) {
    this.entidade.images = filename;
  }

   // Método para redirecionar o utilizador para a página inicial após o registo
  login(): void {
    this.router.navigate(['//']);
  }
}
