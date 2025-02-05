import { Component } from '@angular/core';
import { Dashboard1EntidadeComponent } from '../dashboard1-entidade/dashboard1-entidade.component';
import { BarraNavegacaoComponent } from '../barra-navegacao/barra-navegacao.component';
import { Dashboard2EntidadeComponent } from '../dashboard2-entidade/dashboard2-entidade.component';

@Component({
  selector: 'app-dashboards-entidade',
  standalone: true,
  imports: [Dashboard2EntidadeComponent, Dashboard1EntidadeComponent, BarraNavegacaoComponent],
  templateUrl: './dashboards-entidade.component.html',
  styleUrl: './dashboards-entidade.component.css'
})
export class DashboardsEntidadeComponent {
  //uniao de todos os dashboards criados para a entidade
}
