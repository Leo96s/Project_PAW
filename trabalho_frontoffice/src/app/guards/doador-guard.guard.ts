import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticationServiceService } from '../services/autentication-service.service';

@Injectable({
  providedIn: 'root',
})
export class DoadorGuard implements CanActivate {
  constructor(
    private authService: AutenticationServiceService,
    private router: Router
  ) {}

  // verifica se o utilizador é do tipo "Doador" e caso contrário redireciona para a página de Acesso não Autorizado
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    try {
      const response: any = await this.authService.getPosition().toPromise();

      if (response.position === 'Doador') {
        return true;
      } else {
        this.authService.logout();
        this.router.navigate(['/nao-autorizado']);
        return false;
      }
    } catch (error) {
      this.authService.logout();
      console.error('Erro ao obter a posição do utilizador', error);
      this.router.navigate(['/erro']);
      return false;
    }
  }
}
