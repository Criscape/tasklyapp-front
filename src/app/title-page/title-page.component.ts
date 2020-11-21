import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.css']
})
export class TitlePageComponent implements OnInit {

  title = environment.title;
  tasklist = environment.routes.tasklist;

  constructor() { }

  ngOnInit(): void {
  }

}
