import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/servicios/storage.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Encuesta} from 'src/app/clases/encuesta';
import { Router } from '@angular/router';



@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  form!: FormGroup;
  encuesta: any;
  usuario: any;
  logueado = this.auth.getAuth();


  constructor(private readonly fb: FormBuilder,
              private auth: AuthService,
              private st: StorageService,
              private router: Router) { }

  ngOnInit() {

    this.logueado.subscribe((res) => {
      this.usuario = res?.email;
      })
    this.form = this.fb.group({
      nombre: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      apellido: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      edad: ['', [Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      calificacion: ['buena'],
      recomendaria: [''],
      comentario: ['', [Validators.minLength(1), Validators.maxLength(100)]],
    })
  }

  getValue(value: string): AbstractControl {
    return this.form.get(value) as FormGroup;
  }

  reset() {
    this.ngOnInit();
  }

  submit()
  {
    this.encuesta = new Encuesta(this.form.value.nombre,
                            this.form.value.apellido,
                            this.form.value.edad,
                            this.form.value.telefono,
                            this.form.value.calificacion,
                            this.form.value.recomendaria,
                            this.form.value.comentario,
                            this.usuario)
    // console.log(this.encuesta);
    this.st.addEncuesta(this.encuesta);
  }






}
