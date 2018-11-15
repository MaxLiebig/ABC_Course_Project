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
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TimeEntryComponent,
    OverviewComponent,
    ProjectComponent,
    EntryEditComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule

  ],
  providers: [ UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
