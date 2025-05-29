import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContatoComponent } from './componentes/contato/contato.component';
import { FormularioContatoComponent } from './paginas/formulario-contato/formulario-contato.component';
import { PerfilContatoComponent } from './paginas/perfil-contato/perfil-contato.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ContatoComponent,
    FormularioContatoComponent,
    PerfilContatoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
