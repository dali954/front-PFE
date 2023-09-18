import { Component } from '@angular/core';
import { JenkinsService } from '../../services/jenkins.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-job-form',
    templateUrl: './create-job-form.component.html',
    styleUrls: ['./create-job-form.component.css']
})
export class CreateJobFormComponent {
    newJob: any = {};
    jobNameExists: boolean = false; // Variable pour stocker si le nom de l'emploi existe déjà

    constructor(private jenkinsService: JenkinsService, private router: Router) {}

    // Méthode pour vérifier si le nom de l'emploi existe déjà
    checkJobNameExists(jobName: string): void {
        this.jenkinsService.getAllJobs().subscribe(
            (jobs) => {
                const jobNames = jobs.map(job => job.name);
                this.jobNameExists = jobNames.includes(jobName);
            },
            (error) => {
                console.error('Erreur lors de la vérification du nom de l\'emploi :', error);
            }
        );
    }

    createJob(): void {
        // Avant de créer l'emploi, vérifiez si le nom existe déjà
        if (this.jobNameExists) {
            console.error('Le nom de l\'emploi existe déjà.');
            return;
        }

        this.jenkinsService.createJob(this.newJob).subscribe(
            () => {
                // Traitement de la réponse en cas de succès
                this.router.navigate(['/jenkins_list']); // Naviguer vers la liste des jobs après la création
            },
            (error) => {
                console.error('Erreur lors de la création de l\'emploi Jenkins :', error);
            }
        );
    }
}
