import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasklistService {

  constructor(
    private http: HttpClient
  ) { }

  listTasksByUser(userId: string): Observable<any[]> {
    const url = environment.backUrl + environment.backRoutes.listTask + '/' + userId;
    return this.http.get<any[]>(url);
  }

  createTask(description: String): Observable<any> {
    const url = environment.backUrl + environment.backRoutes.createTask;
    let body = {
      userId: '5fb94c5500653c4d5bde3f5b',
      stateId: '5fb95271c020d53c9be845ed',
      description: description
    };
    return this.http.post(url, body);
  }

  deleteTask(_id: String): Observable<any> {
    const url = environment.backUrl + environment.backRoutes.deleteTask  + '/' + _id;
    return this.http.delete(url);
  }

  loadStates(): Observable<any> {
    const url = environment.backUrl + environment.backRoutes.listState;
    return this.http.get(url);
  }

  updateTask(
    _id: String,
    stateId: String,
    description: String
    ): Observable<any> {
    const url = environment.backUrl + environment.backRoutes.updateTask;
    let body = {
      _id: _id,
      userId: '5fb94c5500653c4d5bde3f5b',
      stateId: stateId,
      description: description
    };
    return this.http.put(url, body);
  }
}
