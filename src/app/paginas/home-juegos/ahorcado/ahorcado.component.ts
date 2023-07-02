import { Component, OnInit } from '@angular/core';
import { PalabrasService } from 'src/app/servicios/palabras.service'
import { AlertService } from 'src/app/servicios/alert.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  constructor(private servicio: PalabrasService, 
              private alerta: AlertService,
              private auth: AuthService,
              private st: StorageService) { }

  dato: any;
  palabra = '';
  palabraAux = '';
  letra = '';
  letrasUsada: any[] = [];
  arrayPalabra: any;
  arrayPalabraAux: any;
  intentos = 0;
  intentosRestantes = 6;
  usuario: any;
  logueado = this.auth.getAuth();
  srcAhorcado = "../assets/ahorcado/Paso_"+this.intentos+".png";
  puntos = -1;

  ngOnInit() {
    this.nuevaPalabra();
    this.logueado.subscribe((res) => {
      this.usuario = res?.email;
      })
  }

  reset()
  {    
    this.palabra = '';
    this.palabraAux = '';
    this.letra = '';
    this.letrasUsada = [];
    this.intentos = 0;
    this.intentosRestantes = 6;
    this.setImage(this.intentos);
    this.nuevaPalabra();
    this.puntos = -1;
  }

  validadorLetra()
  {

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
    if(this.letrasUsada.includes(letra)){
      this.alerta.lanzarAlertaError('Esta letra ya ha sido usada');
    }else{
      this.letra = letra;
      this.letrasUsada.push(this.letra);
      if(!this.ganoOPerdio())
      {
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
    if(this.intentosRestantes == 0){

      retorno = true;
      this.st.addPuntos(this.intentosRestantes + 1, 'Ahorcado', this.usuario);

    }else{
      retorno = false;

    }
    return retorno;
  }

  gano()
  {
    const arrayPalabraAux = this.palabraAux.split('');
    let retorno: boolean;
    if(arrayPalabraAux.includes('_'))
    {
      retorno = false;
      this.st.addPuntos(this.intentosRestantes + 1, 'Ahorcado', this.usuario);

    }else{
      retorno = true;
    }
    return retorno;
  }
}
