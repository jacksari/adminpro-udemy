import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('textProgress') txtProgress: ElementRef

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    //console.log('Leyenda', this.leyenda);
    //console.log('progreso', this.progreso);
  }

  ngOnInit(): void {
    //console.log('progreso', this.progreso);
  }
  onChanges( newValue: number ){

    //let elemHTML: any = document.getElementsByName('progreso')[0];

    //console.log('New:', newValue);
    if ( newValue >= 100 ){
      this.progreso = 100;
    }else if ( newValue <= 0 ){
      this.progreso = 0;
    }else{
    this.progreso = newValue;
    }

    //elemHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit( this.progreso );
  }

  cambiarvalor(a: number){
    if (this.progreso >= 100 && a > 0){
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && a < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + a;
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.focus();

  }

}
