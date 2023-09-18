import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollaborateursListComponent } from './components/collaborateurs-list/collaborateurs-list.component';
import { CollaborateurDetailsComponent } from './components/collaborateur-details/collaborateur-details.component';
import { AddCollaborateurComponent } from './components/add-collaborateur/add-collaborateur.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { JenkinsListComponent } from './components/jenkins-list/jenkins-list.component';
import { CreateJobFormComponent } from './components/create-job-form/create-job-form.component';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';




const routes: Routes = [
  { path: 'collaborateurs', component: CollaborateursListComponent },
  { path: 'collaborateurs/:id', component: CollaborateurDetailsComponent },
  { path: 'add', component: AddCollaborateurComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/:id', component: ProjectDetailsComponent },
  { path: 'add_Project', component: AddProjectComponent },
  { path: 'jenkins_list', component: JenkinsListComponent },
  { path: 'create-job', component: CreateJobFormComponent },
  { path: 'delete-confirmation', component: DeleteConfirmationDialogComponent },
  { path: '', redirectTo: 'collaborateurs', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
