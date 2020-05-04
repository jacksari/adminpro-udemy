import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then(
      () => console.log('Termino!'),
    ).catch(err => console.log('Error en la promesa', err));

  }

  ngOnInit(): void {
  }

  contarTres(): Promise<boolean>{
    return new Promise( ( resolve, reject ) => {

      let contador = 0;
      let intervalo =  setInterval( () => {

        contador++;
        console.log(contador);
        if(contador === 3){
          resolve( true );
          clearInterval(intervalo);
        }

      }, 1000 );

    } );
  }

}
