import { Project } from "../models/project.model";
import { Subject, Observable } from "rxjs";
import { EventEmitter, Output } from "@angular/core";
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

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

    getProjectByName(name: string){
        let ret = null;
        for(let project of this.projects){
            if(project['name'] && project.name === name){
                ret = project;
                break;
            }
        }
        return ret;
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