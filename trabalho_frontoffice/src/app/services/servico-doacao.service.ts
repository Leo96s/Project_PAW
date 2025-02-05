import { Injectable } from '@angular/core';
import { Doacao } from '../models/Doacao';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const endpoint = 'http://localhost:3000/api/v1/d/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ServicoDoacaoService {
  constructor(private http: HttpClient) {}

  // faz um pedido ao backend para registar um objeto doacao
  registerDoacao(doacao: Doacao): Observable<any> {
    return this.http.post<Doacao>(endpoint + 'doacoes', doacao);
  }

  // faz um pedido ao backend para obter todas as doações com o nif indicado
  obterDoacaoPorNIF(nif: string): Observable<Doacao[]> {
    return this.http.get<Doacao[]>(endpoint + 'doacoes/nif/' + nif);
  }

  // faz um pedido ao backend para obter todas as doações com o nome de entidade indicado
  obterDoacoesPorEntidade(nomeEntidade: string): Observable<Doacao[]> {
    return this.http.get<Doacao[]>(
      endpoint + 'doacoes/entidade/' + nomeEntidade
    );
  }

  // faz um pedido ao backend para obter todas as doações pendentes
  getPendentes(): Observable<Doacao[]> {
    return this.http.get<Doacao[]>(endpoint + 'utilizadores/pendentes');
  }

  alterarEstadoDoacao(
    id: string,
    estadoDoacao: string,
    nif: string
  ): Observable<Doacao> {
    const body = { estadoDoacao, nif };
    return this.http.post<Doacao>(
      endpoint + 'doacoes/alterarEstado/' + id,
      body
    );
  }

  // faz um pedido ao backend para obter todas as doações aprovadas
  getAprovadas(): Observable<Doacao[]> {
    return this.http.get<Doacao[]>(endpoint + 'doacoes/aprovadas');
  }
}
