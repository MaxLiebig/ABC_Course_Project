import { Project } from "../models/project.model";
import { Subject, Observable } from "rxjs";
import { EventEmitter, Output } from "@angular/core";

export class ProjectService {
    private subject = new Subject<number>();
    isAdded = false;
    projects: Project[] = [
        new Project('K-123123', 'new test project'),
        new Project('K-123456', 'another test project')
    ];

    addProject(project: Project) {
        this.projects.push(project);
    }

    getProjectList() {
        return this.projects;
    }
    
    deleteProject(id: number) {
        this.projects.splice(id, 1);
    }

    updateProject(id: number, project: Project) {
        this.projects[id] = project;
    }

    toggleProjectCreate() {
      this.isAdded = !this.isAdded;
    }
}