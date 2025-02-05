import { Component, inject, Input, TemplateRef } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-visualizar-imagem',
  standalone: true,
  imports: [],
  templateUrl: './visualizar-imagem.component.html',
  styleUrl: './visualizar-imagem.component.css',
})
export class VisualizarImagemComponent {
  @Input() image?: String;

  private modalService = inject(NgbModal);
  closeResult = '';

  //abre um modal com a imagem
  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        }
      );
  }
}
