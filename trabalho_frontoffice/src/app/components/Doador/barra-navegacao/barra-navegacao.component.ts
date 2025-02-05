import { Component, OnInit } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { Doador } from '../../../models/Utilizador';
import { ServicoUtilizadorService } from '../../../services/servico-utilizador.service';
import { LogoutComponent } from '../../logout/logout.component';
import { NotificacaoComponent } from '../../notificacao/notificacao.component';
import { ServicoDoacaoService } from '../../../services/servico-doacao.service';
import { Doacao } from '../../../models/Doacao';

@Component({
  selector: 'app-barra-navegacao',
  standalone: true,
  templateUrl: './barra-navegacao.component.html',
  styleUrl: './barra-navegacao.component.css',
  imports: [
    NgbCollapseModule,
    RouterLink,
    LogoutComponent,
    NotificacaoComponent,
  ],
})
export class BarraNavegacaoComponent implements OnInit {
  isMenuCollapsed = true;
  profilePic?: String;
  doacoes?: Doacao[];

  constructor(
    private servicoDoacao: ServicoDoacaoService,
    private servicoUtilizador: ServicoUtilizadorService
  ) {
    this.profilePic = '';
  }

  ngOnInit(): void {
    // Obtém o doador do serviço de utilizador
    this.servicoUtilizador.getDoador().subscribe((data: Doador) => {
      if (data.image) {
        // Se o doador tiver uma imagem, armazena a URL da imagem na propriedade profilePic
        var image = data.image;
        this.profilePic = image;
      }

      if (data && data.nif) {
        // Se o doador tiver um NIF, obtém as doações associadas a este NIF
        this.servicoDoacao
          .obterDoacaoPorNIF(data.nif)
          .subscribe((doacoes: Doacao[]) => {
            var count = 0;
            for (let index = 0; index < doacoes.length; index++) {
              const element = doacoes[index];
              if (element.estadoDoacao == 'Pendente') {
                if (!this.doacoes) {
                  this.doacoes = [];
                }
                this.doacoes[count++] = element;
              }
            }
          });
      }
    });
  }
}
