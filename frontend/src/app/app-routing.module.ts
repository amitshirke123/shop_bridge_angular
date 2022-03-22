import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DahsboardComponent } from './components/dahsboard/dahsboard.component';

const routes: Routes = [
  {path: '', component: DahsboardComponent},
  {path: 'home', component: DahsboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
