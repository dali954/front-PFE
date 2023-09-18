import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCollaborateurComponent } from './components/add-collaborateur/add-collaborateur.component';
import { CollaborateurDetailsComponent } from './components/collaborateur-details/collaborateur-details.component';
import { CollaborateursListComponent } from './components/collaborateurs-list/collaborateurs-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { GitlabProjectInterceptor } from './interceptors/gitlab-project.interceptor';
import { JenkinsListComponent } from './components/jenkins-list/jenkins-list.component';
import { CreateJobFormComponent } from './components/create-job-form/create-job-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    AddCollaborateurComponent,
    CollaborateurDetailsComponent,
    CollaborateursListComponent,
    AddProjectComponent,
    ProjectDetailsComponent,
    ProjectListComponent,
    JenkinsListComponent,
    CreateJobFormComponent,
    DeleteConfirmationDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      multi:true,
      useClass: GitlabProjectInterceptor
    }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
