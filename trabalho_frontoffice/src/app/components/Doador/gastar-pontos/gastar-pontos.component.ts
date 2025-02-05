import { Component } from '@angular/core';
import { Doador } from '../../../models/Utilizador';
import { ServicoUtilizadorService } from '../../../services/servico-utilizador.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Cartao } from '../../../models/Cartao';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MostrarCartaoComponent } from '../mostrar-cartao/mostrar-cartao.component';

@Component({
  selector: 'app-gastar-pontos',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './gastar-pontos.component.html',
  styleUrl: './gastar-pontos.component.css',
})
export class GastarPontosComponent {
  doador: Doador = new Doador();
  cartoes: Cartao[];
  points: number;
  error: string = '';
  cartao?: Cartao;

  quantias = [
    { value: 100, viewValue: '10€ - 100 pontos' },
    { value: 150, viewValue: '15€ - 150 pontos' },
    { value: 200, viewValue: '20€ - 200 pontos' },
  ];

  constructor(
    private servicoUtilizador: ServicoUtilizadorService,
    public dialog: MatDialog
  ) {
    this.points = 0;
    this.cartoes = [
      new Cartao('Steam', 0, ''),
      new Cartao('Amazon', 0, ''),
      new Cartao('Continente', 0, ''),
      new Cartao('Spotify', 0, ''),
    ];
  }

  ngOnInit(): void {
    this.servicoUtilizador.getDoador().subscribe((data: Doador) => {
      this.doador = data;
      if (this.doador.points) {
        this.points = this.doador.points;
      }
    });
  }

  // Método para resgatar um cartão
  resgatarCartao(i: number) {
    this.cartao = undefined;

    this.points -= this.cartoes[i].quantia;

    if (this.doador._id) {
      this.servicoUtilizador
        .resgatarCartao(this.cartoes[i], this.doador)
        .subscribe((data: Cartao) => {
          this.cartao = data;
          this.openDialog(this.cartao);
        });
    }
    this.resetCard(i);
  }

  // Método para reiniciar a quantia do cartão selecionado para zero
  resetCard(i: number) {
    this.cartoes[i].quantia = 0;
  }

  // Método para abrir o diálogo que mostra o cartão resgatado
  openDialog(cartao: Cartao) {
    const dialogRef = this.dialog.open(MostrarCartaoComponent, {
      data: cartao,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
