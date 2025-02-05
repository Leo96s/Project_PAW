import { HttpInterceptorFn } from '@angular/common/http';

// injeta o token de autenticação nos pedidos rest
export const jwtInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  
  let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  if (currentUser && currentUser.token) {
    req = req.clone({
      setHeaders: {
        'x-access-token': `${currentUser.token}`,
      },
    });
  }

  return next(req);
};
