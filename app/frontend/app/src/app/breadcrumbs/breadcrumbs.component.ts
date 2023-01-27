import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/filter';
import {filter} from 'rxjs/operators'

interface BreadCrumb {
  label: string;
  params?: Params;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent  {
  // breadcrumbs$: Observable<IBreadcrumb[]>; 
 
  // constructor(private readonly breadcrumbService: BreadcrumbsService) { 
  //   this.breadcrumbs$ = breadcrumbService.breadcrumbs$; 
  // } 
  showBreadcrumbs = true;

  public breadcrumbs: BreadCrumb[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.breadcrumbs = [];
   }

  ngOnInit() {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(event => {
      let root: ActivatedRoute = this.activatedRoute.root;
      // console.log(root);
      this.breadcrumbs = this.getBreadcrumbs(root);

      this.showBreadcrumbs = this.breadcrumbs.length > 0 ? true : false;
    });
  }

  private getBreadcrumbs(
    route: ActivatedRoute,
    url: string= '',
    breadcrumbs: BreadCrumb[]=[]
  ): BreadCrumb[] {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

    let children: ActivatedRoute[] = route.children;
    if ( children.length === 0 ) {
      return breadcrumbs;
    }

    for ( let child of children ) {
      if ( child.outlet !== PRIMARY_OUTLET ) {
        continue;
      }
      if ( !child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      let routeURL = child.snapshot.url.map(segment => segment.path).join('/');

      url += `/${routeURL}`;

      let breadcrumb: BreadCrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };
      breadcrumbs.push(breadcrumb);
      // console.log(breadcrumb)
      // if (child.snapshot.url.map(segment => segment.path).length === 0) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      // }
    }
    return breadcrumbs;
  }



}