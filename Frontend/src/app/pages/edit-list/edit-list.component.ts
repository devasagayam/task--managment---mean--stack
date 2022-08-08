import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {
  listTitleInput:any;
  listId:any;
  constructor(private taskServeice:TaskService,private router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params.listId;
        console.log(params.listId);
      }
    )
  }

  updateList(){
    this.taskServeice.updateList(this.listTitleInput ,this.listId, ).subscribe((res) => {
      console.log(res);
      
      this.router.navigate(['/lists', this.listId]);
    })
  }

}
