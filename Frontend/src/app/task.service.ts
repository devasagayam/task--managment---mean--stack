import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl=''
  constructor(private http:HttpClient) { 
    this.baseUrl='http://localhost:3000'
  }

  createList(title:string){
    return this.http.post(this.baseUrl+'/v2/list/lists',{title:title})
  }
  createTask(title:string,id:any){
    return this.http.post(this.baseUrl+`/v2/task/lists/${id}/tasks`,{title:title})
  }
  getList(){
    return this.http.get(this.baseUrl+'/v2/list/lists')
  }
  getTasks(id:any){
    
    return this.http.get(this.baseUrl+'/v2/task/lists/'+id+'/tasks')
  }
  updateTask(Obj:any,Lid:any,Tid:any){
    return this.http.patch(this.baseUrl+`/v2/task/lists/${Lid}/tasks/${Tid}`,Obj)
  }
  deleteTask(Lid:any,Tid:any){
    return this.http.delete(this.baseUrl+`/v2/task/lists/${Lid}/tasks/${Tid}`)
  }
  updateList(Obj:any,Lid:any){
    return this.http.patch(this.baseUrl+`/v2/list/lists/${Lid}`,{title:Obj})
  }
   deleteList(Lid:any){
    return this.http.delete(this.baseUrl+`/v2/list/lists/${Lid}`)
  }
}
