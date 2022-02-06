import { merge, Subscription } from 'rxjs';


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Acoes } from './modelo/acoes';
import { AcoesService } from './acoes.service';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

const ESPERA_DIGITACAO = 300;

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent  {
  acoesInput = new FormControl();

  todaAcoes$ = this.acoesService.getAcoes().pipe(tap(()=> {console.log('fluxo inicial')}));
  filtroPeoInut$  = this.acoesInput.valueChanges.pipe(
    debounceTime(ESPERA_DIGITACAO),
    tap(()=> {console.log('fluxo filtro')}),
    filter( (valorDigitado) => valorDigitado.length >= 3 || !valorDigitado.length  ),
    distinctUntilChanged(),
    switchMap((valorDigitado)=> this.acoesService.getAcoes(valorDigitado)));

  acoes$ =  merge(this.todaAcoes$, this.filtroPeoInut$);
  // acoes$ = this.acoesService.getAcoes();
  // acoes: Acoes;
  // private subscription: Subscription;

  constructor(private acoesService: AcoesService) {}

  // ngOnInit(): void {
  //   this.subscription = this.acoesService.getAcoes().subscribe( (response) => {
  //     this.acoes = response
  //   })
  // }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }


}
