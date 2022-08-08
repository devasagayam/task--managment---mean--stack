import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  public projectName:any;
  constructor(private taskServeice:TaskService,private router: Router) { }

  ngOnInit(): void {
  }
  createList(){
    console.log(this.projectName);
    
    this.taskServeice.createList(this.projectName).subscribe((res:any)=>{
      console.log(res);
      this.router.navigate([ '/lists', res._id ]);
    })
  }
}
