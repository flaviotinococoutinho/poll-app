import { Component, OnInit } from "@angular/core";
import { PollService } from "../../app/admin/poll-list/poll.service";
import { AuthService } from "../../app/auth.service";
import { Poll } from "../models/poll.model";
import { Vote } from "../models/vote.model";
import { Router, ActivatedRoute } from "@angular/router";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  poll: Poll;

  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  constructor(
    private pollService: PollService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public authService: AuthService
  ) {
    this.poll = new Poll();
    this.poll.title = "";
    this.poll.description = "";
    this.poll.multipleAnswer = false;
    this.poll.allowSameIp = false;
    this.poll.nonPublic = false;
    this.poll.votes = [];
    this.poll.votes.push(new Vote(), new Vote());
  }

  ngOnInit() {
    const votes = this.route.snapshot.queryParamMap.get("votes")?.split(",");
    if (votes) {
      this.poll.votes = [];
      for (let vote of votes) {
        let itemVoto = new Vote();
        itemVoto.name = vote;
        this.poll.votes.push(itemVoto);
      }
    }
    this.poll.title = this.route.snapshot.queryParamMap.get("title");
    this.poll.description = this.route.snapshot.queryParamMap.get(
      "description"
    );
    this.poll.multipleAnswer =
      this.route.snapshot.queryParamMap.get("multipleAnswer") == "true";
    this.poll.allowSameIp =
      this.route.snapshot.queryParamMap.get("allowSameIp") == "true";
    this.poll.nonPublic =
      this.route.snapshot.queryParamMap.get("nonPublic") == "true";
  }

  add() {
    this.poll.votes.push(new Vote());
  }

  saveToUrl() {
    let tree = window.location.origin + "/dashboard?" + this.pollParametize(this.poll);
    console.log(tree);
    return tree;
  }

  pollParametize(data) {
    return Object.keys(data)
      .map((key) => `${key}=${encodeURIComponent(data[key])}`)
      .join("&");
  }

  save() {
    if (this.poll.nonPublic && !this.authService.isAuthenticated) {
      this._snackBar.open("Ops! Error", "X", {
        duration: 1700,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else {
      this.pollService.save(this.poll).subscribe(
        (data: any) => {
          this._snackBar.open("Success for creating new poll!", "X", {
            duration: 1500,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.router.navigate([`/poll/${data.code}`]);
        },
        (error) => {
          alert(error);
          this._snackBar.open("Ops! Error", "X", {
            duration: 1700,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      );
    }
  }

  removeAnswer(id: number) {
    if (this.poll.votes.length > 1) {
      this.poll.votes.splice(id, 1);
    }
  }

  changeMultipleAnswer() {
    this._snackBar.open("Ok", "X", {
      duration: 900,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    this.poll.multipleAnswer = !this.poll.multipleAnswer;
  }
}
