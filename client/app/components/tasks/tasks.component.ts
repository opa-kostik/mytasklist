import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../Task';

@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: 'tasks.component.html'
})

export class TasksComponent {
  tasks: Task[];
  title: string;
  constructor(private taskService: TaskService){
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  addTask(event){
    event.preventDefault();
    let newTask = {
      title: this.title,
      is_done: false
    } 
    this.taskService.addTask(newTask)
      .subscribe(task => {
        this.tasks.push(task)
        this.title = "";
      });
  }

  deleteTask(id){
    var tasks = this.tasks;
    this.taskService.deleteTask(id)
      .subscribe(data => { 
        // for( let i = 0; i < tasks.length; i++){
        //   if (tasks[i]['_id'] == id){  
        //     tasks.splice(i,1);
        //   }
        // }
      });
    for( let i = 0; i < tasks.length; i++){
      if (tasks[i]['_id'] == id){  
        tasks.splice(i,1);
      }
    }
  }

  updateStatus(task){
    let updTask = {
      _id: task._id,
      title: task.title,
      is_done: !task.is_done
    };
    this.taskService.updateStatus(updTask)
      .subscribe(data => { 
        task.id_done = !task.is_done;
      })
  }

}