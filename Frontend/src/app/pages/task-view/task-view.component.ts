import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists:any;
  tasks:any;
  selectedListId='';
  constructor(private taskServeice:TaskService , private route:ActivatedRoute,private router:Router,private authService:AuthService) { }

  ngOnInit(): void {

    this.route.params.subscribe((params)=>{
      console.log(params);
     
      if (params.listId) {
        this.selectedListId = params.listId;
        this.taskServeice.getTasks(params.listId).subscribe(tasks=>{
          console.log(tasks);
          this.tasks=tasks;
        })
      } else {
        this.tasks = undefined;
      }
    })

    this.taskServeice.getList().subscribe(lists=>{
      console.log(lists);
      this.lists=lists;
      
    })

    
  }

  onTaskClick(task: Task){
    this.taskServeice.updateTask({completed:!task.completed},task._listId,task._id).subscribe(updatedTask=>{
      console.log(updatedTask);
      task.completed=!task.completed
    })
  }
  onDeleteListClick() {
    this.taskServeice.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskServeice.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter((val:any) => val._id !== id);
      console.log(res);
    })
  }
  logout(){
    this.authService.logOut()
  }
}
