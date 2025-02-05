import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Doador } from '../../models/Utilizador';
import { AutenticationServiceService } from '../../services/autentication-service.service';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { IonicModule } from '@ionic/angular';
import { ServicoUtilizadorService } from '../../services/servico-utilizador.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-criar-doador',
  standalone: true,
  imports: [
    FormsModule,
    UploadFileComponent,
    IonicModule,
    NgbAlertModule,
    CommonModule,
  ],
  templateUrl: './criar-doador.component.html',
  styleUrl: './criar-doador.component.css',
})
export class CriarDoadorComponent implements OnInit {
  @Input() doador: Doador;
  registoError: string;

  constructor(
    private router: Router,
    private servicoAuth: AutenticationServiceService,
    private servicoUtilizador: ServicoUtilizadorService
  ) {
    this.doador = new Doador();
    this.registoError = '';
  }

  ngOnInit(): void {}

  // Método para criar um doador
  criarDoador(): void {
    this.servicoAuth.registerDoador(this.doador).subscribe(
      (data: Doador) => {
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

  // Método chamado ao fazer upload de um ficheiro
  onFileUploaded(filename: String) {
    this.doador.image = filename;
  }

  // Método para redirecionar o utilizador para a página de login
  login(): void {
    this.router.navigate(['//']);
  }
}
