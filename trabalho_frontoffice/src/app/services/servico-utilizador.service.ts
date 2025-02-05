import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doador, Entidade } from '../models/Utilizador';
import { Cartao } from '../models/Cartao';

const endpoint = 'http://localhost:3000/api/v1/u/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ServicoUtilizadorService {
  constructor(private http: HttpClient) {}

  // faz um pedido ao backend para obter os dados do doador autenticado
  getDoador(): Observable<Doador> {
    return this.http.get<Doador>(endpoint + 'profile');
  }

  // faz um pedido ao backend para obter os dados da entidade autenticada
  getEntidade(): Observable<Entidade> {
    return this.http.get<Entidade>(endpoint + 'profile');
  }

  // faz um pedido ao backend para obter todas as entidades aprovadas
  getEntidades(): Observable<Entidade[]> {
    return this.http.get<Entidade[]>(endpoint + 'entidades');
  }

  // faz um pedido ao backend para editar a entidade
  editEntidade(entidade: Entidade): Observable<Entidade> {
    return this.http.put<Entidade>(endpoint + 'entidade/' + entidade._id, {
      entidade,
    });
  }

  // faz um pedido ao backend para editar o doador
  editDoador(doador: Doador): Observable<Doador> {
    return this.http.put<Doador>(endpoint + 'doador/' + doador._id, { doador });
  }

  // faz um pedido ao backend para atribuir um código de angariador ao doador
  atribuirCodigoAngariador(id: string): Observable<Doador> {
    return this.http.post<Doador>(endpoint + 'promover/' + id, { id: id });
  }

  // faz um pedido ao backend para resgatar um cartão com pontos do doador
  resgatarCartao(cartao: Cartao, doador: Doador): Observable<Cartao> {
    return this.http.put<Cartao>(
      endpoint + 'resgatar-recompensa/' + doador._id,
      {
        cartao,
      }
    );
  }
}
