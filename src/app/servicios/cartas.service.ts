import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CartasService {

  constructor(private http: HttpClient) { }

  getCarta() { 
    return this.http.get("https://www.deckofcardsapi.com/api/deck/new/draw/?count=1");
  } 

}
