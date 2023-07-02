import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  constructor(private http: HttpClient) { }

  getPregunta(){
    return  this.http.get("https://api.artic.edu/api/v1/artworks?limit=50&fields=title,artist_title,date_display,image_id");

    // https://api.artic.edu/api/v1/artworks?fields=id,title,artist_title,date_display,main_reference_number


    //https://api.artic.edu/api/v1/artworks/search?q=cats

    // return this.http.get("https://api.artic.edu/api/v1/artworks"); //LA QUE VA CREO

    // https://api.artic.edu/api/v1/artworks/search?limit=30


 
    //https://api.artic.edu/api/v1/artworks?page=2&limit=20
    // https://www.artic.edu/iiif/2/94bfb508-31cc-7c9f-63a9-5478c826129a/full/843,/0/default.jpg

    return this.http.get("https://maps.googleapis.com/maps/api/place/photo?maxwidth=400")
    // return this.http.get("https://opentdb.com/api.php?amount=3&difficulty=medium&type=boolean")
  }

}
