import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProjectService } from '../models/project/project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  projectForm: FormGroup;
  submitted = false;
  errors : any = []

  constructor(
    public project_model: ProjectService,
    public fb: FormBuilder,
    private _messageService: MessageService
  ){
    this.projectForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }

  submit(){
    this.project_model.createProject(this.projectForm.value).subscribe({
      next: response => {
            console.log('POST RESPONSE: ', response);
            this._messageService.add({
                severity: 'success',
                summary: 'Успешно!',
                detail: 'Проект добавлен',
                life: 5000
            });
        },
      error: err => this.errors.push(err)
    })

    this.submitted = true;
  }

  newProject(): void {
    this.submitted = false;
    this.projectForm.reset();
  }

}
