import { Time } from "@angular/common";

export class TimeEntry {
    public fromTime: Time;
    public toTime: Time;
    public projectName: string;
    public description: string;
    public entryDate: Date;

    public duration: number; // custom format needed

    constructor(fromTime: Time, toTime:Time, projectName: string, description: string, entryDate: Date, duration: number){
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.projectName = projectName;
        this.description = description;
        this.entryDate = entryDate;
        this.duration = duration;
    }
}