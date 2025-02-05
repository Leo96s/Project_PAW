import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-files',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './upload-files.component.html',
  styleUrl: './upload-files.component.css',
})
export class UploadFilesComponent {
  fileNames: string[] = [];
  message?: string;

  @Input() tempName: any;

  constructor(public imageService: ImageService) {}

  ngOnInit(): void {}

  @Output() filesUploaded = new EventEmitter<String[]>();

  // Vai chamando a função uploadFile enquanto existir imagens para tratar.
  // Envia também um evento com os nomes das imagens atualizado para associar a por exemplo, doadores.
  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      this.uploadFile(file);
    }
    this.filesUploaded.emit(this.fileNames);
  }

    // Chama o serviço do ficheiro que está como parametro para o sistema
  private uploadFile(file: File) {
    if (file) {
      this.imageService
        .uploadFile(file, this.tempName)
        .subscribe((result: any) => {
          this.message = result.message;

          this.fileNames.push(result.filename);
        });
    }
  }
}
