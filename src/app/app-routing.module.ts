import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TitlePageComponent } from './title-page/title-page.component';


const routes: Routes = [
  { path: 'tasklist', component: TasklistComponent },
  { path: '', component: TitlePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
