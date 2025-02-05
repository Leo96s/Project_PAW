import { Component, OnInit } from '@angular/core';
import { Entidade } from '../../../models/Utilizador';
import { ServicoUtilizadorService } from '../../../services/servico-utilizador.service';
import { BarraNavegacaoComponent } from '../barra-navegacao/barra-navegacao.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadFilesComponent } from '../../upload-files/upload-files.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VisualizarImagemComponent } from '../../visualizar-imagem/visualizar-imagem.component';
import { IonicModule } from '@ionic/angular';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalhes-entidade',
  standalone: true,
  imports: [
    BarraNavegacaoComponent,
    VisualizarImagemComponent,
    NgbModule,
    CommonModule,
    FormsModule,
    UploadFilesComponent,
    IonicModule,
    NgbAlertModule,
  ],
  templateUrl: './detalhes-entidade.component.html',
  styleUrl: './detalhes-entidade.component.css',
})
export class DetalhesEntidadeComponent implements OnInit {
  entidade: Entidade = new Entidade();
  editing: boolean = false;
  updateError: string;
  originalEntidade: Entidade = new Entidade();

  constructor(private servicoUtilizador: ServicoUtilizadorService) {
    this.updateError = '';
  }

  // Obtém os detalhes da entidade atual
  ngOnInit(): void {
    this.servicoUtilizador.getEntidade().subscribe((data: Entidade) => {
      this.entidade = data;
      this.originalEntidade = data;
    });
  }

  // Permite alternar entre modo de edição e não edição
  toggleEdit() {
    this.editing = !this.editing;
    this.entidade.password = '';
  }

  // Salvar as alterações feitas na entidade
  saveChanges() {
    const updatedEntidade: Entidade = this.entidade;

    if (this.entidade.name !== this.originalEntidade.name) {
      updatedEntidade.name = this.entidade.name;
    }
    if (this.entidade.email !== this.originalEntidade.email) {
      updatedEntidade.email = this.entidade.email;
    }
    if (this.entidade.password !== this.originalEntidade.password) {
      updatedEntidade.password = this.entidade.password;
    }
    if (this.entidade.nif !== this.originalEntidade.nif) {
      updatedEntidade.nif = this.entidade.nif;
    }
    if (this.entidade.phone !== this.originalEntidade.phone) {
      updatedEntidade.phone = this.entidade.phone;
    }
    if (this.entidade.missao !== this.originalEntidade.missao) {
      updatedEntidade.missao = this.entidade.missao;
    }
    if (this.entidade.atividades !== this.originalEntidade.atividades) {
      updatedEntidade.atividades = this.entidade.atividades;
    }
    if (this.entidade.website !== this.originalEntidade.website) {
      updatedEntidade.website = this.entidade.website;
    }
    if (this.entidade.city !== this.originalEntidade.city) {
      updatedEntidade.city = this.entidade.city;
    }
    if (this.entidade.address !== this.originalEntidade.address) {
      updatedEntidade.address = this.entidade.address;
    }

    // Verifica se há alguma alteração antes de enviar
    if (Object.keys(updatedEntidade).length > 0) {
      this.servicoUtilizador.editEntidade(updatedEntidade).subscribe(
        (data) => {
          this.entidade = data;
          this.editing = false;
        },
        (err: any) => {
          console.log(err.error);

          // error callback
          this.updateError = err.error.message;

          setTimeout(() => (this.updateError = ''), 50000);
        }
      );
    } else {
      this.editing = false;
    }
  }

  // Cancela a edição e restaura os detalhes da entidade para os valores originais
  cancelEdit() {
    this.entidade = this.originalEntidade;
    this.editing = false;
  }

  // Callback para receber os nomes de arquivos enviados
  onFilesUploaded(filename: String[]) {
    this.entidade.images = filename;
  }
}
