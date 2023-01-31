import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { catchError, finalize } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { Project } from './models/project/project.model';
import { ProjectService } from './models/project/project.service';

// import { RepositoryService } from '../shared/services/repository.service';
// import { ProjectsService } from './models/project/projects.service';
// import { DataSource } from './models/project/projects.service';
// import { ProjectModel } from './models/project/repository.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: []
})
export class ProjectsComponent implements OnInit {
  // project_model: ProjectModel = new ProjectModel;

  // project_form: Project = {
  //   title: '',
  //   description: '',
  //   // published: false
  // };
  projects: Project[] = [] ;
  completedProjectsTabLoaded = false;
  activeProjectsTabLoaded = false;

  completedProjectsErrors : Error[] = [];
  isAdmin : Boolean = false;

  constructor(
    private _authService: AuthService,
    public project_model: ProjectService, 
    private messageService: MessageService,
  ){
    if (_authService.currentUser != null) this.isAdmin = true;
    console.log(this.isAdmin, _authService.currentUser)
  }

  ngOnInit() {
    this.project_model.getProjects()
      .subscribe({
        next: (data) => {this.projects = data;},
        complete: () => {this.completedProjectsTabLoaded=true},
        error: err => {
          this.completedProjectsTabLoaded = true;
          console.log('ERROR IN COMPONENT:', err);
          console.log(this.completedProjectsTabLoaded);
          this.completedProjectsErrors.push(err);
          this.messageService.add({
            severity: 'error', life: 10000, summary: "Сервер недоступен",
            detail: "Не удалось загрузить список проектов."
          })
        }
      });
  }

  showSuccess() {
        this.messageService.add({
            severity: 'success',
            summary: 'Отлично!',
            detail: 'Все заебись, просто охуенчик',
            life: 100000
        });
    }

  getProjects(){
    // console.log(this.project_model.getProjects())
    // this.completedProjectsTabLoaded = true;
    return this.projects
  }
  // saveProject(): void {
  //   // const data = {
  //   //   title: this.project_form.title,
  //   //   description: this.project_form.description
  //   // };

  //   this.project_model.createProject(data);
  //   this.project_form_submitted = true;
  //     // .subscribe({
  //     //   next: (res) => {
  //     //     console.log(res);
  //     //     this.project_form_submitted = true;
  //     //   },
  //     //   error: (e) => console.error(e)
  //     // });
  // }
  tabLoadTimes: Date[] = [];

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }
}
