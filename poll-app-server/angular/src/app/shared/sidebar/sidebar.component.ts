import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth.service';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  authRequired: boolean;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'New poll', icon: 'addchart', class: '', authRequired: false },
  { path: '/poll', title: 'Explore polls', icon: 'poll', class: '', authRequired: false },
  { path: '/poll/my/all', title: 'My polls', icon: 'analytics', class: '', authRequired: true },
  // { path: '/typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' },
  //  { path: '/icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
  //  { path: '/maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
  //   { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(public authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  logout(){
      this.router.navigate(['/login']);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
