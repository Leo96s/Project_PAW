import { Component, Input } from '@angular/core';
import { Doacao } from '../../models/Doacao';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-doacao',
  standalone: true,
  imports: [CommonModule, ModalDoacaoComponent],
  templateUrl: './modal-doacao.component.html',
  styleUrl: './modal-doacao.component.css',
})
export class ModalDoacaoComponent {
  @Input() doacao?: Doacao;
}
