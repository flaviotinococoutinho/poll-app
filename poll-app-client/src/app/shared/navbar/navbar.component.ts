import { Component, OnInit, Output, ChangeDetectorRef } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import { Location } from "@angular/common";
import { AuthService } from "../../auth.service";
import { Router } from "@angular/router";

import { NotificationService } from "../../notification.service";
import { Notification } from "../../models/notification.model";

import { Subject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { MediaMatcher } from "@angular/cdk/layout";

@Component({
  // moduleId: module.id,
  selector: "navbar-cmp",
  templateUrl: "navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  get mobileQuery(): MediaQueryList {
    return this._mobileQuery;
  }

  @Output() sideNavToggle: Subject<void> = new Subject<void>();

  private listTitles: any[];
  location: Location;
  private notifications: Notification[];
  notificationMap: Map<Notification, number>;
  private reading: boolean;

  private _mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  //notificacoes: Array<Notificacao>;

  constructor(
    location: Location,
    private router: Router,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private mediaMatcher: MediaMatcher,
    public authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.location = location;
    this.notificationMap = new Map<Notification, number>();
    const query = "(max-width: 600px)";
    this._mobileQuery = this.mediaMatcher.matchMedia(query);
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this._mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    this.fetchNotifications();
  }

  toggleSideNav() {
    this.sideNavToggle.next();
  }

  openDialog(): void {
    /*
    const dialogRef: MatDialogRef<DialogConfirmDialogComponent> = this.dialog.open(DialogConfirmDialogComponent, {
      width: '250px',
      data: {
        message: 'Tem certeza que deseja sair? Deste modo estará encerrando a sessão e retornando a tela de login.',
        cancelButton: true
      }
    });

    dialogRef.afterClosed().subscribe( result => {
      console.log('A tela de dialogo foi fechada');
      if (!!result) {
        this.logout();
      }
    });

    */
  }

  // pego da versao anterior

  fetchNotifications() {
    if (this.authService.isAuthenticated()) {
      this.notificationService.findByUser().subscribe((res) => {
        this.notifications = res;
        this.notifications = this.notifications.filter((e) => !e.read);

        this.notificationMap = new Map<Notification, number>();
        if (this.notifications.length > 0) {
          for (let i = 0; i < this.notifications.length; ++i) {
            const current = this.notifications[i];
            let found = false;
            let foundNotif = null;
            this.notificationMap.forEach((v, k) => {
              if (k.poll.code === current.poll.code) {
                foundNotif = k;
                if (!found) {
                  found = true;
                }
              }
            });
            this.notificationMap.set(
              foundNotif === null ? current : foundNotif,
              foundNotif === null ? 1 : this.notificationMap.get(foundNotif) + 1
            );
          }
        }
      });
    }
    setTimeout(() => this.fetchNotifications(), 3000);
  }
  markNotificationsAsRead() {
    this.notificationService
      .setNotificationsRead()
      .subscribe((res) => (res = res));
  }

  logout() {
    this.router.navigate(["/login"]);
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.trim().length > 0) {
      titlee = titlee.split("/").pop();
      for (var item = 0; item < this.listTitles.length; item++) {
        if (this.listTitles[item].path === titlee) {
          return this.listTitles[item].title;
        }
      }
      titlee = titlee.charAt(0).toUpperCase() + titlee.slice(1);
    }
    return titlee;
  }
}
