import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { TaskModel } from '../task.model';
import { map,tap } from 'rxjs/operators'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  public tasks;
  public tasktype: string = '';
  public selectedTasks;
  public newTask : any;
  public toggleForm : boolean = false;


  constructor(private taskService: TaskService) {
    this.taskService.getTask().subscribe((data)=> this.tasks = data);
   }

  ngOnInit(): void {
  }
  removetask(){}
  addtask(task){
    console.log(task.target.name)
    // this.taskService.newTask.emit
    this.newTask = {
        task  :task.target.task.value, 
        creator :task.target.name.value, 
        start :task.target.start.value, 
        end :task.target.end.value, 
        tasktype  :task.target.type.value,
        isCompleted : false
    }
    // console.log(this.taskService.newTask);
    this.taskService.addTask(this.newTask);
  }
  update(){
    if(this.selectedTasks)
    this.taskService.updateTask(this.selectedTasks);
    // this.taskService.task.forEach(element => {
    //   if(element.text === this.selectedTasks.text)
    //     element.isCompleted = true;
    // });
    // console.log(this.taskService.task)
  }
  changeType(type:string){
    this.tasktype = type;
  }
  newtask(){

  }
}
