import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject ,BehaviorSubject } from 'rxjs';
import taskdata from '../assets/tasks.json';
import { TaskModel } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService implements OnInit {
  public task;
  public leader ;
  public global ;
  public personal ;
  public TaskSubject = new BehaviorSubject([]);

  constructor(private http : HttpClient) {
    this.task = taskdata;
    this.personal = this.task.filter((item)=> item.isGlobal != true);
    this.leader = this.task.filter((item)=> item.isLeader == true );
    this.global = this.task.filter((item)=> item.isGlobal == true );    
    const obj : any = {
      personal : this.personal,
      global : this.global,
      leader : this.leader,
      all : this.task
    }
    this.TaskSubject.next(obj);
  }
  ngOnInit(){}

  public getTask(tasktype : String = 'all'){
        return this.TaskSubject.asObservable();    
  }

  public addTask(newTask:any[]){
    this.task.push(newTask);
    this.personal = this.task.filter((item)=> item.isGlobal != true);
    this.leader = this.task.filter((item)=> item.isLeader == true );
    this.global = this.task.filter((item)=> item.isGlobal == true );    
    const obj : any = {
      personal : this.personal,
      global : this.global,
      leader : this.leader,
      all : this.task
    }
    this.TaskSubject.next(this.task);
  }
   
  public updateTask(selectedTasks){
    this.task.forEach(item => {
      if (item.text === selectedTasks.text) {
        item.isCompleted = true;
      }
    });
    
  }
}