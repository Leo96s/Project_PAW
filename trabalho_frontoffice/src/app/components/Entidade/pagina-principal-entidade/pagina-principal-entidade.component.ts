import { Component } from '@angular/core';
import { BarraNavegacaoComponent } from '../barra-navegacao/barra-navegacao.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-principal-entidade',
  standalone: true,
  imports: [BarraNavegacaoComponent],
  templateUrl: './pagina-principal-entidade.component.html',
  styleUrl: './pagina-principal-entidade.component.css',
})
export class PaginaPrincipalEntidadeComponent {
  constructor(private router: Router) {}

  //Função que redireciona para a página de registo de entidade
  listaDoacoes() {
    this.router.navigate(['lista-doacoes']);
  }

  // Função que redireciona para a página de dashboards da entidade
  dashboards() {
    this.router.navigate(['dashboards-entidade']);
  }
}
