import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../componentes/container/container.component';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { Contato } from '../../componentes/contato/contato';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';

@Component({
  selector: 'app-perfil-contato',
  standalone: true,
  imports: [
    ContainerComponent,
    SeparadorComponent,
    CabecalhoComponent,
    RouterLink,
  ],
  templateUrl: './perfil-contato.component.html',
  styleUrl: './perfil-contato.component.css',
})
export class PerfilContatoComponent implements OnInit {
  contato: Contato = {
    id: 0,
    nome: 'dev',
    avatar: '',
    telefone: '1234567',
    email: 'dev@email.com',
    aniversario: '12/10/1990',
    redes: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private contatoService: ContatoService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); //pega o id da url, se houver
    this.contatoService.buscarPorId(parseInt(id!)).subscribe((contato) => {
      //chama o metodo de bucarPorId e passa como parametro id
      this.contato = contato; //depois do backend pegar os dados de contato armazena na propriedade local
    });
  }

  excluir() {
    return this.contatoService.excluirContato(this.contato.id).subscribe(() => {
      //chame o metodo excluirContato e passa como parametro o id do contato
      this.router.navigateByUrl('/lista-contatos'); //quando o metodo retornar uma resposta manda o usuario de volta para a pagina principal
    });
  }
}
