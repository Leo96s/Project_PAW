import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AutenticationServiceService } from '../../services/autentication-service.service';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, FormsModule, NgbAlertModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string;
  password: string;
  loginError: string = '';

  constructor(
    private router: Router,
    private authService: AutenticationServiceService
  ) {
    this.password = '';
    this.email = '';
  }

  ngOnInit(): void {}

  //chama a função de login do authService, para autenticar o utilizador recebido a partir do formulário. 
  //Esta Função redireciona para a página principal de Doador e a Entidade dependendo do tipo de utilizador autenticado.
  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (user: any) => {
        // success callback
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));

          this.authService.getPosition().subscribe(
            (response: any) => {
              console.log(response);

              if (response.position == 'Doador') {
                this.router.navigate(['/home-doador/']);
              } else if (response.position == 'Entidade') {
                this.router.navigate(['/home-entidade/']);
              }
            },
            (err: any) => {
              // error callback
              console.error(err);
              this.loginError = 'Acesso Inválido';
              setTimeout(() => (this.loginError = ''), 50000);
            }
          );
        }
      },
      (err: any) => {
        // error callback
        console.error(err);
        this.loginError = 'Erro no Login';
        setTimeout(() => (this.loginError = ''), 50000);
      }
    );
  }
}
