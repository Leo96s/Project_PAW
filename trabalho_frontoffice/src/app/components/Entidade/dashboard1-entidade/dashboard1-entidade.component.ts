import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicoDoacaoService } from '../../../services/servico-doacao.service';
import { Doacao } from '../../../models/Doacao';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { ServicoUtilizadorService } from '../../../services/servico-utilizador.service';
import { Entidade } from '../../../models/Utilizador';

@Component({
  selector: 'app-dashboard1-entidade',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard1-entidade.component.html',
  styleUrls: ['./dashboard1-entidade.component.css'],
})
export class Dashboard1EntidadeComponent implements OnInit {
  entidade?: Entidade; // Entidade atual
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: false,
  };
  public barChartLabels: string[] = []; // Rótulos do gráfico de barras (datas)
  public barChartDatasets: ChartData<'bar'>['datasets'] = []; // Dados do gráfico de barras
  public barChartLegend = true;
  public barChartPlugins = [];

  constructor(
    private serviceDoacao: ServicoDoacaoService,
    private servicoUtilizador: ServicoUtilizadorService
  ) {}

  ngOnInit(): void {
    // Obtém os detalhes da entidade através do serviço
    this.servicoUtilizador.getEntidade().subscribe((data: Entidade) => {
      this.entidade = data; // Define a entidade atual
      if (this.entidade && this.entidade.name) {
        // Obtém as doações aprovadas para a entidade atual
        this.serviceDoacao.getAprovadas().subscribe((doacoes: Doacao[]) => {
          // Filtra as doações da entidade atual
          const doacoesDaEntidade = this.filtrarDoacoesDaEntidade(
            doacoes,
            this.entidade!.name! // Utiliza o nome da entidade como filtro
          );
          // Agrupa as doações por dia e tipo de peça de roupa
          const doacoesPorDiaEPeca = this.agrupaPorDiaEPeça(doacoesDaEntidade);
          // Cria o gráfico de barras com os dados agrupados
          this.criarGrafico(doacoesPorDiaEPeca);
        });
      }
    });
  }

  // Filtra as doações para incluir apenas as da entidade atual
  filtrarDoacoesDaEntidade(doacoes: Doacao[], nomeEntidade: string): Doacao[] {
    return doacoes.filter((doacao) => doacao.nomeEntidade === nomeEntidade);
  }

  // Agrupa as doações por dia e tipo de peça de roupa
  agrupaPorDiaEPeça(doacoes: Doacao[]): { [key: string]: { [key: string]: number } } {
    return doacoes.reduce((acc, doacao) => {
      const dataDoacao = doacao.dataDoacao;
      if (dataDoacao) {
        const data = new Date(dataDoacao).toISOString().split('T')[0]; // Obtém a data no formato YYYY-MM-DD
        if (doacao.pecaRoupa) {
          doacao.pecaRoupa.forEach((peca) => {
            if (!acc[data]) {
              acc[data] = {};
            }
            // Incrementa a quantidade da peça de roupa para o dia correspondente
            acc[data][peca.tipo] = (acc[data][peca.tipo] || 0) + peca.quantidade;
          });
        }
      } else {
        console.warn('Data de doação não definida:', doacao);
      }
      return acc;
    }, {} as { [key: string]: { [key: string]: number } });
  }

  // Cria o gráfico de barras com os dados agrupados por dia e tipo de peça de roupa
  criarGrafico(data: { [key: string]: { [key: string]: number } }): void {
    // Define os rótulos do gráfico como as datas ordenadas
    this.barChartLabels = Object.keys(data).sort();
    // Obtém os tipos únicos de peças de roupa presentes nos dados
    const tiposPecas = Array.from(new Set(Object.values(data).flatMap(Object.keys)));
    // Cria os datasets para cada tipo de peça de roupa
    const datasets = tiposPecas.map((tipo) => ({
      label: tipo,
      data: this.barChartLabels.map((label) => data[label][tipo] || 0), // Preenche os dados de cada tipo de peça para cada dia
    }));
    // Define os datasets do gráfico de barras
    this.barChartDatasets = datasets;
  }
}