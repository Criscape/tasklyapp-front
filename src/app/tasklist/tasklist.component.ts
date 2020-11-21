import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  title = environment.title;

  constructor() { }

  ngOnInit(): void {
  }

}
