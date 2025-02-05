import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const endpoint = 'http://localhost:3000/api/v1/i/';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  // faz um pedido ao backend para enviar uma imagem para o sistema
  uploadFile(file: File, imageName: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('imageName', imageName);

    return this.http.post<any>(endpoint + 'upload-single', formData);
  }
}
