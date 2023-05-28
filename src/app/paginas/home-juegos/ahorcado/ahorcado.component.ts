import { Component, OnInit } from '@angular/core';
import { PalabrasService } from 'src/app/servicios/palabras.service'
import { AlertService } from 'src/app/servicios/alert.service';


@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  constructor(private servicio: PalabrasService, private alerta: AlertService) { }

  dato: any;
  palabra = '';
  palabraAux = '';
  letra = '';
  arrayPalabra: any;
  arrayPalabraAux: any;
  intentos = 0;
  intentosRestantes = 6;
  srcAhorcado = "../assets/ahorcado/Paso_"+this.intentos+".png";

  ngOnInit() {
    this.nuevaPalabra();
  }

  reset()
  {    
    this.palabra = '';
    this.palabraAux = '';
    this.letra = '';
    this.intentos = 0;
    this.intentosRestantes = 6;
    this.setImage(this.intentos);
    this.nuevaPalabra()
  }

  nuevaPalabra() {
    this.servicio.getPalabra().subscribe((data) => {
      this.dato = data;
      this.palabra = data.toString().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
      this.palabraAux = '_ '.repeat(this.palabra.length);
      this.arrayPalabra= this.palabra.split('');
      this.arrayPalabraAux= this.palabraAux.split('');
      console.log(this.palabra);
    });    
  }

  setImage(intento: any) {
    this.srcAhorcado = "../assets/ahorcado/Paso_"+intento+".png";
  }

  setLetra(letra: string)
  {
    this.letra = letra;
    if(!this.ganoOPerdio())
    {
      console.log("llega aquí");
      if(!this.arrayPalabra.includes(this.letra))
      {
        this.intentos += 1;
        this.intentosRestantes -= 1;
        this.setImage(this.intentos);
        if(this.perdio()){this.alerta.lanzarAlertaError("Te quedaste sin intentos. La palabra era "+this.palabra+".")}
      }
      else
      {
        this.setPalabraAux();
        if(this.gano()){this.alerta.lanzarAlertaExito("¡Ganaste! Juega de nuevo")};
      }
    }
  }
  setPalabraAux()
  {
    const arrayPalabraAux2 = this.palabraAux.split(' ');
    for(let i = 0; i<this.arrayPalabra.length ; i++)
    {    
      if(this.arrayPalabra[i] == this.letra)
      {
        arrayPalabraAux2[i] = this.letra;
      }
    }
    this.palabraAux = arrayPalabraAux2.join(' ');
  }

  ganoOPerdio()
  {
    let retorno = false;

    if(this.perdio())
    {
      this.alerta.lanzarAlertaError("Te quedaste sin intentos. Prueba de nuevo.");
      retorno = true;
    }
    if(this.gano())
    {
      this.alerta.lanzarAlertaExito("¡Ya ganaste! Juega de nuevo");
      retorno = true;
    }

    return retorno;

  }
  perdio(){
    
    let retorno: boolean;
    this.intentosRestantes == 0 ? retorno = true : retorno = false;
    return retorno;
  }

  gano()
  {
    const arrayPalabraAux = this.palabraAux.split('');
    let retorno: boolean;
    !arrayPalabraAux.includes('_') ? retorno = true : retorno = false;
    return retorno;
  }
}
