
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Collaborateur } from 'src/app/models/collaborateur.model';
import { Equipe } from 'src/app/models/equipe.model';
import { ProfilCollab } from 'src/app/models/profil-collab.model';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { EquipeService } from 'src/app/services/equipe.service';
import { ProfilCollabService } from 'src/app/services/profil-collab.service';

@Component({
  selector: 'app-add-collaborateur',
  templateUrl: './add-collaborateur.component.html',
  styleUrls: ['./add-collaborateur.component.css']
})
export class AddCollaborateurComponent implements OnInit {
  collaborateurForm: FormGroup;
  submitted = false;
  profilsCollab: ProfilCollab[] = [];
  equipes: Equipe[] = [];
  emailExists = false;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private collaborateurService: CollaborateurService,
    private profilCollabService: ProfilCollabService,
    private equipeService: EquipeService
  ) {}

  ngOnInit(): void {
    this.collaborateurForm = this.formBuilder.group({
      profilCollab: ['', Validators.required],
      equipe: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.gmailValidator()]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Appliquer la validation personnalisée à l'ensemble du formulaire
    this.collaborateurForm.setValidators(this.requiredFields);

    this.loadProfilsCollab();
    this.loadEquipes();
  }

  loadProfilsCollab(): void {
    this.profilCollabService.getProfilsCollab().subscribe((data) => {
      this.profilsCollab = data;
    });
  }

  loadEquipes(): void {
    this.equipeService.getEquipes().subscribe((data) => {
      this.equipes = data;
    });
  }

  checkEmailExistence(): void {
    const email = this.collaborateurForm.get('email').value;

    this.collaborateurService.getAllEmails().subscribe(
      (emails) => {
        // Vérifiez si l'e-mail existe déjà dans la liste des e-mails.
        this.emailExists = emails.includes(email);
      },
      (error) => {
        console.error('Erreur lors de la récupération des e-mails', error);
      }
    );
  }

  saveCollaborateur(): void {
    this.submitted = true;

    if (this.collaborateurForm.invalid || this.emailExists) {
      return;
    }

    const formData = this.collaborateurForm.value;

    const collaborateur: Collaborateur = {
      profilCollab: this.profilsCollab.find((profile) => profile.id_profil_collab == formData.profilCollab),
      equipe: this.equipes.find((eq) => eq.id_equipe == formData.equipe),
      email: formData.email,
      username: formData.username,
      password: formData.password
    };

    this.collaborateurService.create(collaborateur).subscribe(
      (res) => {
        console.log(res);
        this.submitted = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  newCollaborateur(): void {
    this.submitted = false;
    this.collaborateurForm.reset();
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  // Fonction de validation personnalisée pour vérifier que tous les champs sont remplis
  requiredFields(control: AbstractControl): { [key: string]: boolean } | null {
    const values = Object.values(control.value);

    for (const value of values) {
      if (!value) {
        return { required: true };
      }
    }

    return null;
  }

  // Fonction de validation personnalisée pour l'email Gmail
  gmailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email = control.value as string;

      if (!email.toLowerCase().endsWith('@gmail.com')) {
        return { gmail: true }; // La validation échoue si l'email ne se termine pas par "@gmail.com"
      }

      return null; // La validation réussit
    };
  }
}

