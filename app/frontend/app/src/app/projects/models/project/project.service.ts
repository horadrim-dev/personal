import { Project } from "./project.model";
import { Injectable } from "@angular/core";
import { ApiService } from "src/app/shared/services/api.service";
import { Observable } from "rxjs";

@Injectable()
export class ProjectService {
    // private datasource: ProjectsService;
    // private projects: Project[];
    private locator = (p:Project, id:number) => p.id == id;

    constructor(
        // private datasource: ProjectsService
        // private repo: ProjectRepository
        private api: ApiService,
    ){
        // this.datasource = new ProjectsService;
        // this.projects = new Array<Project>();
        // this.datasource.getData().forEach(p => this.projects.push(p));
        // this.api.get<Project[]>('projects').subscribe({
        //     next: data => this.projects = data,
        // });
    }
    createProject(data: any) {
        return this.api.post<Project>('projects', data).subscribe(response => {
            console.log('POST RESPONSE: ', response);
        });
        // this.projects.push(data);
    }
    getProjects() : Observable<Project[]> {
        // this.api.get<Project[]>('projects').subscribe({
        //     next: data => this.projects = data,
        // });
        return this.api.get<Project[]>('projects');
    }
    // getProject(id: number) : Project | null {
    //     `Возвращает объект или null если объект не найден`
    //     let project = this.projects.find(p => this.locator(p, id))
    //     return project !== undefined ? project : null;
    //     // return this.projects.find(p => p.id === id) !==;
    // }
    // saveProject(project: Project) {
    //     if (project.id == 0 || project.id == null) {
    //         project.id = this.generateID();
    //         this.projects.push(project);
    //     } else {
    //         let index = this.projects
    //             .findIndex(p => this.locator(p, project.id));
    //         this.projects.splice(index, 1, project);
    //     }
    // }
    // deleteProject(id: number) {
    //     let index = this.projects.findIndex(p => this.locator(p, id));
    //     if (index > -1) {
    //         this.projects.splice(index, 1);
    //     }
    // }
    // private generateID(): number {
    //     let candidate = 1;
    //     while (this.getProject(candidate) != null) {
    //         candidate++;
    //     }
    //     return candidate;
    // }
}
