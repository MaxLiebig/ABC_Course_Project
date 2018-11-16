import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TimeEntryService } from 'src/app/service/time-entry.service';
import { Time } from '@angular/common';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { TimeEntry } from 'src/app/models/time-entry.model';
import { FormatterService } from 'src/app/service/formatter.service';
import { Subscription, Subject } from 'rxjs';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-entry-edit',
  templateUrl: './entry-edit.component.html',
  styleUrls: ['./entry-edit.component.css']
})
export class EntryEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  @ViewChild('timeForm') timeEntryForm: NgForm;
  
  fromTime: NgbTimeStruct = {hour: 8, minute: 0, second: 0};
  toTime: NgbTimeStruct = {hour: 17, minute: 0, second: 0};
  duration: number;
  
  currentDateString = new Date().toISOString();

  description = '';

  projects: Project[] = [];
  selectedProject: Project;
  

  constructor(private route: ActivatedRoute,
              private timeEntryService: TimeEntryService,
              private formatter: FormatterService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null && params['id'] !== 'new';
          this.initForm();
        }
      );
  }

  onSubmit(form: NgForm) {
    console.log('submit time entry: ', form.value);
    console.log("fromTime", this.fromTime);
    console.log("toTime", this.toTime);

    let newFromTime:Time = {hours: this.fromTime.hour, minutes: this.fromTime.minute};
    let newToTime:Time = {hours: this.toTime.hour, minutes: this.toTime.minute};

    let newProject = ( this.selectedProject && this.selectedProject['name']) ? this.selectedProject['name'] : 'K-123';
    let newDescription= (form.value['description']) ? form.value.description : '';
    let newDuration = this.formatter.calculateTimesToDuration(newFromTime, newToTime);
    let entryDate = new Date();

    const newTimeEntry = new TimeEntry(newFromTime, newToTime, newProject, newDescription, entryDate, newDuration);

    console.log("new Time entry to push: ", newTimeEntry);
    if (this.editMode) {
      this.timeEntryService.updateTimeEntry(this.id, newTimeEntry);
    } else {
      this.timeEntryService.addTimeEntry(newTimeEntry);
    }
    this.onCancel(form);
  }

  onCancel(form: NgForm) {
    this.id = null;
    this.editMode = false;
    form.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  updateDuration(){
    //let newFromTime:Time = {hours: this.fromTime.hour, minutes: this.fromTime.minute};
    let newFromTime:Time = {hours: this.fromTime.hour, minutes: this.fromTime.minute};
    let newToTime:Time = this.formatter.convertNgbTimeStructToTime(this.toTime);
    this.duration = this.formatter.calculateTimesToDuration(newFromTime, newToTime);
  }

  private initForm(){
    if(this.editMode){
      const timeEntry = this.timeEntryService.getTimeEntry(this.id);
      this.fromTime = {hour: timeEntry.fromTime.hours, minute: timeEntry.fromTime.minutes, second: 0};
      this.toTime = {hour: timeEntry.toTime.hours, minute: timeEntry.toTime.minutes, second: 0};
      this.duration = timeEntry.duration;
      this.currentDateString = timeEntry.entryDate.toISOString();
      //TODO add preselection to selected Project
      //"entryDate": timeEntry.entryDate.toISOString(),

    }else{
      //TODO add preselection to selected Project
      this.updateDuration();
    }
  }

  ngOnDestroy(){

  }


}
