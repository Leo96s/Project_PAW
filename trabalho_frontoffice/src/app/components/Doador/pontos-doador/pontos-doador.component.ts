import { Component } from '@angular/core';
import { Utilizador } from '../../../models/Utilizador';
import { Doacao } from '../../../models/Doacao';
import { Doador } from '../../../models/Utilizador';
import { DetalhesDoadorComponent } from '../detalhes-doador/detalhes-doador.component';
import { ServicoDoacaoService } from '../../../services/servico-doacao.service';
import { ServicoUtilizadorService } from '../../../services/servico-utilizador.service';
import { CommonModule } from '@angular/common';
import { ModalDoacaoComponent } from '../../modal-doacao/modal-doacao.component';

@Component({
  selector: 'app-pontos-doador',
  standalone: true,
  imports: [DetalhesDoadorComponent, CommonModule, ModalDoacaoComponent],
  templateUrl: './pontos-doador.component.html',
  styleUrl: './pontos-doador.component.css',
})
export class PontosDoadorComponent {
  doacoes?: Doacao[];
  doador?: Doador;

  constructor(
    private servicoDoacao: ServicoDoacaoService,
    private servicoUtilizador: ServicoUtilizadorService
  ) {}

  // Obtém o doador atual através do serviço
  ngOnInit(): void {
    this.servicoUtilizador.getDoador().subscribe((data: Doador) => {
      this.doador = data;

      // Faça a chamada ao segundo serviço dentro do callback do primeiro
      if (this.doador && this.doador.nif) {
        this.servicoDoacao
          .obterDoacaoPorNIF(this.doador.nif)
          .subscribe((doacoes: Doacao[]) => {
            this.doacoes = doacoes;
            console.log(doacoes);
          });
      }
    });
  }
}
