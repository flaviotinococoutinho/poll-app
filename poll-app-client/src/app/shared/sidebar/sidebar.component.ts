import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { AuthService } from "../../auth.service";
import { Router } from "@angular/router";
import { Output, EventEmitter } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  authRequired: boolean;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "CREATE A POLL",
    icon: "addchart",
    class: "",
    authRequired: false,
  },
  {
    path: "/poll",
    title: "EXPLORE POLLS",
    icon: "poll",
    class: "",
    authRequired: false,
  },
  {
    path: "/poll/my/all",
    title: "MY POLLS",
    icon: "analytics",
    class: "",
    authRequired: true,
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  private _mobileQuery: MediaQueryList;
  get mobileQuery(): MediaQueryList {
    return this._mobileQuery;
  }
  private mobileQueryListener: () => void;

  @Output() opcaoMenuSelecionada: EventEmitter<boolean>;
  menuItems: any[];

  constructor(
    public authService: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private mediaMatcher: MediaMatcher
  ) {
    const query = "(max-width: 600px)";
    this._mobileQuery = this.mediaMatcher.matchMedia(query);
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this._mobileQuery.addListener(this.mobileQueryListener);
    this.opcaoMenuSelecionada = new EventEmitter();
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  logout() {
    this.router.navigate(["/login"]);
  }
}
