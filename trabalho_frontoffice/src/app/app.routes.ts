import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DetalhesDoadorComponent } from './components/Doador/detalhes-doador/detalhes-doador.component';
import { DetalhesEntidadeComponent } from './components/Entidade/detalhes-entidade/detalhes-entidade.component';
import { CriarDoadorComponent } from './components/criar-doador/criar-doador.component';
import { CriarEntidadeComponent } from './components/criar-entidade/criar-entidade.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { PaginaPrincipalDoadorComponent } from './components/Doador/pagina-principal-doador/pagina-principal-doador.component';
import { RegistarDoacaoComponent } from './components/Doador/registar-doacao/registar-doacao.component';
import { InformacoesDoadorComponent } from './components/Doador/informacoes-doador/informacoes-doador.component';
import { PontosDoadorComponent } from './components/Doador/pontos-doador/pontos-doador.component';
import { ListaEntidadesComponent } from './components/Doador/lista-entidades/lista-entidades.component';
import { PaginaPrincipalEntidadeComponent } from './components/Entidade/pagina-principal-entidade/pagina-principal-entidade.component';
import { ListaDoacoesComponent } from './components/Entidade/lista-doacoes/lista-doacoes.component';
import { DashboardsDoadorComponent } from './components/Doador/dashboards-doador/dashboards-doador.component';
import { NaoAutorizadoComponent } from './components/nao-autorizado/nao-autorizado.component';
import { DoadorGuard } from './guards/doador-guard.guard';
import { EntidadeGuard } from './guards/entidade-guard.guard';
import { ErroComponent } from './components/erro/erro.component';
import { EntidadePendenteGuard } from './guards/entidade-pendente.guard';
import { DashboardsEntidadeComponent } from './components/Entidade/dashboards-entidade/dashboards-entidade.component';
import { EstadoPendenteComponent } from './components/Entidade/estado-pendente/estado-pendente.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'detalhes-doador',
    component: DetalhesDoadorComponent,
    canActivate: [AuthGuard, DoadorGuard],
  },
  {
    path: 'detalhes-entidade',
    component: DetalhesEntidadeComponent,
    canActivate: [AuthGuard, EntidadeGuard],
  },
  {
    path: 'register-doador',
    component: CriarDoadorComponent,
  },
  {
    path: 'register-entidade',
    component: CriarEntidadeComponent,
  },
  {
    path: 'upload-file',
    component: UploadFileComponent,
  },
  {
    path: 'upload-files',
    component: UploadFilesComponent,
  },
  {
    path: 'home-doador',
    component: PaginaPrincipalDoadorComponent,
    canActivate: [AuthGuard, DoadorGuard],
  },
  {
    path: 'registar-doacao',
    component: RegistarDoacaoComponent,
    canActivate: [AuthGuard, DoadorGuard],
  },
  {
    path: 'informacoes-doador',
    component: InformacoesDoadorComponent,
    canActivate: [AuthGuard, DoadorGuard],
  },
  {
    path: 'pontos-doador',
    component: PontosDoadorComponent,
    canActivate: [AuthGuard, DoadorGuard],
  },
  {
    path: 'lista-entidades',
    component: ListaEntidadesComponent,
    canActivate: [AuthGuard, DoadorGuard],
  },
  {
    path: 'home-entidade',
    component: PaginaPrincipalEntidadeComponent,
    canActivate: [AuthGuard, EntidadeGuard, EntidadePendenteGuard],
  },
  {
    path: 'lista-doacoes',
    component: ListaDoacoesComponent,
    canActivate: [AuthGuard, EntidadeGuard],
  },
  {
    path: 'dashboards-doador',
    component: DashboardsDoadorComponent,
    canActivate: [AuthGuard, DoadorGuard],
  },
  {
    path: 'nao-autorizado',
    component: NaoAutorizadoComponent,
  },
  {
    path: 'erro',
    component: ErroComponent,
  },
  {
    path: 'estado-pendente-entidade',
    component: EstadoPendenteComponent,
  },
  {
    path: 'dashboards-entidade',
    component: DashboardsEntidadeComponent,
    canActivate: [AuthGuard, EntidadeGuard],
  },
];