import { ReCaptchaEnterpriseProvider } from "firebase/app-check";

export class Encuesta{
    nombre: any;
    apellido: any;
    edad: any;
    telefono: any;
    calififcacion: any;
    recomendaria: any;
    comentario: any;
    usuario: any;


    constructor(nombre: any, apellido: any, edad: any, telefono: any, calificacion: any, recomendaria: any, comentario: any, usuario: any){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.telefono = telefono;
        this.calififcacion = calificacion;
        this.recomendaria = recomendaria;
        this.comentario = comentario;
        this.usuario = usuario;
    }
}