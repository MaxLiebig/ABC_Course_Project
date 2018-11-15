import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OverviewComponent } from "./overview/overview.component";
import { TimeEntryComponent } from "./time-entry/time-entry.component";
import { EntryEditComponent } from "./time-entry/entry-edit/entry-edit.component";
import { ProjectComponent } from "./project/project.component";
import { EntryStartComponent } from "./time-entry/entry-start/entry-start.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/overview', pathMatch: 'full'},
    { path: 'overview', component: OverviewComponent },
    { path: 'time-entry', component: TimeEntryComponent, children: [
        { path: '', component: EntryStartComponent},
        { path: ':id', component: EntryEditComponent },
        { path: 'new', component: EntryEditComponent },
    ] },
    { path: 'project', component: ProjectComponent},
    
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}