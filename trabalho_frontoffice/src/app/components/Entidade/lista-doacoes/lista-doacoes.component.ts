import { Component, OnInit } from '@angular/core';
import { BarraNavegacaoComponent } from '../barra-navegacao/barra-navegacao.component';
import { Doacao } from '../../../models/Doacao';
import { ServicoDoacaoService } from '../../../services/servico-doacao.service';
import { Entidade } from '../../../models/Utilizador';
import { ServicoUtilizadorService } from '../../../services/servico-utilizador.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalDoacaoComponent } from '../../modal-doacao/modal-doacao.component';

@Component({
  selector: 'app-lista-doacoes',
  standalone: true,
  imports: [
    BarraNavegacaoComponent,
    CommonModule,
    FormsModule,
    ModalDoacaoComponent,
  ],
  templateUrl: './lista-doacoes.component.html',
  styleUrls: ['./lista-doacoes.component.css'],
})
export class ListaDoacoesComponent implements OnInit {
  doacoes: Doacao[] = [];
  entidade?: Entidade;
  filteredDoacoes: Doacao[] = [];

  // Variáveis para os filtros
  filtroNIF: string = '';
  filtroData: string = '';
  filtroEstado: string = '';

  constructor(
    private servicoDoacao: ServicoDoacaoService,
    private servicoUtilizador: ServicoUtilizadorService
  ) {}

  // Obtém os detalhes da entidade atual
  // Carrega as doações associadas à entidade
  ngOnInit(): void {
    this.servicoUtilizador.getEntidade().subscribe((data: Entidade) => {
      this.entidade = data;
      console.log(this.entidade.name);
      if (this.entidade && this.entidade.name) {
        this.servicoDoacao
          .obterDoacoesPorEntidade(this.entidade.name)
          .subscribe((data: Doacao[]) => {
            this.doacoes = data;
            this.filteredDoacoes = this.doacoes; // Inicializa a lista filtrada com todas as doações
            this.filtrarDoacoes(); // Filtrar a lista inicial
          });
      }
    });
  }

  // Carrega doações pendentes
  loadPendentes(): void {
    this.servicoDoacao.getPendentes().subscribe((data) => {
      this.doacoes = data;
      this.filteredDoacoes = this.doacoes;
      this.filtrarDoacoes(); // Filtrar a lista após carregar pendentes
    });
  }

  // Carrega todas as doações associadas à entidade
  loadDoacoes(): void {
    if (this.entidade && this.entidade.name) {
      this.servicoDoacao
        .obterDoacoesPorEntidade(this.entidade.name)
        .subscribe((data: Doacao[]) => {
          this.doacoes = data;
          this.filteredDoacoes = this.doacoes;
          this.filtrarDoacoes(); // Filtrar a lista após carregar doações
        });
    }
  }

  // Aplica os filtros às doações
  filtrarDoacoes(): void {
    this.filteredDoacoes = this.doacoes.filter((doacao) => {
      const dataDoacao = doacao.dataDoacao
        ? new Date(doacao.dataDoacao)
        : undefined;
      const dataDoacaoFormatada = dataDoacao
        ? this.formatarData(dataDoacao)
        : '';
      return (
        (!this.filtroNIF ||
          (doacao.nif && doacao.nif.includes(this.filtroNIF))) &&
        (!this.filtroData || dataDoacaoFormatada === this.filtroData) &&
        (!this.filtroEstado || doacao.estadoDoacao === this.filtroEstado)
      );
    });
  }

  // Formata a data no formato 'YYYY-MM-DD'
  formatarData(data: Date): string {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${ano}-${mes}-${dia}`;
  }
}
