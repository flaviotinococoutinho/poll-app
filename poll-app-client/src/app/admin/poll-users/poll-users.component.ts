import { Component, OnInit } from '@angular/core';
import { Poll } from '../../models/poll.model'
import { PollService } from '../../admin/poll-list/poll.service';
import * as moment from 'moment'
import { PagePoll } from '../../models/page-poll.model';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';

declare var $: any;
@Component({
  selector: 'app-poll-users',
  templateUrl: './poll-users.component.html',
  styleUrls: ['./poll-users.component.scss']
})
export class PollUsersComponent implements OnInit {

  pagePoll: PagePoll;
  serverTime: any;
  selectedPage: number = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(
    private pollService: PollService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.fetchData(0);
    this.fetchTime();
  }

  fetchData(page: number) {
    this.pollService.findByUser(page).subscribe(res => {
      this.pagePoll = res;
      let serverLocalDiff = moment(Date.now()).diff(this.serverTime);
      let minutesServerLocalDiff = moment.duration(serverLocalDiff).asMinutes();
      for (let i = 0; i < this.pagePoll.content.length; ++i) {
        let currentPoll = this.pagePoll.content[i];
        currentPoll.postDate = new Date(currentPoll.postDate.toString());
        currentPoll.postDate.setMinutes(currentPoll.postDate.getMinutes() + minutesServerLocalDiff);
      }
    });
  }

  fetchTime() {
    this.pollService.getTime().subscribe(res => {
      this.serverTime = new Date(res.toString());
    })
  }

  countVotes(poll: Poll) {
    let count = 0;
    if (poll != null) {
      poll.votes.forEach(e => count += e.voteCount);
    }
    return count;
  }

  onSelect(page: number) {
    this.selectedPage = page;
    this.fetchData(page);
  }

  updatePolls() {
    this.pollService.updateMany(this.pagePoll.content)
      .subscribe(res => {
        this.fetchData(this.selectedPage);
        this.showNotification('Changes Saved!', 'mat-primary');
      });
  }

  showNotification(text: string, color: string) {
    this._snackBar.open(text, 'X', {
      duration: 1700,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['mat-toolbar', color]
    });
  }

  copyToClipboard(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = window.location.origin +'/poll/'+val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.showNotification('Copied to Clipboard!', 'mat-primary');
  }
}
