import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class TaskService{
    constructor(private http:Http){}

    getTasks(){
        return this.http.get("/api/tasks")
            .map(task => task.json());
    }

    addTask(newTask){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post("/api/task", JSON.stringify(newTask), {headers:headers})
            .map(res => res.json());
    }

    deleteTask(id){
        return this.http.delete("/api/task/"+id)
            .map(res => res.json());
    }

    updateStatus(task){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put("/api/task/"+task._id, JSON.stringify(task), {headers:headers})
            .map(res => res.json());
    }
}