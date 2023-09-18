import { Component, Input, OnInit } from '@angular/core';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Collaborateur } from 'src/app/models/collaborateur.model';
import { ProfilCollab } from 'src/app/models/profil-collab.model';
import { Equipe } from 'src/app/models/equipe.model';
import { ProfilCollabService } from 'src/app/services/profil-collab.service';
import { EquipeService } from 'src/app/services/equipe.service';

@Component({
  selector: 'app-collaborateur-details',
  templateUrl: './collaborateur-details.component.html',
  styleUrls: ['./collaborateur-details.component.css']
})
export class CollaborateurDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentCollaborateur: Collaborateur = {
    profilCollab: new ProfilCollab(),
    equipe: new Equipe(),
    email: '',
    username: '',
    password: ''
  };

  profilCollabs: ProfilCollab[] = [];
  equipes: Equipe[] = [];
  message = '';
  emailExists = false; // Ajout de la variable pour vérifier si l'e-mail existe

  constructor(
    private collaborateurService: CollaborateurService,
    private profilCollabService: ProfilCollabService,
    private equipeService: EquipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getCollaborateur(this.route.snapshot.params["id"]);
      this.getProfilCollabs();
      this.getEquipes();
    }
  }

  getCollaborateur(id_collab: string): void {
    this.collaborateurService.get(id_collab)
      .subscribe({
        next: (data) => {
          this.currentCollaborateur = data;
          this.emailExists = false; // Initialisez emailExists à false ici
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  

  getProfilCollabs(): void {
    this.profilCollabService.getProfilsCollab()
      .subscribe({
        next: (data) => {
          this.profilCollabs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  getEquipes(): void {
    this.equipeService.getEquipes()
      .subscribe({
        next: (data) => {
          this.equipes = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  // Fonction pour vérifier si l'e-mail existe
  checkEmailExistence(email: string): void {
    console.log('Check email existence:', email);
    if (email !== this.currentCollaborateur.email) {
      // Vérifiez uniquement si l'e-mail a changé
      this.collaborateurService.getAllEmails().subscribe(
        (emails) => {
          this.emailExists = emails.includes(email);
        },
        (error) => {
          console.error('Erreur lors de la récupération des e-mails', error);
        }
      );
    } else {
      // Réinitialisez la variable si l'e-mail est le même
      this.emailExists = false;
    }
  }

  updateCollaborateur(): void {
    this.message = '';

    if (this.emailExists) {
      this.message = 'L\'adresse e-mail existe déjà.';
      return; // Ne pas mettre à jour si l'e-mail existe déjà
    }

    this.collaborateurService.update(this.currentCollaborateur.id_collab, this.currentCollaborateur)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'Le collaborateur a été mis à jour avec succès!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteCollaborateur(): void {
    this.collaborateurService.delete(this.currentCollaborateur.id_collab)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/collaborateurs']);
        },
        error: (e) => console.error(e)
      });
  }
}
