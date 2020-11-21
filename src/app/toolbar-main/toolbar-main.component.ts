import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-toolbar-main',
  templateUrl: './toolbar-main.component.html',
  styleUrls: ['./toolbar-main.component.css']
})
export class ToolbarMainComponent implements OnInit {

  @Input() title: String;
  tasklist = environment.routes.tasklist;
  home = environment.routes.home;

  constructor() { }

  ngOnInit(): void {
  }

}
