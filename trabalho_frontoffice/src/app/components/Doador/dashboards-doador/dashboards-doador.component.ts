import { Component } from '@angular/core';
import { BarraNavegacaoComponent } from '../barra-navegacao/barra-navegacao.component';
import { Dashboard1DoadorComponent } from '../dashboard1-doador/dashboard1-doador.component';
import { Dashboard2DoadorComponent } from '../dashboard2-doador/dashboard2-doador.component';
import { Dashboard3DoadorComponent } from '../dashboard3-doador/dashboard3-doador.component';

@Component({
  selector: 'app-dashboards-doador',
  standalone: true,
  imports: [Dashboard3DoadorComponent, Dashboard2DoadorComponent, Dashboard1DoadorComponent, BarraNavegacaoComponent],
  templateUrl: './dashboards-doador.component.html',
  styleUrl: './dashboards-doador.component.css'
})
export class DashboardsDoadorComponent {
   //uniao entre todos os dashboards criados para o doador
}
