import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectService } from '../models/project/project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  projectForm: FormGroup;
  project_form_submitted = false;
  errors : any = []

  constructor(
    public project_model: ProjectService,
    public fb: FormBuilder
  ){
    this.projectForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }

  submitProjectForm(){
    // let body = {
    //     title: value.title,
    //     description: value.description
    // }
    this.project_model.createProject(this.projectForm.value).subscribe({
      next: response => {
            console.log('POST RESPONSE: ', response);
        },
      error: err => this.errors.push(err)
    })

    this.project_form_submitted = true;
  }

  newProject(): void {
    this.project_form_submitted = false;
    // this.project_form = {
    //   title: '',
    //   description: '',
    //   // published: false
    // };
    this.projectForm.reset();
  }

}
