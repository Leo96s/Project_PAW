import { Component, OnInit } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { ServicoUtilizadorService } from '../../../services/servico-utilizador.service';
import { Entidade } from '../../../models/Utilizador';
import { LogoutComponent } from '../../logout/logout.component';
import { ServicoDoacaoService } from '../../../services/servico-doacao.service';
import { Doacao } from '../../../models/Doacao';
import { NotificacaoComponent } from "../../notificacao/notificacao.component";

@Component({
    selector: 'app-barra-navegacao',
    standalone: true,
    templateUrl: './barra-navegacao.component.html',
    styleUrl: './barra-navegacao.component.css',
    imports: [NgbCollapseModule, RouterLink, LogoutComponent, NotificacaoComponent]
})
export class BarraNavegacaoComponent implements OnInit {
  isMenuCollapsed = true;
  profilePic?: String;
  doacoes?: Doacao[];

  constructor(
    private servicoUtilizador: ServicoUtilizadorService,
    private servicoDoacao: ServicoDoacaoService
  ) {
    this.profilePic = '';
  }

  // Inicializa a variável de profile picture
  // Obtém os detalhes da entidade através do serviço
  ngOnInit(): void {
    this.servicoUtilizador.getEntidade().subscribe((data: Entidade) => {
      if (data.images) {
        var image = data.images[0];
        this.profilePic = image;
      }
      if (data && data.name) {
        this.servicoDoacao
          .obterDoacoesPorEntidade(data.name)
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
