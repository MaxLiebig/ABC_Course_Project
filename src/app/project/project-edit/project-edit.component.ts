import { Component, OnInit, ViewChild, Input, AfterContentInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit{
  @ViewChild('f') projectForm: NgForm;
  @Input('id') projectID: number;
  @Input('project') project: Project;
  isUpdated: boolean;
  subscription: Subscription;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
      this.isUpdated = this.projectID != null;
      if(this.isUpdated){
        this.project = this.projectService.projects[this.projectID];
        setTimeout(()=>{    
          this.projectForm.setValue({
            name: this.project.name,
            description: this.project.description
           });
        }, 100);
      }

  }  

  onSubmit(form) {
    this.projectService.toggleProjectCreate();
    if (!this.isUpdated){
      this.projectService.addProject(form.value);
    } else {
      this.projectService.updateProject(this.projectID, form.value);
    }
  }
}
