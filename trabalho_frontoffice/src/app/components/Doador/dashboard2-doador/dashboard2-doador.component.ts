import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicoDoacaoService } from '../../../services/servico-doacao.service';
import { Doacao } from '../../../models/Doacao';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { ServicoUtilizadorService } from '../../../services/servico-utilizador.service';
import { Doador } from '../../../models/Utilizador';

@Component({
  selector: 'app-dashboard2-doador',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard2-doador.component.html',
  styleUrls: ['./dashboard2-doador.component.css'],
})
export class Dashboard2DoadorComponent implements OnInit {
  doador?: Doador; // Armazena o doador obtido do serviço de utilizador

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: false, // Define que o gráfico não é responsivo
  };
  public barChartLabels: string[] = []; // Labels do gráfico de barras
  public barChartDatasets: ChartData<'bar'>['datasets'] = []; // Dados do gráfico de barras
  public barChartLegend = true; // Exibir a legenda do gráfico
  public barChartPlugins = []; // Plugins do gráfico (vazio por enquanto)

  constructor(
    private serviceDoacao: ServicoDoacaoService,
    private servicoUtilizador: ServicoUtilizadorService
  ) {}

  ngOnInit(): void {
    // Método de ciclo de vida do Angular chamado após a inicialização do componente

    // Obtém o doador do serviço de utilizador
    this.servicoUtilizador.getDoador().subscribe((data: Doador) => {
      this.doador = data; // Armazena o doador obtido
      if (this.doador && this.doador.nif) {
        // Verifica se o doador e o NIF estão disponíveis
        // Obtém as doações do doador pelo NIF
        this.serviceDoacao
          .obterDoacaoPorNIF(this.doador.nif)
          .subscribe((doacoes: Doacao[]) => {
            // Filtra as doações aprovadas
            const doacoesAprovadas = this.filtrarDoacoesAprovadas(doacoes);
            // Filtra as doações dos últimos três meses
            const doacoesUltimosTresMeses =
              this.filtrarUltimosTresMeses(doacoesAprovadas);
            // Agrupa as doações por mês
            const groupedData = this.groupByMonth(doacoesUltimosTresMeses);
            // Cria o gráfico com os dados agrupados
            this.createChart(groupedData);
          });
      }
    });
  }

  // Método para filtrar doações aprovadas
  filtrarDoacoesAprovadas(doacoes: Doacao[]): Doacao[] {
    return doacoes.filter((doacao) => doacao.estadoDoacao === 'Aprovado');
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
      if (doacao.dataDoacao) {
        const dataDoacao = new Date(doacao.dataDoacao);
        return dataDoacao >= tresMesesAtras;
      }
      return false;
    });
  }

  // Método para agrupar as doações por mês
  groupByMonth(doacoes: Doacao[]): { [key: string]: number } {
    return doacoes.reduce((acc, doacao) => {
      if (doacao.dataDoacao) {
        const dataDoacao = new Date(doacao.dataDoacao);
        const mesAno = `${dataDoacao.getFullYear()}-${(
          dataDoacao.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}`;
        acc[mesAno] = (acc[mesAno] || 0) + 1; // Incrementa o contador para o mês correspondente
      }
      return acc;
    }, {} as { [key: string]: number });
  }

  // Método para criar o gráfico de barras
  createChart(data: { [key: string]: number }): void {
    this.barChartLabels = Object.keys(data).sort(); // Define as labels do gráfico como as chaves do objeto data, ordenadas
    this.barChartDatasets = [
      { data: Object.values(data), label: 'Número de Doações' },
    ]; // Define os dados do gráfico como os valores do objeto data
  }
}
