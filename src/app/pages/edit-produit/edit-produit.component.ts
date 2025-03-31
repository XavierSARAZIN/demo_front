import {Component, inject} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatSelectModule} from '@angular/material/select';

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

  formulaire = this.formBuilder.group({
    nom: ["Nouveau produit", [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
    code: ["xa", [Validators.required]],
    description: ["description", []],
    prix: [10, [Validators.required, Validators.min(0.1)]],
    etat: [{id:1}],
    etiquettes:[[]],
  })

  etats: Etat[] = []
  etiquettes: Etiquette[]=[]
ngOnInit() {
    this.http
      .get<Etat[]>(`${environment.apiUrl}/etats`)
      .subscribe(etats => this.etats = etats)
    this.http
      .get<Etiquette[]>(`${environment.apiUrl}/etiquettes`)
      .subscribe(etiquettes => this.etiquettes = etiquettes)
}
    onAjoutProduit() {
    if (this.formulaire.valid) {
      this.http
        .post(`${environment.apiUrl}/produit`, this.formulaire.value)
        .subscribe(resultat => console.log(resultat))
    }
  }
}
