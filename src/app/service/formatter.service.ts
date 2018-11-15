import { Time } from "@angular/common";

export class FormatterService{

    convertTimeToString(inputTime: Time): string{
        let minutes = inputTime['minutes']+'';
        if(minutes && minutes.length <= 1){
            minutes= '0' + minutes;
        }
        return inputTime['hours'] + ':' + minutes;
    }

    calculateTimesToDuration(fromTime: Time, toTime: Time){
        const timeslot = 4;
        let difHours = Math.abs(toTime.hours - fromTime.hours);
        let difMinutes = Math.abs(toTime.minutes - fromTime.minutes);
        const wholeMinutes = (Math.floor(difMinutes / (60 / 4)) * (100 / timeslot) ) / 100;
        
        return difHours+wholeMinutes;
    }
}