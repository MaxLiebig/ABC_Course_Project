import { Injectable, OnInit } from "@angular/core";
import { TimeEntry } from "../models/time-entry.model";
import { Time } from "@angular/common";
import { UserService } from "./user.service";
import { Subject } from "rxjs";

@Injectable()
export class TimeEntryService implements OnInit{

    timeEntries: TimeEntry[] = [
        new TimeEntry({hours: 12, minutes: 0}, {hours: 16, minutes: 23}, 'testProject', 'descriptionText', new Date(), 4.25)
    ];
    timeEntriesChanged = new Subject<TimeEntry[]>();

    constructor(private userService: UserService){
    }

    ngOnInit(){}

    getAllTimeEntries(){
        //TODO: http call with current User as input
        return this.timeEntries.slice();
    }

    getTimeEntry(index: number){
        return this.timeEntries[index];
    }

    notifyListeners(){
        this.timeEntriesChanged.next(this.timeEntries.slice());
    }

    addTimeEntry(timeEntry: TimeEntry){
        this.timeEntries.push(timeEntry);
        //Maybe push to Backend?
        this.notifyListeners();
    }

    updateTimeEntry(index: number, timeEntry: TimeEntry){
        this.timeEntries[index] = timeEntry;
        this.notifyListeners();
    }

    deleteTimeEntry(index: number){
        this.timeEntries.splice(index, 1);
        this.notifyListeners();
    }

}