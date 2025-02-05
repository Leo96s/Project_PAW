import { Component, Input, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AutenticationServiceService } from '../../services/autentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  @Input() profilePic?: String;

  constructor(
    private servicoAuth: AutenticationServiceService,
    private router: Router
  ) {}

  //chama a função de logut do authService, remover a autenticação do utilizador e redirecionar para a página de login
  logout() {
    this.servicoAuth.logout();
    this.router.navigate(['//']);
  }
}
