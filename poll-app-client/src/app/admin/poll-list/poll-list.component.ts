import { Component, OnInit } from "@angular/core";
import { PollService } from "./poll.service";
import * as moment from "moment";
import { PagePoll } from "../../models/page-poll.model";
import { Poll } from "../../models/poll.model";
import { AuthService } from "../../auth.service";
import { Subscription } from "rxjs";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: "app-poll-list",
  templateUrl: "./poll-list.component.html",
  styleUrls: ["./poll-list.component.scss"],
})
export class PollListComponent implements OnInit {
  polls: Poll[];
  pagePoll: PagePoll;
  selectedPage: number = 0;
  serverTime: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  private subscription: Subscription = new Subscription();

  constructor(
    private pollService: PollService,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.fetchDataAdm(0);
      this.fetchTime();
    }
    if (!this.authService.isAuthenticated()) {
      this.fetchData(0);
      this.fetchTime();
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  countVotes(poll: Poll) {
    let count = 0;
    if (poll != null) {
      poll.votes.forEach((e) => (count += e.voteCount));
    }
    return count;
  }

  showNotification(text: string, color: string) {
    this._snackBar.open(text, 'X', {
      duration: 1700,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['mat-toolbar', color]
    });
  }

  fetchTime() {
    this.pollService.getTime().subscribe((res) => {
      this.serverTime = new Date(res.toString());
    });
  }

  fetchDataAdm(page: number) {
    this.subscription.add(
      this.pollService.findAllPagedAuth(page).subscribe((res) => {
        this.pagePoll = res;
        let serverLocalDiff = moment(Date.now()).diff(this.serverTime);
        let minutesServerLocalDiff = moment
          .duration(serverLocalDiff)
          .asMinutes();
        for (let i = 0; i < this.pagePoll.content.length; ++i) {
          let currentPoll = this.pagePoll.content[i];
          currentPoll.postDate = new Date(currentPoll.postDate.toString());
          currentPoll.postDate.setMinutes(
            currentPoll.postDate.getMinutes() + minutesServerLocalDiff
          );
        }
      })
    );
  }

  fetchData(page: number) {
    this.subscription.add(
      this.pollService.findAllPaged(page).subscribe((res) => {
        this.pagePoll = res;
        let serverLocalDiff = moment(Date.now()).diff(this.serverTime);
        let minutesServerLocalDiff = moment
          .duration(serverLocalDiff)
          .asMinutes();
        for (let i = 0; i < this.pagePoll.content.length; ++i) {
          let currentPoll = this.pagePoll.content[i];
          currentPoll.postDate = new Date(currentPoll.postDate.toString());
          currentPoll.postDate.setMinutes(
            currentPoll.postDate.getMinutes() + minutesServerLocalDiff
          );
        }
      })
    );
  }

  onSelect(page: number) {
    this.selectedPage = page;
    if (this.authService.isAuthenticated()) {
      this.fetchDataAdm(page);
    }
    if (!this.authService.isAuthenticated()) {
      this.fetchData(page);
    }
  }
}
