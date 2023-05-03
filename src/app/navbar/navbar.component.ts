import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public personal;
  public all;
  public personalLength;
  public allLength;
  constructor(private taskService: TaskService) {
    this.taskService.getTask().subscribe(data => this.all = data);
    this.taskService.getTask('personal').subscribe(data => this.personal = data)
    this.personalLength = this.personal.filter((item) => item.isCompleted == false )
    this.allLength = this.all.filter((item) => item.isCompleted == false )
   }

  ngOnInit(): void {
  }

}
