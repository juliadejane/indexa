import { Injectable } from '@angular/core';
import { Contato } from '../componentes/contato/contato';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  private readonly API = 'http://localhost:3001/contatos';

  constructor(private http: HttpClient) {}

  obterContatos() {
    return this.http.get<Contato[]>(this.API); //retorna um array dop tipo contatos vindo do metodo get que recebeu como parametro o endereço da api
  }

  salvarContato(contato: Contato): Observable<Contato> {
    //recebe um contato do tipo Contato e retorna um observable do tipo Contato
    return this.http.post<Contato>(this.API, contato); //retorna o metodo post que recebe como parametro o endereço da api e o contato que foi recebido
  }

  buscarPorId(id: number): Observable<Contato> {
    //recebe um id do tipo number e retorna um observable do tipo contato
    const url = `${this.API}/${id}`; //declara url que recebe o endereço da api + o id recebido
    return this.http.get<Contato>(url); //retorna o metodo get que recebe como parametro url
  }

  excluirContato(id: number): Observable<Contato> {
    //recebe um id do tipo number e retorna um observable do tipo Contato
    const url = `${this.API}/${id}`; //declara url que recebe o endereço da apo e o id fornecido
    return this.http.delete<Contato>(url); //retorna um delete que recebe como parametro url
  }

  editarContato(contato: Contato): Observable<Contato> {
    //recebe um contato do tipo Contato e retona um observable do tipo Contato
    const url = `${this.API}/${contato.id}`; //declara url que recebe o endereço da api + o id do contato
    return this.http.put<Contato>(url, contato); //retorna esse novo endereço dentro de um metodo put do http
  }

  editarOuSalvarContato(contato: Contato) {
    if (contato.id) {
      //se o contato p[ossui um id
      return this.editarContato(contato); //retorna o metodo editar contato
    } else {
      //senao
      return this.salvarContato(contato); //retorna o metodo salvar contato
    }
  }
}
