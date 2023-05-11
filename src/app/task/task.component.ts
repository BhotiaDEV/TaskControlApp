import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { TaskModel } from '../task.model';
import { map,tap } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  public data;
  public tasks;
  public tasktype: string = '';
  public selectedTasks;
  public newTask : any;
  public toggleForm : boolean = false;

  taskForm: FormGroup;

  constructor(private taskService: TaskService , private formBuilder: FormBuilder) {
    this.taskService.TaskSubject.subscribe((data)=> this.data = data);
    this.tasks = this.data.all;
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      task: ['', Validators.required],
      type: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    })
   }

  ngOnInit() {
  }
  

  addtask(task){
    if(!this.taskForm.valid)
    return;
    const type = task.target.type.valye.toLowerCase();
    this.newTask = {
        text  :task.target.task.value, 
        creator :task.target.name.value, 
        start :task.target.start.value, 
        end :task.target.end.value, 
        isGlobal  : type === 'global',
        isLeader  : type === 'leader',
        isCompleted : false
    }
    this.taskService.addTask(this.newTask);
  }

  update(){
    if(this.selectedTasks)
    this.taskService.updateTask(this.selectedTasks);
  }

  changeType(type:string){
    this.tasktype = type;
    this.tasks = this.data[type];
  }
}