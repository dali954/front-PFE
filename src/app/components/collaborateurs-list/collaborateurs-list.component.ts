import { Component, OnInit } from '@angular/core';
import { Collaborateur } from 'src/app/models/collaborateur.model';
import { CollaborateurService } from 'src/app/services/collaborateur.service';

@Component({
  selector: 'app-collaborateurs-list',
  templateUrl: './collaborateurs-list.component.html',
  styleUrls: ['./collaborateurs-list.component.css']
})
export class CollaborateursListComponent implements OnInit {

  collaborateurs?: Collaborateur[];
  currentCollaborateur: Collaborateur = {};
  currentIndex = -1;
  username = '';

  constructor(private collaborateurService: CollaborateurService) { }

  ngOnInit(): void {
    this.retrieveCollaborateurs();
  }

  retrieveCollaborateurs(): void {
    this.collaborateurService.getAll()
      .subscribe({
        next: (data) => {
          this.collaborateurs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveCollaborateurs();
    this.currentCollaborateur = {};
    this.currentIndex = -1;
  }

  setActiveCollaborateur(collaborateur: Collaborateur, index: number): void {
    this.currentCollaborateur = collaborateur;
    this.currentIndex = index;
    console.log(collaborateur.id_collab);
  }

  removeAllCollaborateurs(): void {
    this.collaborateurService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  // Fonction de recherche en temps réel
  searchUsername(): void {
    if (this.username === '') {
      // Si le champ de recherche est vide, affichez tous les collaborateurs
      this.retrieveCollaborateurs();
    } else {
      // Sinon, filtrez les collaborateurs dont le nom d'utilisateur commence par la valeur de recherche
      this.collaborateurs = this.collaborateurs.filter(collaborateur =>
        collaborateur.username.toLowerCase().startsWith(this.username.toLowerCase())
      );
    }
  }
}
