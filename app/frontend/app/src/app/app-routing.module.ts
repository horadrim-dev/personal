import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { PagenotfoundComponent } from './shared/components/pagenotfound/pagenotfound.component';
// import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  // { path: "", redirectTo: 'blog', pathMatch: 'full'},
  { 
    path: "login", 
    component: LoginComponent,
    data: { breadcrumb: 'Вход' }
  },
  { 
    path: "profile", 
    component: ProfileComponent,
    data: { breadcrumb: 'Профиль' }
  },
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
  { path: '404', pathMatch: 'full', component: PagenotfoundComponent },
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
