import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { IBreadcrumbRouteConfig } from '../breadcrumbs/breadcrumb.model';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { ProjectsComponent } from './projects.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { 
    path: 'create', 
    component: CreateComponent,
    data: { breadcrumb: 'Новый проект' }
  },
  { 
    path: 'edit/:id', 
    component: UpdateComponent,
    data: { breadcrumb: 'Редактирование проекта' }
  },
  { 
    path: 'detail/:id', 
    component: DetailComponent,
    data: { breadcrumb: 'Проект (такой-то, доработать breadcrumbs)' }
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
