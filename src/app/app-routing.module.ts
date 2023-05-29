import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './paginas/login/login.component';
import { QuienSoyComponent } from './paginas/quien-soy/quien-soy.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { HomeJuegosComponent } from './paginas/home-juegos/home-juegos.component';
import { AhorcadoComponent } from './paginas/home-juegos/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './paginas/home-juegos/mayor-menor/mayor-menor.component';
import { ChatComponent } from './paginas/chat/chat.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'quien-soy', component: QuienSoyComponent },
  { path: 'registro', component: RegistroComponent },
  // { path: 'home-juegos', component: HomeJuegosComponent, children: 
  //   [
  //     { path: 'ahorcado', component: AhorcadoComponent },
  //   ]
  // },
  { path: 'home-juegos', component: HomeJuegosComponent },
  { path: 'ahorcado', component: AhorcadoComponent },
  { path: 'mayor-menor', component: MayorMenorComponent },
  { path: 'chat', component: ChatComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
