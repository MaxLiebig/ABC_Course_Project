import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { ProjectComponent } from './project/project.component';
import { TimeEntryComponent } from './time-entry/time-entry.component';
import { EntryEditComponent } from './time-entry/entry-edit/entry-edit.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { UserService } from './service/user.service';
import { ProjectService } from './service/project.service';

@NgModule({
  declarations: [
    AppComponent,
    TimeEntryComponent,
    OverviewComponent,
    ProjectComponent,
    EntryEditComponent,
    HeaderComponent,
    ProjectEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule

  ],
  providers: [ UserService, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
