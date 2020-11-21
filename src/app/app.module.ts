import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarMainComponent } from './toolbar-main/toolbar-main.component';
import { MatButtonModule } from '@angular/material/button';
import { TitlePageComponent } from './title-page/title-page.component';
import { TasklistComponent } from './tasklist/tasklist.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarMainComponent,
    TitlePageComponent,
    TasklistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
