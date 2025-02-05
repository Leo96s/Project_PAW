import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nao-autorizado',
  standalone: true,
  imports: [],
  templateUrl: './nao-autorizado.component.html',
  styleUrl: './nao-autorizado.component.css',
})
export class NaoAutorizadoComponent {
  constructor(private router: Router) {}

  //redireciona para o login
  login() {
    this.router.navigate(['//']);
  }
}
