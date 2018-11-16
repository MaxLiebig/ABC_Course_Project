import { Component, OnInit, OnDestroy } from "@angular/core";
import { TimeEntry } from "src/app/models/time-entry.model";
import { TimeEntryService } from "src/app/service/time-entry.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-entry-list',
    templateUrl: './entry-list.component.html',
    styleUrls: ['./entry-list.component.css'] 
})
export class EntryListComponent implements OnInit, OnDestroy{
    timeEntries: TimeEntry[] = [];
    subscription: Subscription;

    constructor(private timeEntryService: TimeEntryService,
                private router: Router,
                private route: ActivatedRoute){}

    ngOnInit(){
        this.subscription = this.timeEntryService.timeEntriesChanged.subscribe(
            (entries: TimeEntry[]) => {
                this.timeEntries = entries;
            }
        );
        this.timeEntries = this.timeEntryService.getAllTimeEntries();
    }

    onNewTimeEntry(){
        this.router.navigate(['new'], {relativeTo: this.route});
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}