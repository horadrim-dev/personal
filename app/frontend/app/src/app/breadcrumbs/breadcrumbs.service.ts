import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
// import { Breadcrumb } from './breadcrumb.model';

// https://marco.dev/angular-breadcrumb
@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

  //  // Subject emitting the breadcrumb hierarchy 
  // private readonly _breadcrumbs$ = new BehaviorSubject<IBreadcrumb[]>([]); 
 
  // // Observable exposing the breadcrumb hierarchy 
  // readonly breadcrumbs$ = this._breadcrumbs$.asObservable(); 
 
  // constructor(private router: Router) { 
  //   this.router.events.pipe( 
  //     // Filter the NavigationEnd events as the breadcrumb is updated only when the route reaches its end 
  //     filter((event) => event instanceof NavigationEnd) 
  //   ).subscribe(event => { 
  //     // Construct the breadcrumb hierarchy 
  //     let ar = ActivatedRoute
  //     const root = this.router.routerState.snapshot.root; 
  //     const breadcrumbs: IBreadcrumb[] = []; 
  //     // this.addBreadcrumb(root, [], breadcrumbs); 
 
  //     // Emit the new hierarchy 
  //     this._breadcrumbs$.next(breadcrumbs); 
  //   }); 
  //   console.log(this.breadcrumbs$);
  // } 
 
  // private addBreadcrumb(route: ActivatedRouteSnapshot | null, parentUrl: string[], breadcrumbs: IBreadcrumb[]) { 
  //   if (route) { 
  //     // Construct the route URL 
  //     const routeUrl = parentUrl.concat(route.url.map(url => url.path)); 
 
  //     // Add an element for the current route part 
  //     if (route.data.hasOwnProperty('breadcrumb')) { 
  //       const breadcrumb = {
  //         label: this.getLabel(route.data), 
  //         url: '/' + routeUrl.join('/') 
  //       }; 
  //       breadcrumbs.push(breadcrumb); 
  //     } 
 
  //     // Add another element for the next route part 
  //     this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs); 
  //   } 
  // } 
 
  // private getLabel(data: Data) { 
  //   // The breadcrumb can be defined as a static string or as a function to construct the breadcrumb element out of the route data 
  //   return typeof data['breadcrumb'] === 'function' ? data['breadcrumb'](data) : data['breadcrumb']; 
  // } 
}
