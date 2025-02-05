import { Component } from '@angular/core';
import { BarraNavegacaoComponent } from '../barra-navegacao/barra-navegacao.component';
import { DetalhesDoadorComponent } from '../detalhes-doador/detalhes-doador.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { PontosDoadorComponent } from '../pontos-doador/pontos-doador.component';
import { GastarPontosComponent } from "../gastar-pontos/gastar-pontos.component";

@Component({
    selector: 'app-informacoes-doador',
    standalone: true,
    templateUrl: './informacoes-doador.component.html',
    styleUrl: './informacoes-doador.component.css',
    imports: [BarraNavegacaoComponent, DetalhesDoadorComponent, PontosDoadorComponent, NgbNavModule, GastarPontosComponent]
})
export class InformacoesDoadorComponent {
  active = 1;
}
