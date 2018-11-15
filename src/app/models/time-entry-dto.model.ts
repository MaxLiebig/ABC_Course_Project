import { Time } from "@angular/common";
import { User } from "./user.model";

export class TimeEntryDTO {
    public fromTime: Time;
    public toTime: Time;
    public projectName: string;
    public description: string;
    public entryDate: Date;

    public user: User;

    constructor(fromTime: Time, toTime:Time, projectName: string, description: string, entryDate: Date, user: User){
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.projectName = projectName;
        this.description = description;
        this.entryDate = entryDate;
        this.user = user;
    }
}