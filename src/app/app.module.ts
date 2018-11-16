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
import { UserService } from './service/user.service';
import { TimeEntryService } from './service/time-entry.service';
import { AppRoutingModule } from './app-routing.module';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { ProjectService } from './service/project.service';
import { EntryItemComponent } from './time-entry/entry-item/entry-item.component';
import { EntryListComponent } from './time-entry/entry-list/entry-list.component';
import { EntryStartComponent } from './time-entry/entry-start/entry-start.component';
import { FormatterService } from './service/formatter.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    TimeEntryComponent,
    OverviewComponent,
    ProjectComponent,
    EntryEditComponent,
    HeaderComponent,
    EntryItemComponent,
    EntryListComponent,
    EntryStartComponent,
    ProjectEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule
  ],
  providers: [ UserService, TimeEntryService, FormatterService, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
