import { Component } from '@angular/core';
import { BarraNavegacaoComponent } from '../barra-navegacao/barra-navegacao.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-principal-doador',
  standalone: true,
  imports: [BarraNavegacaoComponent],
  templateUrl: './pagina-principal-doador.component.html',
  styleUrl: './pagina-principal-doador.component.css',
})
export class PaginaPrincipalDoadorComponent {
  constructor(private router: Router) {}

  //rota para lista de entidades
  listaEnt() {
    this.router.navigate(['lista-entidades']);
  }

  //rota para registo de doacao
  registoDoacao() {
    this.router.navigate(['registar-doacao']);
  }

  //rota para dashboards do doador
  dashboards() {
    this.router.navigate(['dashboards-doador']);
  }
}
