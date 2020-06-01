import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll-list/poll.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Poll } from '../../models/poll.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthService } from '../../auth.service';
import { Vote } from '../../models/vote.model';

@Component({
  selector: 'app-poll-editor',
  templateUrl: './poll-editor.component.html',
  styleUrls: ['./poll-editor.component.scss']
})
export class PollEditorComponent implements OnInit {

  urlId: number;
  poll: Poll;
  selectedItems: boolean[];
  display: boolean;
  success: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private pollService: PollService,
    public authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private rt: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.rt.params.subscribe(params => {
      this.urlId = params['id'];
      this.fetchData(false);
    });
  }

  fetchData(forceDisplay: boolean) {
    this.pollService.findById(this.urlId).subscribe(res => {
      this.poll = res;
      this.poll.votes.sort((o1, o2) => o1.name.localeCompare(o2.name));
      let voteCount = 0;
      if (this.poll !== null) {
        this.selectedItems = [];
        this.poll.votes.forEach(e => {
          voteCount += e.voteCount;
        });
      }
      if(forceDisplay){
        this.display = true;
      }
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

  add() {
    this.poll.votes.push(new Vote());
  }


  save() {
    if (this.poll.nonPublic && !this.authService.isAuthenticated) {
      this._snackBar.open('Ops! Error', 'X', {
        duration: 1700,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else {
      this.pollService.updateOne(this.poll).subscribe((data: any) => {
      this._snackBar.open('Success for update!', 'X', {
        duration: 1500,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.router.navigate([`/poll/${data.code}`]);
    }, (error) => {
      alert(error);
      this._snackBar.open('Ops! Error', 'X', {
        duration: 1700,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });
  }
}

  removeAnswer(id: number) {
    if (this.poll.votes.length > 1) {
      this.poll.votes.splice(id, 1);
    }
  }

  changeMultipleAnswer() {
    this._snackBar.open('Ok', 'X', {
      duration: 900,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    this.poll.multipleAnswer = !this.poll.multipleAnswer;
  }


}
