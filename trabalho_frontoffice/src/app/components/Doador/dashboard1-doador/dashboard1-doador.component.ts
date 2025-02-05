import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicoDoacaoService } from '../../../services/servico-doacao.service';
import { Doacao } from '../../../models/Doacao';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard1-doador',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard1-doador.component.html',
  styleUrls: ['./dashboard1-doador.component.css'],
})
export class Dashboard1DoadorComponent implements OnInit {
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false, // Define que o gráfico não é responsivo
  };
  public pieChartLabels: string[] = []; // Labels do gráfico de pizza
  public pieChartDatasets: { data: number[]; labels: 'Número de Doações' }[] = []; // Dados do gráfico de pizza
  public pieChartLegend = true; // Exibir a legenda do gráfico
  public pieChartPlugins = []; // Plugins do gráfico (vazio por enquanto)

  constructor(private serviceDoacao: ServicoDoacaoService) {}

  ngOnInit(): void {
    // Método de ciclo de vida do Angular chamado após a inicialização do componente

    // Obtém as doações aprovadas do serviço de doações
    this.serviceDoacao.getAprovadas().subscribe((doacoes: Doacao[]) => {
      // Agrupa as doações por entidade
      const groupedData = this.groupByEntity(doacoes);
      // Cria o gráfico com os dados agrupados
      this.createChart(groupedData);
    });
  }

  // Método para agrupar as doações por entidade
  groupByEntity(doacoes: Doacao[]): { [key: string]: number } {
    return doacoes.reduce((acc, doacao) => {
      const nomeEntidade = doacao.nomeEntidade ?? 'Desconhecido'; // Define 'Desconhecido' se nomeEntidade for nulo ou indefinido
      acc[nomeEntidade] = (acc[nomeEntidade] || 0) + 1; // Incrementa o contador para a entidade correspondente
      return acc;
    }, {} as { [key: string]: number }); // Inicializa acc como um objeto vazio
  }

  // Método para criar o gráfico de pizza
  createChart(data: { [key: string]: number }): void {
    this.pieChartLabels = Object.keys(data); // Define as labels do gráfico como as chaves do objeto data
    this.pieChartDatasets = [
      { data: Object.values(data), labels: 'Número de Doações' }, // Define os dados do gráfico como os valores do objeto data
    ];
  }
}
