import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../componentes/container/container.component';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { Contato } from '../../componentes/contato/contato';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-perfil-contato',
  standalone: true,
  imports: [ContainerComponent, SeparadorComponent, RouterLink],
  templateUrl: './perfil-contato.component.html',
  styleUrl: './perfil-contato.component.css',
})
export class PerfilContatoComponent implements OnInit {
  contato: Contato = {
    id: 0,
    nome: 'dev',
    telefone: '1234567',
    email: 'dev@email.com',
    aniversario: '12/10/1990',
    redes: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private contatoService: ContatoService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.contatoService.buscarPorId(parseInt(id!)).subscribe((contato) => {
      this.contato = contato;
    });
  }
}
