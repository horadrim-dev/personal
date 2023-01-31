import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { HttpClient } from '@angular/common/http'


import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { MatDividerModule } from '@angular/material/divider';
// import { ProjectsService } from './models/project/projects.service';
import { ProjectService } from './models/project/project.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreateComponent } from './create/create.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ProjectsComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,


  ],
  providers: [ProjectService]
})
export class ProjectsModule { }
