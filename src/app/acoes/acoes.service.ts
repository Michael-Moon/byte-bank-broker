import { Acao, AcoesAPI } from './modelo/acoes';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private http: HttpClient) { }

  getAcoes(value?: string){
    const params = value ? new HttpParams().append('valor', value) : undefined;
    return this.http.get<AcoesAPI>('http://localhost:3000/acoes', {params: params})
    .pipe(
      tap((value) => console.log(value)),
      pluck('payload'),
      map( (acoes) => acoes.sort((acaoA, acaoB)=> this.ordenaPorCodigo(acaoA, acaoB) ) ));
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao){
    if(acaoA.codigo > acaoB.codigo){
      return 1;
    }
    if(acaoA.codigo < acaoB.codigo){
      return -1
    }

    return 0;
  }
}
