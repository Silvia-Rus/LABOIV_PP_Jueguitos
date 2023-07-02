import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage.service';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  listaItems: any;
  listaItemsNueva: any;
  filtro: any;


  constructor(private st: StorageService) { }

  ngOnInit() {
    this.traerListaActualizada();
  }

  traerListaActualizada() {
    this.st.getCollection('puntos', 'juego').subscribe((datos) => 
                    {this.listaItemsNueva = datos; 
                    this.listaItems = this.listaItemsNueva.sort((b:any, a: any) => +a.puntos - +b.puntos);
                    // console.log(this.listaItems);
                   });
  }
  
  filtrar(juego: any){
    this.filtro = juego;
  }

}
