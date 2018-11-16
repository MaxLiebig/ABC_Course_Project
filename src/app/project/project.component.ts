import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Project } from '../models/project.model';
import { ProjectService } from '../service/project.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  projectID: number;
  isAdded = this.projectService.isAdded;
  getAddedSubscription: Subscription;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projects = this.projectService.getProjectList();
    this.getAddedSubscription = this.projectService.getChangedForm().subscribe((changedForm) => {
      this.isAdded = changedForm
    });
  }

  onCreate(){
     this.projectService.toggleProjectCreate();
     this.projectID = null;
  }

  onUpdate(index: number) {
    this.projectService.toggleProjectCreate();
    this.projectID = index;
  }

  onDelete(index: number) {
    this.projectService.deleteProject(index);
  }

}
