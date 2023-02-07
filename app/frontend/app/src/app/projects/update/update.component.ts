import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProjectService } from '../models/project/project.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  projectForm: FormGroup;
  submitted = false;
  errors : any = []
  // projectId: 

  constructor(
    public project_model: ProjectService,
    public fb: FormBuilder,
    private _messageService: MessageService,
    private route: ActivatedRoute,
    private router:Router,
  ){
    this.projectForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      this.getProject(id);
    });    
  }
  // submit(){
  //   this.project_model.createProject(this.projectForm.value).subscribe({
  //     next: response => {
  //           console.log('POST RESPONSE: ', response);
  //           this._messageService.add({
  //               severity: 'success',
  //               summary: 'Успешно!',
  //               detail: 'Проект добавлен',
  //               life: 5000
  //           });
  //       },
  //     error: err => this.errors.push(err)
  //   })

  //   this.submitted = true;
  // }

  // newProject(): void {
  //   this.submitted = false;
  //   this.projectForm.reset();
  // }

  getProject(id: number) {
    this.project_model.getProject(id.toString()).subscribe((data) => {
      this.projectForm = data;
    });
  }
 
  // updateProject() {
  //   this.project_model.updateProject(this.fruitForm)
  //   .subscribe({
  //     next:(data) => {
  //       this.router.navigate(["/fruits/home"]);
  //     },
  //     error:(err) => {
  //       console.log(err);
  //     }
  //   })
  // }

}
