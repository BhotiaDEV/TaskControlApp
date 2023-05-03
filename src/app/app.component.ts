import { Component } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public leader ;
  public global ; 
  public personal ;
  constructor(private taskService: TaskService){
    this.taskService.getTask('leader').subscribe(data => {this.leader = data})
    this.taskService.getTask('global').subscribe(data => {this.global = data})
    this.taskService.getTask('personal').subscribe(data => {this.personal = data})
    // console.log(this.personal.length)
    this.taskService.getTask().subscribe(data=>{console.log(data)})
  }
}
