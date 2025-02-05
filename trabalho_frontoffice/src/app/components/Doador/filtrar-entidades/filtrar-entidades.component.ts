import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtrar-entidades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtrar-entidades.component.html',
  styleUrl: './filtrar-entidades.component.css',
})
export class FiltrarEntidadesComponent {
  @Output() onFiltrosAplicados = new EventEmitter<any>();

  filtros = {
    nome: '',
    cidade: '',
    estadoRegisto: '',
  };

  // Método para aplicar os filtros e emitir o evento com os filtros aplicados
  aplicarFiltros() {
    this.onFiltrosAplicados.emit(this.filtros);
  }
}
