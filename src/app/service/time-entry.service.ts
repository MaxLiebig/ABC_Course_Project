import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { TimeEntry } from "../models/time-entry.model";
import { Time } from "@angular/common";
import { UserService } from "./user.service";
import { Subject, Subscription } from "rxjs";
import { Http, Response } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable()
export class TimeEntryService implements OnInit, OnDestroy{
    dataSubscription: Subscription;
    timeEntries: TimeEntry[] = [
        new TimeEntry({hours: 12, minutes: 0}, {hours: 16, minutes: 23}, 'K-123456', 'descriptionText', new Date(), 4.25)
    ];
    //timeEntries: TimeEntry[] = [];
    timeEntriesChanged = new Subject<TimeEntry[]>();

    constructor(private userService: UserService, private http: Http){
    }

    ngOnInit(){
        this.loadAllTimeEntries();
    }

    getAllTimeEntries(){
        //TODO: http call with current User as input
        return this.timeEntries.slice();
    }

    getTimeEntry(index: number){
        return this.timeEntries[index];
    }

    loadAllTimeEntries(){
        this.dataSubscription = this.http.get('http://localhost:3001/data/timeEntries.json').pipe(
            map((response: Response) => {
                let storedList: TimeEntry[] = response.json();
                for(let tmpEntry of storedList){
                    let stringDate = tmpEntry.entryDate;
                    tmpEntry.entryDate = new Date(stringDate);
                }
                return storedList;
            })
        ).subscribe(
            (entries: TimeEntry[]) => {
                console.log("loaded time entries:", entries);
                this.timeEntries = entries;
                this.notifyListeners();
                return entries;
            }
        );
    }

    notifyListeners(){
        this.timeEntriesChanged.next(this.timeEntries.slice());
    }

    addTimeEntry(timeEntry: TimeEntry){
        this.timeEntries.push(timeEntry);
        //Maybe push to Backend?
        this.notifyListeners();
        this.storeTimeEntriesOnBackend();
    }

    updateTimeEntry(index: number, timeEntry: TimeEntry){
        this.timeEntries[index] = timeEntry;
        this.notifyListeners();
        this.storeTimeEntriesOnBackend();
    }

    storeTimeEntriesOnBackend(){
        let sub = this.http.post('http://localhost:3001/data/timeEntries.json',this.timeEntries).subscribe(
            (resp: Response) => { 
                console.log('stored time entries with result:', resp); 
            }
            ,(err) => {console.log('error in storing time entries:', err)}
            );
    }

    deleteTimeEntry(index: number){
        this.timeEntries.splice(index, 1);
        this.notifyListeners();
    }

    ngOnDestroy(){
        if(this.dataSubscription){
            this.dataSubscription.unsubscribe();
        }
    }

}