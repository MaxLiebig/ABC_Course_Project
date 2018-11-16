import { Time } from "@angular/common";
import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";

export class FormatterService{

    convertTimeToString(inputTime: Time): string{
        let minutes = inputTime['minutes']+'';
        if(minutes && minutes.length <= 1){
            minutes= '0' + minutes;
        }
        return inputTime['hours'] + ':' + minutes;
    }

    convertNgbTimeStructToTime(input: NgbTimeStruct): Time{
        return {hours: input.hour, minutes: input.minute};
    }

    calculateTimesToDuration(fromTime: Time, toTime: Time){
        const timeslot = 4;
        let difHours = Math.abs(toTime.hours - fromTime.hours);
        let difMinutes = Math.abs(toTime.minutes - fromTime.minutes);
        const wholeMinutes = (Math.floor(difMinutes / (60 / 4)) * (100 / timeslot) ) / 100;
        
        return difHours+wholeMinutes;
    }
}