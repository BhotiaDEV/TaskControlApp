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
  public tasks;
  public tasktype: string = '';
  public selectedTasks;
  public newTask : any;
  public toggleForm : boolean = false;

  taskForm: FormGroup;

  constructor(private taskService: TaskService , private formBuilder: FormBuilder) {
    this.taskService.getTask().subscribe((data)=> this.tasks = data);

    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      task: ['', Validators.required],
      type: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }
  

  addtask(task){
    console.log(task.target.name)
    // this.taskService.newTask.emit
    if(this.taskForm.valid)
    {
    if(task.target.type.value.toLowerCase() == 'personal')
    this.newTask = {
        text  :task.target.task.value, 
        creator :task.target.name.value, 
        start :task.target.start.value, 
        end :task.target.end.value, 
        isGlobal  :false,
        isLeader  :false,
        isCompleted : false
    }
    else if(task.target.type.value.toLowerCase() == 'global')
    this.newTask = {
        text  :task.target.task.value, 
        creator :task.target.name.value, 
        start :task.target.start.value, 
        end :task.target.end.value, 
        isGlobal  :true,
        isLeader  :false,
        isCompleted : false
    }
    else if(task.target.type.value.toLowerCase() == 'leader')
    this.newTask = {
        text  :task.target.task.value, 
        creator :task.target.name.value, 
        start :task.target.start.value, 
        end :task.target.end.value, 
        isGlobal  :false,
        isLeader  :true,
        isCompleted : false
    }
    // console.log(this.taskService.newTask);
    this.taskService.addTask(this.newTask);
    }
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
