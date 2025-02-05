import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doador, Entidade } from '../models/Utilizador';

const endpoint = 'http://localhost:3000/api/v1/a/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AutenticationServiceService {
  constructor(private http: HttpClient) {}

  //faz um pedido ao backend para autenticar o utilizador com o email e password dados como parametros
  login(email: string, password: string): Observable<AuthRestModelResponse> {
    return this.http.post<AuthRestModelResponse>(
      endpoint + 'login',
      new LoginModel(email, password)
    );
  }

  //remove o token de autenticação
  logout() {
    localStorage.removeItem('currentUser');
  }

  //faz um pedido ao backend para registar objeto doador dado como parametros
  registerDoador(doador: Doador): Observable<AuthRestModelResponse> {
    return this.http.post<Doador>(endpoint + 'register-doador', doador);
  }

  //faz um pedido ao backend para registar objeto entidade dado como parametros
  registerEntidade(entidade: Entidade): Observable<AuthRestModelResponse> {
    return this.http.post<Entidade>(endpoint + 'register-entidade', entidade);
  }

  //faz um pedido ao backend para obter o tipo do utilizador autenticado
  getPosition(): Observable<AuthRestModelResponse> {
    return this.http.get<any>(endpoint + 'get-position');
  }
}
export interface AuthRestModelResponse {}

export class LoginModel {
  constructor(public email: string, public password: string) {}
}
