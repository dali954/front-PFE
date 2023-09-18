// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { JobResp } from '../models/job-resp.model'; // Assurez-vous d'importer le modèle correct

// const baseUrl = 'http://localhost:8082/api/jenkins'; // Remplacez par l'URL correcte de votre API Jenkins

// @Injectable({
//   providedIn: 'root'
// })
// export class JenkinsService {

//   constructor(private http: HttpClient) {}

//   getAllJobs(): Observable<JobResp[]> {
//     const url = `${baseUrl}/getAllJobs`;
//     const headers = new HttpHeaders({
//       'Authorization': 'Basic ' + btoa('dali:11f30d03fc8cd7edab386b57aadadcc9d9') // Remplacez avec vos informations d'authentification
//     });

//     return this.http.get<JobResp[]>(url, { headers })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   createJob(jobReq: any): Observable<JobResp> {
//     const url = `${baseUrl}/createJob`;
//     const headers = new HttpHeaders().set('Content-Type', 'application/json');
//     const body = JSON.stringify(jobReq);
    
//     return this.http.post<JobResp>(url, body, { headers })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   deleteJob(jobName: string): Observable<any> {
//     const url = `${baseUrl}/deleteJob/${jobName}`; // Assurez-vous que votre API a un point de terminaison pour la suppression
//     const headers = new HttpHeaders({
//       'Authorization': 'Basic ' + btoa('dali:114972d9b602f3ca86a178349a07af7db8') // Remplacez avec vos informations d'authentification
//     });

//     return this.http.post(url, null, { headers })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   // Ajoutez d'autres méthodes pour les autres fonctionnalités de l'API Jenkins si nécessaire

//   private handleError(error: any) {
//     console.error('Erreur dans le service Jenkins : ', error);
//     return throwError(error);
//   }

  
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { JobResp } from '../models/job-resp.model';

const baseUrl = 'http://localhost:8082/api/jenkins';

@Injectable({
  providedIn: 'root'
})
export class JenkinsService {

  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<JobResp[]> {
    const url = `${baseUrl}/getAllJobs`;
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('dali:11f30d03fc8cd7edab386b57aadadcc9d9')
    });

    return this.http.get<JobResp[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  createJob(jobReq: any): Observable<JobResp> {
    const url = `${baseUrl}/createJob`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(jobReq);

    return this.getAllJobs().pipe(
      catchError(this.handleError),
      mergeMap((jobs: JobResp[]) => {
        const jobNames = jobs.map(job => job.name);
        if (jobNames.includes(jobReq.jobName)) {
          return throwError("Le nom de l'emploi existe déjà.");
        } else {
          return this.http.post<JobResp>(url, body, { headers }).pipe(
            catchError(this.handleError)
          );
        }
      })
    );
  }

  deleteJob(jobName: string): Observable<any> {
    const url = `${baseUrl}/deleteJob/${jobName}`;
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('dali:114972d9b602f3ca86a178349a07af7db8')
    });

    return this.http.post(url, null, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Erreur dans le service Jenkins : ', error);
    return throwError(error);
  }
}

