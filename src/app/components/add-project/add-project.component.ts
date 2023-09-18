// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Equipe } from 'src/app/models/equipe.model';
// import { Project } from 'src/app/models/project.model';
// import { EquipeService } from 'src/app/services/equipe.service';
// import { ProjectService } from 'src/app/services/project.service';

// @Component({
//   selector: 'app-add-project',
//   templateUrl: './add-project.component.html',
//   styleUrls: ['./add-project.component.css']
// })
// export class AddProjectComponent implements OnInit {
//   projectForm: FormGroup ;
//   submitted = false;
//   equipes: Equipe[] = [];

//   constructor(
//     private formBuilder: FormBuilder,
//     private projectService: ProjectService,
//     private equipeService: EquipeService
//   ) { }

//   ngOnInit(): void {
//     this.projectForm = this.formBuilder.group({
//       equipe: ['', Validators.required],
//       name: ['', Validators.required],
//       description: ['', Validators.required],
//       date_debut_project: ['', Validators.required],
//       date_fin_project: ['', Validators.required],
//     });

    
//     this.loadEquipes();
//   }


//   loadEquipes(): void {
//     this.equipeService.getEquipes().subscribe((data) => {
//       this.equipes = data;
//     });
//   }

//   saveProject(): void {
//     this.submitted = true;

//     if (this.projectForm.invalid) {
//       return;
//     }

//     const formData = this.projectForm.value;

//     const project: Project = {
//       equipe: this.equipes.find(eq=>eq.id_equipe == formData.equipe),
//       name: formData.name,
//       description: formData.description,
//       date_debut_project: formData.date_debut_project,
//       date_fin_project: formData.date_fin_project
//     };
//     console.log(this.projectForm.value);
    
//     this.projectService.create(project).subscribe(
//       (res) => {
//         console.log(res);
//         this.submitted = true;
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }

//   newproject(): void {
//     this.submitted = false;
//     this.projectForm.reset();
//   }

// }



// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Equipe } from 'src/app/models/equipe.model';
// import { Project } from 'src/app/models/project.model';
// import { EquipeService } from 'src/app/services/equipe.service';
// import { ProjectService } from 'src/app/services/project.service';
// import { GitlabService } from 'src/app/services/gitlab-service.service';
// import { GitLabProjectReq } from 'src/app/models/git-lab-project-req.model';
// import { GitLabProjectResp } from 'src/app/models/git-lab-project-resp.model';

// @Component({
//   selector: 'app-add-project',
//   templateUrl: './add-project.component.html',
//   styleUrls: ['./add-project.component.css']
// })
// export class AddProjectComponent implements OnInit {
//   projectForm: FormGroup ;
//   submitted = false;
//   equipes: Equipe[] = [];

//   constructor(
//     private formBuilder: FormBuilder,
//     private projectService: ProjectService,
//     private equipeService: EquipeService,
//     private gitlabService: GitlabService
//   ) { }

//   ngOnInit(): void {
//     this.projectForm = this.formBuilder.group({
//       equipe: ['', Validators.required],
//       name: ['', Validators.required],
//       description: ['', Validators.required],
//       date_debut_project: ['', Validators.required],
//       date_fin_project: ['', Validators.required],
//       createRepository: [false], // Ajoutez une propriété pour la case à cocher
//       path: ['', Validators.required],
//       namespace : ['', Validators.required],
//       initialize_with_readme :[false]
//     });

//     this.loadEquipes();
//   }

//   loadEquipes(): void {
//     this.equipeService.getEquipes().subscribe((data) => {
//       this.equipes = data;
//       console.log(this.equipes.values);
//     });
//   }

//   saveProject(): void {
//     this.submitted = true;
  
//     if (this.projectForm.invalid) {
//       return;
//     }
  
//     const formData = this.projectForm.value;
  
//     const project: Project = {
//       equipe: this.equipes.find(eq => eq.id_equipe == formData.equipe),
//       name: formData.name,
//       description: formData.description,
//       date_debut_project: formData.date_debut_project,
//       date_fin_project: formData.date_fin_project
//     };
//     console.log(this.projectForm.value);
  
//     this.projectService.create(project).subscribe(
//       (res) => {
//         console.log(res);
//         this.submitted = true;
  
//         if (formData.createRepository) {
//           const gitlabProjectReq: GitLabProjectReq = {
//             name: project.name,
//             description: project.description,
//             path: formData.path,
//             namespace: formData.namespace,
//             initialize_with_readme: formData.initialize_with_readme
//           };

          
//            console.log(gitlabProjectReq);
  
//           this.gitlabService.createProject(gitlabProjectReq).subscribe(
//             (gitlabResp : GitLabProjectResp) => {
//               console.log('Projet GitLab créé:', gitlabResp);
//               console.log(gitlabResp.Id);
//               console.log(gitlabResp.name);
//               console.log(gitlabResp.description);
//               // console.log(gitlabResp.webUrl);
//               // console.log(gitlabResp.ssh_url_to_repo);
//               // console.log(gitlabResp.httpUrl);
//             },
//             (error) => {
//               console.error('Erreur lors de la création du projet GitLab:', error);
//               // Gérer l'erreur si nécessaire
//             }
//           );
//         }
//       },
//       (error) => {
//         console.error('Erreur lors de la création du projet:', error);
//         // Gérer l'erreur si nécessaire
//       }
//     );
//   }
  

//   newproject(): void {
//     this.submitted = false;
//     this.projectForm.reset();
//   }
// }



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Equipe } from 'src/app/models/equipe.model';
import { Project } from 'src/app/models/project.model';
import { EquipeService } from 'src/app/services/equipe.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  projectForm: FormGroup;
  submitted = false;
  equipes: Equipe[] = [];
  projectNameExists = false; // Nouvelle propriété pour indiquer si le nom du projet existe déjà

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private equipeService: EquipeService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      equipe: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      date_debut_project: ['', Validators.required],
      date_fin_project: ['', Validators.required],
      createRepository: [false],
      path: ['', Validators.required],
      namespace: ['', Validators.required],
      initialize_with_readme: [false],
    });

    this.loadEquipes();

    // Vérifier l'existence du nom de projet lors de la saisie
    this.projectForm.get('name').valueChanges.subscribe((name) => {
      this.checkProjectName(name);
    });
  }

  loadEquipes(): void {
    this.equipeService.getEquipes().subscribe((data) => {
      this.equipes = data;
    });
  }

  checkProjectName(name: string): void {
    if (!name) {
      this.projectNameExists = false;
      return;
    }

    this.projectService.checkProjectNameExists(name).subscribe((exists) => {
      this.projectNameExists = exists;
    });
  }

  saveProject(): void {
    this.submitted = true;

    if (this.projectForm.invalid || this.projectNameExists) {
      return;
    }

    const formData = this.projectForm.value;

    const project: Project = {
      equipe: this.equipes.find((eq) => eq.id_equipe == formData.equipe),
      name: formData.name,
      description: formData.description,
      date_debut_project: formData.date_debut_project,
      date_fin_project: formData.date_fin_project,
    };

    this.projectService.create(project).subscribe(
      (res) => {
        console.log(res);
        this.submitted = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  newProject(): void {
    this.submitted = false;
    this.projectForm.reset();
    this.projectNameExists = false; // Réinitialiser la vérification du nom du projet
  }
}
