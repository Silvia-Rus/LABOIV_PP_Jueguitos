import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { CartasService } from 'src/app/servicios/cartas.service';
import { AlertService } from 'src/app/servicios/alert.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { Encuesta} from 'src/app/clases/encuesta';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {

  valorCartaNueva = -1;
  imagenCartaNueva: any;
  valorCartaVieja = -1;
  imagenCartaVieja: any;
  puntos = 0;
  logueado = this.auth.getAuth();
  usuario: any;


  constructor(private cartas: CartasService, private alerta: AlertService, 
              private auth: AuthService,
              private st: StorageService) { }

  ngOnInit() {
    this.getCarta();
    this.logueado.subscribe((res) => {
      this.usuario = res?.email;
      })
  }

  getCarta(){
    return new Promise((resolve, reject) => {
      this.cartas.getCarta().subscribe((data: any) => {
        this.guardarCarta(data.cards[0]);
        resolve(data);
        //console.log("getCarta: "+data.cards[0].value);
      });
    });
  }

  guardarCarta(carta: any){ // aquí viene data.cards[0].
    this.darValorACarta(carta.value);
    this.imagenCartaNueva = carta.image;
  }

  darValorACarta(textoCarta: any){
    switch (textoCarta) //aquí viene el data.cards[0].value
    {
      case 'JACK':
        this.valorCartaNueva = 11; 
        break;
      case 'QUEEN':
        this.valorCartaNueva = 12;
        break;
      case 'KING':
        this.valorCartaNueva = 13;
        break;
      default:
        this.valorCartaNueva = parseInt(textoCarta);
    }
  }

  esMayorOMenor(valorCartaNueva: number, valorCartaVieja: number)
  {
    let retorno = '';
    valorCartaNueva > valorCartaVieja ? retorno = 'mayor' : retorno = 'menor';
    return retorno;
  }

  elegirOpcion(opcion: String)
  {
    this.valorCartaVieja = this.valorCartaNueva;
    this.imagenCartaVieja = this.imagenCartaNueva;
    this.getCarta().then(() => {
        let mayorOMenor = this.esMayorOMenor(this.valorCartaNueva, this.valorCartaVieja);
        mayorOMenor == opcion ? this.gana() : this.pierde();
        console.log(mayorOMenor == opcion);
      }
    )
  }

  gana(){
    this.puntos++;
    this.alerta.lanzarAlertaExito("¡Acertaste! Sumás un punto más.");
  }

  pierde(){
    this.alerta.lanzarAlertaComun("Perdiste la partida. Tus puntos fueron: "+this.puntos+".");
    this.st.addPuntos(this.puntos, 'Mayor o Menor', this.usuario);
    this.imagenCartaVieja = '';
    this.puntos = 0;
  }

  mostrarCartaVieja()
  {
    return this.imagenCartaVieja ? this.imagenCartaVieja: "../assets/carta.png";
  }
}
