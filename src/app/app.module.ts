import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ModelsComponent } from './models/models.component';
import { OverviewComponent } from './overview/overview.component';
import { ProjectComponent } from './project/project.component';
import { TimeEntryComponent } from './time-entry/time-entry.component';
import { EntryEditComponent } from './time-entry/entry-edit/entry-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ModelsComponent,
    TimeEntryComponent,
    OverviewComponent,
    ProjectComponent,
    EntryEditComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
