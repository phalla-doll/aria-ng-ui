import { Routes } from '@angular/router';
import { Home } from './pages/home.page';
import { ComponentsPage } from './pages/components.page';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'components', component: ComponentsPage },
];
