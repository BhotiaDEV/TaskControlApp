import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public leader : any;
  public personal : any;
  public global : any;
  constructor(private taskService: TaskService) {
    this.taskService.getTask('leader').subscribe((data) => this.leader = data);
    this.taskService.getTask('global').subscribe((data) => this.global = data);
    this.taskService.getTask('personal').subscribe((data) => this.personal = data);
   }
  //  "@angular/router": "^14.0.0",
  //  "@reactivex/rxjs": "^6.6.7",
  //  "primeicons": "^5.0.0",
  //  "primeng": "^14.0.0",
  //  "rxjs": "~7.5.0",
  ngOnInit(): void {
  }

}
