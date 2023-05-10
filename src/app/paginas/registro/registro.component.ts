import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nuevoUsuario: FormGroup;

  constructor(private db: AuthService, 
              private readonly fb: FormBuilder) {
                this.nuevoUsuario = this.fb.group({ 
                  nombre:['', Validators.required],
                  mail:['', Validators.required],
                  contrasena:['', Validators.required],
                  })
               }

  ngOnInit() {
  }

  crearUsuario(){
    const nombre = this.nuevoUsuario.value.nombre;
    const mail = this.nuevoUsuario.value.mail;
    const contrasena = this.nuevoUsuario.value.contrasena; 
    this.db.registro(nombre, mail, contrasena);
  }
}
