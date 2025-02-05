import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { AutenticationServiceService } from '../services/autentication-service.service';
import { ServicoUtilizadorService } from '../services/servico-utilizador.service';

@Injectable({
  providedIn: 'root',
})
export class EntidadePendenteGuard implements CanActivate {
  constructor(
    private authService: AutenticationServiceService,
    private utilizadorService: ServicoUtilizadorService,
    private router: Router
  ) {}

    // verifica se a Entidade é tem o Registo Aprovado e caso contrário redireciona para a página de Estado Entidade Pendente
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    try {
      const response: any = await firstValueFrom(
        this.utilizadorService.getEntidade()
      );
      console.log(response);
      console.log(response.estadoRegisto);
      if (response.estadoRegisto == 'Aprovada') {
        return true;
      } else {
        this.authService.logout();
        return this.router.createUrlTree(['/estado-pendente-entidade']);
      }
    } catch (error) {
      this.authService.logout();
      console.error('Erro ao obter a posição do utilizador', error);
      return this.router.createUrlTree(['/erro']);
    }
  }
}
