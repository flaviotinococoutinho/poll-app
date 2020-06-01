import { Component, OnInit } from "@angular/core";
import { PollService } from "../../admin/poll-list/poll.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Poll } from "../../models/poll.model";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-poll-details",
  templateUrl: "./poll-details.component.html",
  styleUrls: ["./poll-details.component.scss"],
})
export class PollDetailsComponent implements OnInit {
  urlId: number;
  poll: Poll;
  // selectedItem: number;
  selectedItems: boolean[];
  chartData: any;
  chartType = "doughnut";
  public activityChartOptions: any;
  public activityChartResponsive: any[];
  barChart: any;
  barChartOptions: any;
  barChartData: any;
  display: boolean;
  success: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  constructor(
    private pollService: PollService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private rt: ActivatedRoute
  ) {}

  ngOnInit() {
    this.rt.params.subscribe((params) => {
      this.urlId = params["id"];
      this.fetchData(false);
    });
  }

  fetchData(forceDisplay: boolean) {
    this.pollService.findById(this.urlId).subscribe((res) => {
      this.poll = res;
      this.poll.votes.sort((o1, o2) => o1.name.localeCompare(o2.name));
      let voteCount = 0;
      if (this.poll !== null) {
        this.selectedItems = [];
        this.poll.votes.forEach((e) => {
          voteCount += e.voteCount;
        });
        if (voteCount > 0) {
          let label = [];
          let data = [];
          let votes = [];
          for (let i = 0; i < this.poll.votes.length; ++i) {
            let percent = Math.round(
              (this.poll.votes[i].voteCount / voteCount) * 100
            );
            let itemlabel = this.poll.votes[i].name.trim();
            label.push(
              label.length > 15
                ? itemlabel.substring(0, 15) + " " + percent + "%"
                : itemlabel + " " + percent + "%"
            );
            data.push(percent);
            votes.push(this.poll.votes[i].voteCount);
            this.selectedItems.push(false);
          }
          this.chartData = { label, data };
          this.activityChartOptions = {
            height: "245px",
            //  plugins: [Chartist.plugins.legend()]
          };
          console.log(data);
          this.barChartData = { label, data: [votes] };
        }
      }
      if (forceDisplay) {
        this.display = true;
      }
    });
  }

  showNotification(text: string, color: string) {
    this._snackBar.open(text, "X", {
      duration: 1700,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ["mat-toolbar", color],
    });
  }

  copyToClipboard() {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = window.location.origin + "/poll/" + this.urlId;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
    this.showNotification("Copied to Clipboard!", "mat-primary");
  }

  vote() {
    if (
      !this.poll.multipleAnswer &&
      this.selectedItems.filter((e) => e).length > 1
    ) {
      this.showNotification("Something went wrong", "mat-warn");
      return;
    }
    if (this.selectedItems.every((e) => !e)) {
      this.showNotification("You haven't selected any option!", "mat-warn");
      return;
    }
    let selectedVotes = [];
    for (let i = 0; i < this.poll.votes.length; ++i) {
      if (this.selectedItems[i]) {
        selectedVotes.push(this.poll.votes[i].code);
      }
    }
    this.pollService.vote(selectedVotes).subscribe(
      (res) => {
        this.showNotification("Thank you for voting", "mat-primary");
        this.display = false;
        this.fetchData(true);
      },
      (err) =>
        this.showNotification(
          "You have alredy voted in this poll!",
          "mat-accent"
        )
    );
    //  this.showNotification('success', 'Thank you for voting', 'pe-7s-smile');
  }

  asd(id: number) {
    if (
      !this.poll.multipleAnswer &&
      this.selectedItems.filter((e) => e === true).length > 0
    ) {
      this.selectedItems[id] = false;
      alert(this.selectedItems.filter((e) => e === true).length);
      this.showNotification(
        "You can't select more than one option!",
        "mat-accent"
      );
    } else {
      this.selectedItems[id] = true;
    }
  }

  isDisabled(id: number) {
    return (
      !this.poll.multipleAnswer &&
      !this.selectedItems[id] &&
      this.selectedItems.filter((e) => e).length > 0
    );
  }
}
