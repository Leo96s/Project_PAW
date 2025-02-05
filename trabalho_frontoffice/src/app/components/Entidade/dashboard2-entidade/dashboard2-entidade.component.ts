import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicoDoacaoService } from '../../../services/servico-doacao.service';
import { Doacao } from '../../../models/Doacao';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartData } from 'chart.js';
import { ServicoUtilizadorService } from '../../../services/servico-utilizador.service';
import { Entidade } from '../../../models/Utilizador';

@Component({
  selector: 'app-dashboard2-entidade',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard2-entidade.component.html',
  styleUrls: ['./dashboard2-entidade.component.css'],
})
export class Dashboard2EntidadeComponent implements OnInit {
  entidade?: Entidade; // Entidade atual
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: false,
  };
  public barChartLabels: string[] = []; // Rótulos do gráfico de barras (meses no formato YYYY-MM)
  public barChartDatasets: ChartData<'bar'>['datasets'] = []; // Dados do gráfico de barras
  public barChartLegend = true; // Exibe a legenda do gráfico
  public barChartPlugins = []; // Plugins opcionais para o gráfico

  constructor(
    private serviceDoacao: ServicoDoacaoService,
    private servicoUtilizador: ServicoUtilizadorService
  ) {}

  ngOnInit(): void {
    // Obtém os detalhes da entidade atual
    this.servicoUtilizador.getEntidade().subscribe((data: Entidade) => {
      this.entidade = data; // Define a entidade atual
      if (this.entidade && this.entidade.name) {
        // Obtém as doações aprovadas para a entidade atual
        this.serviceDoacao.getAprovadas().subscribe((doacoes: Doacao[]) => {
          // Filtra as doações da entidade atual
          const doacoesDaEntidade = this.filtrarDoacoesDaEntidade(doacoes, this.entidade!.name!);
          // Filtra as doações dos últimos três meses
          const doacoesUltimosTresMeses = this.filtrarUltimosTresMeses(doacoesDaEntidade);
          // Agrupa as doações por mês
          const doacoesPorMes = this.agrupaPorMes(doacoesUltimosTresMeses);
          // Cria o gráfico de barras com os dados agrupados por mês
          this.criarGrafico(doacoesPorMes);
        });
      }
    });
  }

  // Filtra as doações para incluir apenas as da entidade atual
  filtrarDoacoesDaEntidade(doacoes: Doacao[], nomeEntidade: string): Doacao[] {
    return doacoes.filter(doacao => doacao.nomeEntidade === nomeEntidade);
  }

  // Filtra as doações para incluir apenas as dos últimos três meses
  filtrarUltimosTresMeses(doacoes: Doacao[]): Doacao[] {
    const dataAtual = new Date();
    const tresMesesAtras = new Date(dataAtual.getFullYear(), dataAtual.getMonth() - 3, dataAtual.getDate());
    return doacoes.filter(doacao => {
      const dataDoacao = new Date();
      return dataDoacao >= tresMesesAtras;
    });
  }

  // Agrupa as doações por mês e conta o número de doações por mês
  agrupaPorMes(doacoes: Doacao[]): { [key: string]: number } {
    return doacoes.reduce((acc, doacao) => {
      const dataDoacao = doacao.dataDoacao;
      if (dataDoacao) {
      const dataDoacao = new Date();
      const mesAno = `${dataDoacao.getFullYear()}-${(dataDoacao.getMonth() + 1).toString().padStart(2, '0')}`;
      acc[mesAno] = (acc[mesAno] || 0) + 1;
      }
      return acc;
    }, {} as { [key: string]: number });
  }

  // Cria o gráfico de barras com os dados agrupados por mês
  criarGrafico(data: { [key: string]: number }): void {
    this.barChartLabels = Object.keys(data).sort(); // Define os rótulos do gráfico como os meses ordenados
    this.barChartDatasets = [{ data: Object.values(data), label: 'Número de Doações' }]; // Define os dados do gráfico
  }
}