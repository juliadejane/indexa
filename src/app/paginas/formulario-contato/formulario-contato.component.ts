import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../componentes/container/container.component';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { MensagemErroComponent } from '../../componentes/mensagem-erro/mensagem-erro.component';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';

@Component({
  selector: 'app-formulario-contato',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    SeparadorComponent,
    ReactiveFormsModule,
    CabecalhoComponent,
    MensagemErroComponent,
  ],
  templateUrl: './formulario-contato.component.html',
  styleUrl: './formulario-contato.component.css',
})
export class FormularioContatoComponent implements OnInit {
  contatoForm!: FormGroup;

  constructor(
    private contatoService: ContatoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.inicializarFormulario();
    this.carregarContato();
  }

  carregarContato() {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); //pega o id da url, se houver
    this.contatoService.buscarPorId(parseInt(id!)).subscribe((contato) => {
      //usa o servico contatoService para buscar o contato no backend
      this.contatoForm.patchValue(contato); //quando ele encontra o contato ele preenche os dados dentro do formulario contatoForm usando o metodo patchValue
    });
  }

  inicializarFormulario() {
    this.contatoForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      avatar: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      aniversario: new FormControl(''),
      redes: new FormControl(''),
      observacoes: new FormControl(''),
    });
  }

  enviarContato() {
    if (this.contatoForm.valid) {
      //verifica se o formulário está válido
      const novoContato = this.contatoForm.value; //cria o objeto novoContato com os dados preenchidos
      const id = this.activatedRoute.snapshot.paramMap.get('id'); //verifica se tem um id na url
      novoContato.id = id ? parseInt(id) : null; //se sim ele mantem o id no objeto para o backend, se nao ele declara o id como nulo para o backend

      this.contatoService.editarOuSalvarContato(novoContato).subscribe(() => {
        //chama o metodo editarOuSalvarContato passando novoContato como parametro
        this.contatoForm.reset(); //depois de editar/salvar o contato ele limpa o formulario
        this.router.navigateByUrl('/lista-contatos'); //redireciona o usuario para a página inicial
      });
    }
  }

  aoSelecionarArquivo(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.lerArquivo(file);
    }
  }

  lerArquivo(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.contatoForm.get('avatar')?.setValue(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  obterControle(nome: string): FormControl {
    const control = this.contatoForm.get(nome);
    if (!control) {
      throw new Error('Controle de formulário não encontrado: ' + nome);
    }
    return control as FormControl;
  }

  cancelar() {
    this.contatoForm.reset; //reseta o formulario
    this.router.navigateByUrl('/lista-contatos'); //manda o usuario para a pagina inicial
  }
}
