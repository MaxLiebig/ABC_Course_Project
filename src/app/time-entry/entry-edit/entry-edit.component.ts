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
import { ProjectService } from 'src/app/service/project.service';

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

  //description = '';

  projects: Project[] = [];
  selectedProject: Project;
  
  routeSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private timeEntryService: TimeEntryService,
              private formatter: FormatterService,
              private projectService: ProjectService,
              private router: Router) { }

  ngOnInit() {
    this.routeSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null && params['id'] !== 'new';
          this.initForm();
        }
      );
  }

  setSelectedProject(event){
    debugger;
    console.log("event", event);
  }

  onSubmit(form: NgForm) {
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
    this.fromTime = {hour: 8, minute: 0, second: 0};
    this.toTime = {hour: 17, minute: 0, second: 0};
    this.updateDuration();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  updateDuration(){
    //let newFromTime:Time = {hours: this.fromTime.hour, minutes: this.fromTime.minute};
    let newFromTime:Time = {hours: this.fromTime.hour, minutes: this.fromTime.minute};
    let newToTime:Time = this.formatter.convertNgbTimeStructToTime(this.toTime);
    this.duration = this.formatter.calculateTimesToDuration(newFromTime, newToTime);
  }

  private initForm(){
    this.projects = this.projectService.getProjectList();
    if(this.projects && this.projects.length >= 1){
      this.selectedProject = this.projects[1];
    }
    if(this.editMode){
      const timeEntry = this.timeEntryService.getTimeEntry(this.id);
      this.fromTime = {hour: timeEntry.fromTime.hours, minute: timeEntry.fromTime.minutes, second: 0};
      this.toTime = {hour: timeEntry.toTime.hours, minute: timeEntry.toTime.minutes, second: 0};
      this.duration = timeEntry.duration;
      this.currentDateString = timeEntry.entryDate.getFullYear()+'-'+(timeEntry.entryDate.getMonth()+1)+"-"+timeEntry.entryDate.getDate();
      console.log("entry form",this.timeEntryForm);
      let entryProject = this.projectService.getProjectByName(timeEntry['projectName']);
      if(entryProject){
        debugger;
        this.selectedProject = entryProject;
      }
      setTimeout( () => {
        this.timeEntryForm.setValue({
          description: timeEntry.description,
          entryDate: this.currentDateString
        });
      }
      , 100);

    }else{
      this.fromTime = {hour: 8, minute: 0, second: 0};
      this.toTime = {hour: 17, minute: 0, second: 0};
      this.updateDuration();
      setTimeout( () => {
        this.timeEntryForm.setValue({
          description: '',
          entryDate: ''
        });
      }
      , 100);
    }
  }

  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
  }


}
