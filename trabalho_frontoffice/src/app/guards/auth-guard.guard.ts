import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  private storage: Storage | null = null;

  constructor(private router: Router) {
    // Verificar se estamos no contexto do navegador
    if (typeof window !== 'undefined') {
      this.storage = window.localStorage;
    }
  }

  //verifica se o utilizador está autenticado, e caso contrário redireciona para o login
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.storage && this.storage.getItem('currentUser')) {
      return true;
    }
    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
