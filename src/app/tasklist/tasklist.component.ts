import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TasklistService } from 'src/app/tasklist/tasklist.service';
import { IState, ITask, State } from '../models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

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
  done = State.Done;

  constructor(
    private tasklistService: TasklistService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.loadTasks();
    this.loadStates();
  }

  updateTasks (states: IState[]) {
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
  }

  updateTask (
    _id: String,
    stateId: String,
    description: String
  ) {
    this.tasklistService.updateTask(_id, stateId, description)
    .subscribe(res => {
      if (res.ans === 'Done') {
        this.updateTasks(this.states);
      } else {
        this._snackBar.open('There was an error while updating.', 'OK', { duration: 3000 });
      }
    })
  }

  loadTasks () {
    this.tasksSubject.subscribe(states => {
      this.updateTasks(states);
    });
  }

  createTask () {
    if (this.value === '') {
      this._snackBar.open('Please type something before save.', 'OK', { duration: 3000 });
    } else {
      this.tasklistService.createTask(this.value)
      .subscribe(res => {
        if (res.ans === 'Done') {
          this.updateTasks(this.states);
        } else {
          this._snackBar.open('There was an error while saving.', 'OK', { duration: 3000 });
        }
        this.value = '';
      });
    }
  }

  deleteTask (task: ITask) {
    this.tasklistService.deleteTask(task._id)
    .subscribe(res => {
      if (res.ans === 'Done') {
        this.updateTasks(this.states);
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

  changeState (event: any, task: ITask) {
    if (event.checked) {
      task.stateId = State.Done;
      task.state = this.states.filter(state => state._id === task.stateId)[0].name;
      this.updateTask(task._id, task.stateId, task.description);
    } else {
      task.stateId = State.Well;
      task.state = this.states.filter(state => state._id === task.stateId)[0].name;
      this.updateTask(task._id, task.stateId, task.description);
    }
  }

  openDialog(task: ITask): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '250px',
      data: {
        description: task.description
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.updateTask(task._id, task.stateId, res);
    });
  }
}
