import { Routes } from '@angular/router';
import {ClientsComponent} from './clients/clients.component';
import {TechnologiesComponent} from './technologies/technologies.component';
import {SolutionsComponent} from './solutions/solutions.component';
import {BenefitsComponent} from './benefits/benefits.component';
import {ProposalsComponent} from './proposals/proposals.component';
import {BannerComponent} from './banner/banner.component';

export const routes: Routes = [
  { path: '', component: BannerComponent },
  { path: 'propuestas', component: ProposalsComponent },
  { path: 'beneficios', component: BenefitsComponent },
  { path: 'soluciones', component: SolutionsComponent },
  { path: 'technologist', component: TechnologiesComponent },
  { path: 'clientes', component: ClientsComponent },
  { path: '**', redirectTo: '' }
];
