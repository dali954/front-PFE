import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Importez le service MatDialog
import { JenkinsService } from '../../services/jenkins.service';
import { JobResp } from '../../models/job-resp.model';

// Importez le composant de la boîte de dialogue de confirmation
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-jenkins-list',
  templateUrl: './jenkins-list.component.html',
  styleUrls: ['./jenkins-list.component.css']
})
export class JenkinsListComponent implements OnInit {
  jobs: JobResp[] = [];

  constructor(
    private jenkinsService: JenkinsService,
    private router: Router,
    private dialog: MatDialog // Injectez le service MatDialog
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jenkinsService.getAllJobs().subscribe(
      (response: JobResp[]) => {
        this.jobs = response;
      },
      (error) => {
        console.error('Erreur lors du chargement des emplois Jenkins :', error);
      }
    );
  }

  launchJob(job: JobResp): void {
    // Code pour lancer le travail ici
  }

  editJob(job: JobResp): void {
    // Code pour modifier le travail ici
  }

  // Méthode pour ouvrir la boîte de dialogue de confirmation
  openDeleteConfirmationDialog(job: JobResp): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px', // Vous pouvez personnaliser la largeur et d'autres propriétés de la boîte de dialogue
      data: { jobName: job.name } // Transmettez des données à la boîte de dialogue (dans ce cas, le nom de l'emploi)
    });

    // Abonnez-vous à l'événement après la fermeture de la boîte de dialogue
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Si l'utilisateur a confirmé la suppression, appelez la méthode de suppression
        this.deleteJob(job);
      }
    });
  }

  deleteJob(job: JobResp): void {
    // Convertissez JobResp.name en une chaîne (string)
    const jobName = job.name.toString();

    // Appel de la méthode de suppression du service Jenkins en utilisant jobName
    this.jenkinsService.deleteJob(jobName).subscribe(
      () => {
        // Si la suppression réussit, rechargez la liste des emplois
        this.loadJobs();
      },
      (error) => {
        console.error("Erreur lors de la suppression de l'emploi Jenkins :", error);
      }
    );
  }

  navigateToCreateJob(): void {
    this.router.navigate(['/create-job']);
  }
}
