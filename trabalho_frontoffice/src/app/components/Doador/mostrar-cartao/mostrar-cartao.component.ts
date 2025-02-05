import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GastarPontosComponent } from '../gastar-pontos/gastar-pontos.component';
import { Cartao } from '../../../models/Cartao';
@Component({
  selector: 'app-mostrar-cartao',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './mostrar-cartao.component.html',
  styleUrl: './mostrar-cartao.component.css',
})
export class MostrarCartaoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Cartao) {}
}
