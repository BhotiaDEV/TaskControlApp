import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public personal;
  public tasks;
  public all;
  constructor(private taskService: TaskService) {
    this.taskService.getTask().subscribe(data => this.tasks = data);
    this.personal = this.tasks.personal;
    this.all = this.tasks.all;
   }

  ngOnInit(): void {
  }

}
