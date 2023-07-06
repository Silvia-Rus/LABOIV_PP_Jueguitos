import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { serverTimestamp } from 'firebase/firestore'
import { AlertService } from './alert.service';
import { Encuesta} from 'src/app/clases/encuesta';
import { Router } from '@angular/router';
import * as moment from 'moment';




@Injectable({
  providedIn: 'root'
})
export class StorageService {

  usuario: any;
  coleccion: string = 'usuarios';
  
  constructor(private db: AngularFirestore,
              private alerta: AlertService,
              private router: Router) { }

  public async addUsuario(nombre: string, mail: string) {
      this.usuario = {
      nombre: nombre,
      mail: mail,
      creado: serverTimestamp(),
      log: serverTimestamp(),
      activo: true 
    }
    this.db.collection(this.coleccion).add(this.usuario)
    .then((user)=> {
      this.alerta.lanzarAlertaExito('¡Usuario grabado con éxito!')
    }).catch((error) => {
      this.alerta.lanzarAlertaError(error);        
      });  
  }

  addEncuesta(e: Encuesta){
    var encuesta = {
      nombre: e.nombre,
      apellido: e.apellido,
      edad: e.edad,
      telefono: e.telefono,
      calificacion: e.calififcacion,
      recomendaria: e.recomendaria,
      comentario: e.comentario,
      usuario: e.usuario
    }
    this.db.collection('encuestas').add(encuesta)
    .then(()=> {
      this.alerta.lanzarAlertaExito('¡Encuesta grabada con éxito!');
      this.router.navigate(['/home']);
    }).catch((error) => {
      this.alerta.lanzarAlertaError(error);        
      }); 
  }

  addPuntos(puntos: any, juego: any, jugador: any)
  {
    var puntuacion  = {
      puntos: puntos,
      juego: juego,
      jugador: jugador,
      fecha: moment().format('DD-MM-YYYY HH:mm')
    }
    this.db.collection('puntos').add(puntuacion)
    .then(()=> {

    }).catch((error) => {
      this.alerta.lanzarAlertaError(error);        
      }); 
  }

  actualizarDato(mail: string, campo: any, nuevoDato: any)
  {
    firebase
      .firestore()
      .collection(this.coleccion)
      .where('mail', '==',mail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            campo: nuevoDato
          });
        });
      })
      .catch((error) => {
        console.log('Error grabando: ', error);
      });

  }

  getCollection(coleccion: string, ordenadaPor: string) {
    return this.db.collection(coleccion, ref => ref.orderBy(ordenadaPor, 'desc')).valueChanges();
  }

  getNombre(mail: any)
  {
    return this.db.collection(this.coleccion , ref => ref.where("mail", "==", mail)).snapshotChanges();
  }

  grabarLog(mail: string)
  {
    this.actualizarDato(mail, 'log', serverTimestamp());
  }
}
