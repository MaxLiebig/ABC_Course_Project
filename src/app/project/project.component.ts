import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Project } from '../models/project.model';
import { ProjectService } from '../service/project.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  projectID: number;
  isAdded = this.projectService.isAdded;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projects = this.projectService.projects;

  }

  onCreate(){
     this.projectService.toggleProjectCreate();
     this.isAdded = this.projectService.isAdded;
     this.projectID = null;
  }

  onUpdate(index: number) {
    this.projectService.toggleProjectCreate();
    this.isAdded = this.projectService.isAdded;
    this.projectID = index;
  }

  onDelete(index: number) {
    this.projectService.deleteProject(index);
  }

}
