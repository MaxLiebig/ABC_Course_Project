import { Project } from "../models/project.model";
import { Subject, Observable } from "rxjs";
import { EventEmitter, Output, Injectable } from "@angular/core";
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { Http } from "@angular/http";

@Injectable()
export class ProjectService{
    isAdded = false;
    projects: Project[] = [
        new Project('K-123123', 'new test project'),
        new Project('K-123456', 'another test project')
    ];
    changedForm = new Subject<boolean>();
    projectChanged = new Subject<Project[]>();

    constructor(private http: Http) {}

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
      this.changedForm.next(this.isAdded);
    }

    getChangedForm(): Observable<boolean> {
        return this.changedForm.asObservable();
    }

    getProjectsChanged(): Observable<Project[]> {
        return this.projectChanged.asObservable();
    }

    sendProjects() {
        this.postJsonProjects().subscribe(
            (response) => console.log(response),
            (error) => console.log(error));
    }

    receiveProjects() {
        this.getJsonProjects().subscribe();
    }

    getJsonProjects() {
        return this.http.get('http://localhost:3001/data/projects.json').pipe(map(response => {
            this.projects = response.json();
            console.log(this.projects);
            this.projectChanged.next(this.projects);
        }));
    }

    postJsonProjects() {
        return this.http.post('http://localhost:3001/data/projects.json', this.projects);
    }
}
