import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {
  BreakpointObserver,
  BreakpointState
} from '@angular/cdk/layout';
import { MessageService } from 'primeng/api';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'My app';
  routerLoading = false;  // включает анимацию загрузки (progressBar)
  progressBarValue = 85;
  currentUser: User|null = null;
  menu = [
    { 'name': 'Главная', 'routeLink': '', 'hrefLink': '/', 'icon': 'home', 'disabled': false, 'color':'primary' },
    { 'name': 'Блог', 'routeLink': 'blog', 'hrefLink': '/blog', 'icon': 'feed', 'disabled': true },
    { 'name': 'Проекты', 'routeLink': 'projects', 'hrefLink': '/projects', 'icon': 'dynamic_feed', 'disabled': false, 'color':'primary' },
    { 'name': 'Обо мне', 'routeLink': 'about', 'hrefLink': '/about', 'icon': 'person', 'disabled': false, 'color':'primary' },
    {}, // divider
    { 'name': 'Вопрос/Ответ', 'routeLink': 'faq', 'hrefLink': '/faq', 'icon': 'help', 'disabled': false },
    // {}, // divider
  ]

  constructor(
    private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef,  // нужно для фикса ошибки ExpressionChangedAfterItHasBeenCheckedError
    private router: Router,
    private _authService : AuthService,
    private messageService: MessageService
  ) { 
    // подписка на текущего авторизованного пользовател
    this._authService.currentUser.subscribe(x => this.currentUser = x)

    //  Подписка на события роутера
    //  Анимация при загрузке разделов
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.routerLoading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.progressBarValue = 100;
          this.routerLoading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    // this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }

  logout(){
    this._authService.logout();
    this.router.navigate(['/login']);
  }


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  handleSidenavClick() {
    if ( this.sidenav.mode === 'over') {
      this.sidenav.toggle();
    }
  }
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this.cdr.detectChanges(); // нужно для фикса ошибки ExpressionChangedAfterItHasBeenCheckedError
  }

}
