import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { IBreadcrumbRouteConfig } from '../breadcrumbs/breadcrumb.model';
import { CreateComponent } from './create/create.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  { 
    path: 'create', 
    component: CreateComponent,
    data: { breadcrumb: 'Новый проект' }
  },
  // { 
  //   path: 'list', 
  //   component: ProjectsComponent ,
  //   data: { breadcrumb: 'Список проектов' }
  // },
  { 
    path: '', 
    // redirectTo: 'list',
    // pathMatch: 'full'
    component: ProjectsComponent ,
    data: { breadcrumb: 'Все' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
