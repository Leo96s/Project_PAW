import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/image.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css',
})
export class UploadFileComponent implements OnInit {
  fileName = '';
  message = '';

  @Input() tempName?: String;

  constructor(public imageService: ImageService) {}

  ngOnInit(): void {}

  @Output() fileUploaded = new EventEmitter<String>();

  // Chama o serviço de imagem para mandar a imagem de um formulário para o sistema. 
  // Envia também um evento com os nome da imagem atualizado para associar a por exemplo, doadores.
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.imageService
        .uploadFile(file, this.tempName)
        .subscribe((result: any) => {
          this.fileName = '';
          this.message = result.message;
          this.fileUploaded.emit(result.filename);
        });
    }
  }
}
