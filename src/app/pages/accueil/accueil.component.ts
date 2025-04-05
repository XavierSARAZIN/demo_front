import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {environment} from '../../../environments/environment';
import {RouterLink} from '@angular/router';
import {NgStyle} from '@angular/common';


@Component({
  selector: 'app-accueil',
  imports: [
    MatButtonModule,
    MatCardContent,
    MatCardSubtitle,
    MatCardActions,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCardImage,
    RouterLink,
    NgStyle
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {
  http = inject(HttpClient)
  produits: Produit[] = []

  ngOnInit() {
    this.http.get<Produit[]>(`${environment.apiUrl}/produits`)
      .subscribe(produits => this.produits = produits)
  }
}
