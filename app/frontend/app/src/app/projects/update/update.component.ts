import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProjectService } from '../models/project/project.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  loading = true;
  form: FormGroup;
  submitted = false;
  errors : any = [];
  projectId: number;

  constructor(
    public project_model: ProjectService,
    public fb: FormBuilder,
    private _messageService: MessageService,
    private route: ActivatedRoute,
    private router:Router,
  ){
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.projectId = this.route.snapshot.params['id'];
    // console.log(this.projectId.toString())
  }

  ngOnInit(): void {
    this.getProject(this.projectId);

    // this.route.paramMap.subscribe((param) => {
    //   this.projectId = Number(param.get('id'));
    //   // console.log(this.projectId);
    //   this.getProject(this.projectId);
    // });    
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
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
    this.project_model.getProject(id.toString()).subscribe({
      next: (data) => {
        // this.projectForm = data;
        this.form.patchValue(data)
        this.loading = false;
        // console.log(data)
      // console.log(this.form)
      },
      error: (err) => {
        console.log('[updateProject] catched error: ', err)
        this.router.navigate(['/404'])
        console.log('[updateProject] redirecting to 404')
      }
    });
  }
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    // if (this.isAddMode) {
    //     this.createUser();
    // } else {
    this.updateProject();
    // }
  }

  updateProject() {
    this.project_model.updateProject(this.projectId.toString(), this.form.value)
    .subscribe({
      next:(data) => {
        // this.router.navigate(["/fruits/home"]);
        // this.alertService.success('User added', { keepAfterRouteChange: true });
        this._messageService.add({
            severity: 'success',
            summary: 'Успешно!',
            detail: `Проект "${this.f['title'].value}" обновлен.`,
            life: 5000
        });
        console.log('Project updated')
        this.router.navigate(['../../'], { relativeTo: this.route });
      },
      error:(err) => {
        console.log(err);
      }
    })
    .add(() => this.loading = false);
  }

}
