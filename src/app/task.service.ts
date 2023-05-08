import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject ,BehaviorSubject } from 'rxjs';
import taskdata from '../assets/tasks.json';
import { TaskModel } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService implements OnInit {
  public task: any[] = [];
  public leader : any[] = [];
  public global : any[] = [];
  public personal : any[] = [];
  public TaskSubject = new BehaviorSubject({});

  public globaltasks = new BehaviorSubject({});
  public leadertasks = new BehaviorSubject({});
  public personaltasks = new BehaviorSubject({});


  constructor(private http : HttpClient) {
    this.task = taskdata;
    this.TaskSubject.next(this.task);

    // console.log(this.task.filter((item)=> item.isLeader == true ))
    this.personal = this.task.filter((item)=> item.isGlobal != true);
    this.leader = this.task.filter((item)=> item.isLeader == true );
    this.global = this.task.filter((item)=> item.isGlobal == true );

    console.log(this.leader)

    this.leadertasks.next(this.leader);
    this.globaltasks.next(this.global);
    this.personaltasks.next(this.personal);

    this.leadertasks.subscribe(data => {console.log(data)})
  }
  ngOnInit(){
    
  }
  
  // public getTask(){
  //   return this.TaskSubject.asObservable();
  // }

  public getTask(tasktype : String = 'all'){
      switch(tasktype){
      case 'global':
        return this.globaltasks.asObservable();
      case 'personal':
        return this.personaltasks.asObservable();
      case 'leader' : 
        return this.leadertasks.asObservable();
      default :
        return this.TaskSubject.asObservable();
      }      
  }
  public addTask(newTask:any[]){
    this.task.push(newTask);
    this.TaskSubject.next(this.task);

    this.personal = this.task.filter((item)=> item.isGlobal != true);
    this.leader = this.task.filter((item)=> item.isLeader == true );
    this.global = this.task.filter((item)=> item.isGlobal == true );

    this.leadertasks.next(this.leader);
    this.globaltasks.next(this.global);
    this.personaltasks.next(this.personal);
  }
   
  public updateTask(selectedTasks){
    this.task.forEach(item => {
      if (item.text === selectedTasks.text) {
        item.isCompleted = true;
      }
    });
    
  }
}