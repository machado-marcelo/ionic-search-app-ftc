import { MovieService, SearchType } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular'
import { reduce } from 'rxjs/operators';
 
@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  
 
  results: Observable<any>;
  searchTerm: string = '';
  type: SearchType = SearchType.all;
  yearRelease: string = '';



  /**
   * Constructor of our first page
   * @param movieService The movie Service to get data
   */

  constructor(private movieService: MovieService, public atrCtrl: AlertController) { }

 
  ngOnInit() { }
 
  searchChanged() {
    // Call our service function which returns an Observable
    this.results = this.movieService.searchData(this.searchTerm, this.type, this.yearRelease );
  }

  async removeYear(){
    
    this.yearRelease = ""
    this.searchChanged();
  }

  async openFilters() {

    const alert = await this.atrCtrl.create({

      subHeader: 'Filtros Adicionais',
      backdropDismiss: false,
      inputs: [
        {
          name: 'releaseYear',
          cssClass: 'alert-style',
          type: 'number',
          placeholder: 'ano de lançamento',
          value: this.yearRelease,
          min: 1800,
          max: 2020
        }      
      ],
      buttons: [
        {
          text: 'Filtrar',
          cssClass: 'alert-style',
          role: 'cancel'         
        }
      ],

     
    });

    await alert.present()
  
    
    await alert.onDidDismiss()
    .then((data) => {

      console.log(data)

      this.yearRelease = data['data'].values.releaseYear
      this.searchChanged();
      
    });





  
  }
}