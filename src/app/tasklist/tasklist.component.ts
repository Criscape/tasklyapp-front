import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { TasklistService } from 'src/app/tasklist/tasklist.service';
import { IState, ITask } from '../models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  title = environment.title;
  value = '';
  tasks: ITask[];
  states: IState[];
  tasksSubject = new Subject<IState[]>();

  constructor(
    private tasklistService: TasklistService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.loadTasks();
    this.loadStates();
  }

  loadTasks () {
    this.tasksSubject.subscribe(states => {
      this.tasklistService.listTasksByUser('5fb94c5500653c4d5bde3f5b')
      .subscribe(res => {
        this.tasks = res.map((task: ITask) => {
          return <ITask> {
            _id: task._id,
            userId: task.userId,
            stateId: task.stateId,
            description: task.description
          };
        });
        this.tasks.map(task => {
          task.state = states.filter(state => state._id === task.stateId)[0].name;
        });
      });
    });
  }

  createTask () {
    if (this.value === '') {
      this._snackBar.open('Please type something before save.', 'OK', { duration: 3000 });
    } else {
      this.tasklistService.createTask(this.value)
      .subscribe(res => {
        if (res.ans === 'Done') {
          this.loadTasks();
        } else {
          this._snackBar.open('There was an error while saving.', 'OK', { duration: 3000 });
        }
      });
    }
  }

  deleteTask (task: ITask) {
    this.tasklistService.deleteTask(task._id)
    .subscribe(res => {
      if (res.ans === 'Done') {
        this.loadTasks();
      } else {
        this._snackBar.open('There was an error while deleting.', 'OK', { duration: 3000 });
      }
    });
  }

  loadStates () {
    this.tasklistService.loadStates()
    .subscribe(res => {
      this.states = res.map((state: IState) => {
        return <IState> {
          _id: state._id,
          name: state.name,
          description: state.description
        };
      });
      this.tasksSubject.next(this.states);
    });
  }

  changeState (event: any) {
    console.log(event);
  }
}
