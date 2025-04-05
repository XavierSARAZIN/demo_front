import {Component, inject} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-produit',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatOption,
    MatSelect],
  templateUrl: './edit-produit.component.html',
  styleUrl: './edit-produit.component.scss'
})
export class EditProduitComponent {

  formBuilder = inject(FormBuilder)
  http = inject(HttpClient)
  activatedRoute = inject(ActivatedRoute)
  notification=inject(MatSnackBar)

  formulaire = this.formBuilder.group({
    nom: ["Nouveau produit", [Validators.required, Validators.maxLength(40), Validators.minLength(3)]],
    code: ["xa", [Validators.required]],
    description: ["description", []],
    prix: [10, [Validators.required, Validators.min(0.1)]],
    etat: [{id:1}],
    etiquettes:[[] as Etiquette[]],
  })

  etats: Etat[] = []
  etiquettes: Etiquette[]=[]

  produitEdite: Produit | null = null
  ngOnInit() {

     this.activatedRoute.params
       .subscribe(parametres => {
         if (parametres['id']) {
           this.http
             .get<Produit>(`${environment.apiUrl}/produit/` + parametres['id'])
             .subscribe(produit => {
               console.log('Produit récupéré : ', produit); // Log du produit
               this.formulaire.patchValue(produit)
               this.produitEdite = produit
             })
         }
       })

    this.http
      .get<Etat[]>(`${environment.apiUrl}/etats`)
      .subscribe(etats => this.etats = etats)
    this.http
      .get<Etiquette[]>(`${environment.apiUrl}/etiquettes`)
      .subscribe(etiquettes => this.etiquettes = etiquettes)
}
    onAjoutProduit() {
      if (this.formulaire.valid) {
        if (this.produitEdite) {
          console.log('Produit à modifier : ', this.produitEdite); // Log du produit à modifier
          console.log('ID du produit : ', this.produitEdite.id); // Log de l'ID du produit
          this.http
            .put(`${environment.apiUrl}/produit/` + this.produitEdite.id, this.formulaire.value)
            .subscribe(resultat => {
              this.notification.open("Le produit a bien été modifié", "", {duration: 5000, verticalPosition: "top"})
            })
        } else {

          this.http
            .post(`${environment.apiUrl}/produit`, this.formulaire.value)
            .subscribe(resultat => {
              this.notification.open("Le produit a bien été ajouté", "", {duration: 5000, verticalPosition: "top"})
            })
        }
      }
    }
      compareId(o1
    :
      {
        id:number
      }
    ,
      o2: {
        id: number
      }
    )
      {
        return o1.id === o2.id
      }
    }
