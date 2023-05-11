import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public tasks : any;
  public leader : any;
  public personal : any;
  public global : any;
  constructor(private taskService: TaskService) {
    this.taskService.TaskSubject.subscribe((data) => this.tasks = data);
    this.personal = this.tasks.personal;
    this.leader = this.tasks.leader;
    this.global = this.tasks.global;
   }
  ngOnInit(): void {
  }
}