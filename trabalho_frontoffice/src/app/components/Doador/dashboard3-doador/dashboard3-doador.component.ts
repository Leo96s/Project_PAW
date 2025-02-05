import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicoDoacaoService } from '../../../services/servico-doacao.service';
import { Doacao } from '../../../models/Doacao';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { ServicoUtilizadorService } from '../../../services/servico-utilizador.service';
import { Doador } from '../../../models/Utilizador';

@Component({
  selector: 'app-dashboard3-doador',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard3-doador.component.html',
  styleUrls: ['./dashboard3-doador.component.css'],
})
export class Dashboard3DoadorComponent implements OnInit {
  doador?: Doador;
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: false,
  };
  public barChartLabels: string[] = [];
  public barChartDatasets: ChartData<'bar'>['datasets'] = [];
  public barChartLegend = true;
  public barChartPlugins = [];

  constructor(
    private serviceDoacao: ServicoDoacaoService,
    private servicoUtilizador: ServicoUtilizadorService
  ) {}

  // Obtém o doador do serviço de utilizador
  ngOnInit(): void {
    this.servicoUtilizador.getDoador().subscribe((data: Doador) => {
      this.doador = data;
      if (this.doador && this.doador.nif) {
        this.serviceDoacao
          .obterDoacaoPorNIF(this.doador.nif)
          .subscribe((doacoes: Doacao[]) => {
            const doacoesAprovadas = this.filtrarDoacoesAprovadas(doacoes);
            const doacoesUltimosTresMeses =
              this.filtrarUltimosTresMeses(doacoesAprovadas);
            const groupedData = this.groupByMonth(doacoesUltimosTresMeses);
            this.createChart(groupedData);
          });
      }
    });
  }

  // Método para filtrar doações rejeitadas
  filtrarDoacoesAprovadas(doacoes: Doacao[]): Doacao[] {
    return doacoes.filter((doacao) => doacao.estadoDoacao === 'Rejeitado');
  }

  // Método para filtrar doações dos últimos três meses
  filtrarUltimosTresMeses(doacoes: Doacao[]): Doacao[] {
    const dataAtual = new Date();
    const tresMesesAtras = new Date(
      dataAtual.getFullYear(),
      dataAtual.getMonth() - 2,
      1
    ); // Começo do mês 3 meses atrás
    return doacoes.filter((doacao) => {
      if (doacao.dataDoacao && doacao.dataDoacao) {
        const dataDoacao = new Date(doacao.dataDoacao);
        return dataDoacao >= tresMesesAtras;
      }
      return false;
    });
  }

  // Método para agrupar as doações por mês
  groupByMonth(doacoes: Doacao[]): { [key: string]: number } {
    return doacoes.reduce((acc, doacao) => {
      if (doacao.dataDoacao && doacao.dataDoacao) {
        const dataDoacao = new Date(doacao.dataDoacao);
        const mesAno = `${dataDoacao.getFullYear()}-${(
          dataDoacao.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}`;
        acc[mesAno] = (acc[mesAno] || 0) + 1;
      }
      return acc;
    }, {} as { [key: string]: number });
  }

  // Método para criar o gráfico de barras
  createChart(data: { [key: string]: number }): void {
    this.barChartLabels = Object.keys(data).sort();
    this.barChartDatasets = [
      { data: Object.values(data), label: 'Número de Doações' },
    ];
  }
}
