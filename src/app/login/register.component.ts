import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

import { filter, map } from 'rxjs/operators';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  titulo: string;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
    private title: Title,
    private meta: Meta
   ) {
    this.getDataRoute().subscribe( resp => {
      console.log(resp);
      this.titulo = resp.titulo;
      this.title.setTitle( this.titulo );

      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      }

      this.meta.updateTag( metaTag );

    } );
   }

  ngOnInit(): void {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      apellidos: new FormControl( null, Validators.required ),
      email: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false ),
    }, { validators: this.sonIguales( 'password', 'password2' ) } );

    this.forma.setValue({
      nombre: 'Jack Anthony',
      apellidos: 'Sánchez Rivera',
      email: 'janasarii@gmail.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    })

  }

  sonIguales( campo1: string, campo2: string ){

    return ( group: FormGroup ) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if( pass1 === pass2 ){
        return null;
      }
      return {
        sonIguales: true
      }
    }

  }

  registrarUsuario(){

    if ( this.forma.invalid ){
      return;
    }
    if( !this.forma.value.condiciones ){
      Swal.fire(
        'Importante',
        'Debe de aceptar las condiciones',
        'warning'
      );
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.apellidos,
      this.forma.value.email,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario( usuario )
                  .subscribe( resp => {
                    console.log('RESP', resp);
                    this.router.navigate(['/login']);
                  } );



  }

  getDataRoute() {
    return this.router.events.pipe(

      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
      map( (evento: ActivationEnd) => evento.snapshot.data  )

    );
  }

}
