import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GitLabProjectReq } from '../models/git-lab-project-req.model';
import { GitLabProjectResp } from '../models/git-lab-project-resp.model';

const baseUrl = 'http://localhost:8082/api/gitlab';

@Injectable({
  providedIn: 'root'
})
export class GitlabService {

  constructor(private http: HttpClient) {}

  createProject(projectReq: GitLabProjectReq): Observable<any> {
    const url = `${baseUrl}/projects`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(projectReq);
    return this.http.post(url, body, { headers});
  }

  createUser(email: string, password: string, username: string, name: string) {
    const url = `${baseUrl}/users`;
    const data = {
      email,
      password,
      username,
      name
    };
    return this.http.post(url, data);
  }

  // Ajoutez d'autres méthodes pour les autres fonctionnalités de l'API GitLab si nécessaire

  // createProject( projectReq ){
  //   const url = `${baseUrl}/projects`;
  //   const body = JSON.stringify({projectReq});
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.post(url, body, { headers });
  //    }
}
