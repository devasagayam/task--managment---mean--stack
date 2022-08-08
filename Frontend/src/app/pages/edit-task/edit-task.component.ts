import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  listTitleInput:any;
  taskId: string;
  listId: string;

  constructor(private taskServeice:TaskService,private router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.taskId = params.taskId;
        this.listId = params.listId;
      }
    )
  }

  updateTask() {
    this.taskServeice.updateTask({title:this.listTitleInput},this.listId, this.taskId).subscribe(() => {
      this.router.navigate(['/lists', this.listId]);
    })
  }

}
