import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  constructor(private http: HttpClient) { }

  getPregunta(){
    return  this.http.get("https://api.artic.edu/api/v1/artworks?limit=100&fields=title,artist_title,date_display,image_id");
  }

}
