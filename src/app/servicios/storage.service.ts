import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { serverTimestamp } from 'firebase/firestore'
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  usuario: any;
  coleccion: string = 'usuarios';
  
  constructor(private db: AngularFirestore,
              private alerta: AlertService ) { }

  public async addUsuario(nombre: string, mail: string) {
      this.usuario = {
      nombre: nombre,
      mail: mail,
      creado: serverTimestamp(),
      log: serverTimestamp(),
      activo: true 
    }
    // return await this.db.collection('usuarios').add(this.usuario);
    this.db.collection(this.coleccion).add(this.usuario)
    .then((user)=> {
      this.alerta.lanzarAlertaExito('¡Usuario grabado con éxito!')
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

  getNombre(mail: string)
  {
    firebase
    .firestore()
    .collection(this.coleccion)
    .where('mail', '==',mail)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const nombre = doc.get("nombre");
        console.log(doc.get("nombre"));
       console.log(doc.data()["nombre"]);
       return nombre;
      });
    })
    .catch((error) => {
      console.log('Error buscando: ', error);
    });  }

  grabarLog(mail: string)
  {
    this.actualizarDato(mail, 'log', serverTimestamp());
  }
}
