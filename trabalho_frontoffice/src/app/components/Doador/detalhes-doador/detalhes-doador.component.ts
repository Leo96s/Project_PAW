import { Component, OnInit } from '@angular/core';
import { Doador } from '../../../models/Utilizador';
import { ServicoUtilizadorService } from '../../../services/servico-utilizador.service';
import { BarraNavegacaoComponent } from '../barra-navegacao/barra-navegacao.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadFileComponent } from '../../upload-file/upload-file.component';
import { VisualizarImagemComponent } from '../../visualizar-imagem/visualizar-imagem.component';
import { IonicModule } from '@ionic/angular';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalhes-doador',
  standalone: true,
  imports: [
    BarraNavegacaoComponent,
    NgbNavModule,
    CommonModule,
    FormsModule,
    UploadFileComponent,
    VisualizarImagemComponent,
    IonicModule,
    NgbAlertModule,
  ],
  templateUrl: './detalhes-doador.component.html',
  styleUrl: './detalhes-doador.component.css',
})
export class DetalhesDoadorComponent implements OnInit {
  active = 1;
  doador: Doador = new Doador();
  editing: boolean = false;
  originalDoador: Doador = new Doador();
  updateError: string;

  constructor(private servicoUtilizador: ServicoUtilizadorService) {
    this.updateError = '';
  }

      // Obtém o doador do serviço de utilizador
  ngOnInit(): void {
    this.servicoUtilizador.getDoador().subscribe((data: Doador) => {
      this.doador = data;
      this.originalDoador = data;
    });
  }

    // Altera o modo de edição
  toggleEdit() {
    this.editing = !this.editing;
    this.doador.password = '';
  }

    // Salva as alterações feitas no formulário
  saveChanges() {
    const updatedDoador: Doador = this.doador;

    // Verifica cada campo e adiciona ao objeto updatedDoador apenas se houver alteração
    if (this.doador.name !== this.originalDoador.name) {
      updatedDoador.name = this.doador.name;
    }
    if (this.doador.email !== this.originalDoador.email) {
      updatedDoador.email = this.doador.email;
    }
    if (this.doador.password !== this.originalDoador.password) {
      updatedDoador.password = this.doador.password;
    }
    if (this.doador.nif !== this.originalDoador.nif) {
      updatedDoador.nif = this.doador.nif;
    }
    if (this.doador.phone !== this.originalDoador.phone) {
      updatedDoador.phone = this.doador.phone;
    }
    if (this.doador.age !== this.originalDoador.age) {
      updatedDoador.age = this.doador.age;
    }
    if (this.doador.gender !== this.originalDoador.gender) {
      updatedDoador.gender = this.doador.gender;
    }
    if (this.doador.city !== this.originalDoador.city) {
      updatedDoador.city = this.doador.city;
    }
    if (this.doador.address !== this.originalDoador.address) {
      updatedDoador.address = this.doador.address;
    }

    // Verifica se há alguma alteração antes de enviar
    if (Object.keys(updatedDoador).length > 0) {
      // Chama o serviço para salvar as alterações do doador
      this.servicoUtilizador.editDoador(updatedDoador).subscribe(
        (data) => {
          // Atualiza os dados do doador e encerra o modo de edição
          this.doador = data; // Ou ajuste conforme necessário para o retorno do serviço
          this.editing = false; // Encerra o modo de edição
        },
        (err: any) => {
          console.log(err.error);

          // error callback
          this.updateError = err.error.message;

          setTimeout(() => (this.updateError = ''), 50000);
        }
      );
    } else {
      // Se não houver alterações, apenas encerra o modo de edição
      this.editing = false;
    }
  }

    // Cancela o modo de edição e restaura os dados originais
  cancelEdit() {
    // Se o usuário cancelar a edição, você pode recarregar os detalhes da entidade original
    this.doador = this.originalDoador;
    this.editing = false;
  }

    // Método chamado quando um arquivo é carregado
  onFileUploaded(filename: String) {
    this.doador.image = filename;
  }

    // Método para atribuir um código de angariador ao doador
  atribuirCodigoAngariador() {
    if (this.doador && this.doador._id) {
      // Lógica para atribuir um código de angariador ao doador
      this.servicoUtilizador
        .atribuirCodigoAngariador(this.doador._id)
        .subscribe(
          (data: any) => {
            // Atualize o objeto doador com o código de angariador atribuído
            this.doador.codigoAngariador = data.codigoAngariador;
          },
          (err: any) => {
            console.error('Erro ao atribuir código de angariador:', err);
            alert(
              'Erro ao atribuir código de angariador: ' + err.error ||
                'Ocorreu um erro inesperado.'
            );
          }
        );
    } else {
      console.error('ID do doador não está disponível.');
    }
  }
}
