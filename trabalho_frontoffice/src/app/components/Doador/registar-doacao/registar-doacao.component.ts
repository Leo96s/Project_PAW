import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Doacao } from '../../../models/Doacao';
import { Doador, Entidade } from '../../../models/Utilizador';
import { BarraNavegacaoComponent } from '../barra-navegacao/barra-navegacao.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ServicoDoacaoService } from '../../../services/servico-doacao.service';
import { ServicoUtilizadorService } from '../../../services/servico-utilizador.service';
import { UploadFilesComponent } from '../../upload-files/upload-files.component';

@Component({
  selector: 'app-registar-doacao',
  standalone: true,
  imports: [
    BarraNavegacaoComponent,
    UploadFilesComponent,
    FormsModule,
    IonicModule,
    CommonModule,
  ],
  templateUrl: './registar-doacao.component.html',
  styleUrl: './registar-doacao.component.css',
})
export class RegistarDoacaoComponent {
  @Input() doacao: Doacao;
  entidades: Entidade[] = [];
  doador?: Doador;

  constructor(
    private router: Router,
    private http: HttpClient,
    private servicoDoacao: ServicoDoacaoService,
    private servicoUtilizador: ServicoUtilizadorService
  ) {
    this.doacao = new Doacao();
  }

  // Obtém as entidades e as informações do doador disponíveis através do serviço
  ngOnInit() {
    this.servicoUtilizador.getEntidades().subscribe((entidade: Entidade[]) => {
      this.entidades = entidade;
    });

    this.servicoUtilizador.getDoador().subscribe((doador: Doador) => {
      this.doador = doador;
      this.doacao.nif = this.doador.nif; // Atribuir o NIF do doador à doação
    });
  }

  // Chama o serviço para registrar a doação
  criarDoacao(): void {
    console.log(this.doacao);
    this.servicoDoacao.registerDoacao(this.doacao).subscribe(
      (data: Doacao) => {
        alert('Doação efetuada!');
        this.doacaoEfetuada();
      },
      (error) => {
        console.error('Error during doacao creation:', error);
        alert('Erro ao efetuar a doação.');
      }
    );
  }

  // Navega para a página home do doador após a doação ser efetuada com sucesso
  doacaoEfetuada(): void {
    this.router.navigate(['/home-doador/']);
  }

  // Inicializa o array de peças de roupa se ainda não estiver inicializado
  addPecaRoupa(): void {
    this.doacao.pecaRoupa = this.doacao.pecaRoupa || [];
    this.doacao.pecaRoupa.push({
      tipo: '',
      qualidade: '',
      quantidade: 0,
      pontos: 0,
    });
  }

  // Remove uma peça de roupa do array pelo índice
  removePecaRoupa(index: number): void {
    if (this.doacao.pecaRoupa) {
      this.doacao.pecaRoupa.splice(index, 1);
    }
  }

  // Atribui os nomes dos arquivos de imagem carregados à propriedade images da doação
  onFilesUploaded(filename: String[]) {
    this.doacao.images = filename;
  }
}
