import { Component, Input } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ModalDoacaoComponent } from '../modal-doacao/modal-doacao.component';
import { Doacao } from '../../models/Doacao';

@Component({
  selector: 'app-notificacao',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule, ModalDoacaoComponent],
  templateUrl: './notificacao.component.html',
  styleUrl: './notificacao.component.css',
})
export class NotificacaoComponent {
  @Input() doacoesPend?: Doacao[];
}
