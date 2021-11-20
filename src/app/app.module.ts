import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { DateTimeComponent } from './components/header-date-time/date-time.component';
import { HeaderTasksComponent } from './components/header-tasks/header-tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainListListComponent } from './components/main-list-list/main-list-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MainListTaskComponent } from './components/main-list-task/main-list-task.component';
import { ListDetailComponent } from './components/list-detail/list-detail.component';
import { AddListComponent } from './components/crud/add-list/add-list.component';
import { BsModalService} from "ngx-bootstrap/modal";


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    DateTimeComponent,
    HeaderTasksComponent,
    MainListListComponent,
    MainListTaskComponent,
    ListDetailComponent,
    AddListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
