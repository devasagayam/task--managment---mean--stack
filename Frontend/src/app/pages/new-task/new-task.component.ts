import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  public taskName:any;
  public listId:any;
  constructor(private taskServeice:TaskService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.listId = params['listId'];
    })
  }
  createTask(){
    this.taskServeice.createTask(this.taskName,this.listId).subscribe(newTask=>{
      console.log(newTask);
      this.router.navigate(['../'], { relativeTo: this.route });
    })
  }
}
