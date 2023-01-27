import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
// import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  // { path: "", redirectTo: 'blog', pathMatch: 'full'},
  // { path: "", component: AppComponent },
  {
    path: "blog",
    loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
    // data: { breadcrumb: 'blog' }
  },
  { 
    path: 'projects', 
    loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),
    data: { breadcrumb: 'Проекты' }
  },
  { 
    path: 'about', 
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
    // data: { breadcrumb: 'Обо мне' }
  },
  { 
    path: '', 
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    // data: { breadcrumb: 'Главная' }
  },
  { 
    path: 'faq', 
    loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule),
    // data: { breadcrumb: 'FAQ' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
