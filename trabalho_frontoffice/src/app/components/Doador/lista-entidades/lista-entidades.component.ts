import { Component } from '@angular/core';
import { ServicoUtilizadorService } from '../../../services/servico-utilizador.service';
import { Entidade } from '../../../models/Utilizador';
import { CommonModule } from '@angular/common';
import { BarraNavegacaoComponent } from '../barra-navegacao/barra-navegacao.component';
import { FiltrarEntidadesComponent } from '../filtrar-entidades/filtrar-entidades.component';

@Component({
  selector: 'app-lista-entidades',
  standalone: true,
  imports: [CommonModule, BarraNavegacaoComponent, FiltrarEntidadesComponent],
  templateUrl: './lista-entidades.component.html',
  styleUrl: './lista-entidades.component.css',
})
export class ListaEntidadesComponent {
  entidades?: Entidade[];
  entidadesFiltradas: Entidade[] = [];
  constructor(private servicoUtilizador: ServicoUtilizadorService) {}

  // Atualiza a lista de entidades com os dados recebidos do serviço
  ngOnInit() {
    this.servicoUtilizador.getEntidades().subscribe((data: Entidade[]) => {
      this.entidades = data;
      this.entidadesFiltradas = this.entidades;
    });
  }

  // Método para receber e aplicar filtros de pesquisa
  receberFiltros(filtros: any) {
    if (this.entidades) {
      this.entidadesFiltradas = this.entidades.filter((entidade) => {
        return (
          (filtros.nome
            ? entidade.name?.toLowerCase().includes(filtros.nome.toLowerCase())
            : true) &&
          (filtros.cidade
            ? entidade.city
                ?.toLowerCase()
                .includes(filtros.cidade.toLowerCase())
            : true) &&
          (filtros.estadoRegisto
            ? entidade.estadoRegisto === filtros.estadoRegisto
            : true)
        );
      });
    }
  }
}
