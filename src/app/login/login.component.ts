import { UsuarioService } from './../services/service.index';
import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame = false;
  email: string;
  auth2: any;
  titulo: string;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
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
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if( this.email.length > 1 ){
      this.recuerdame = true;
    }

  }



  googleInit(){

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '463615284667-7asau4n50206acecks7lkd3ckr20q4js.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn( document.getElementById('btnGoogle') );

    });

  }

  attachSignIn( element ){
    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      setTimeout( () => {

        //console.log('token', token);
        this._usuarioService.loginGoogle( token )
                .subscribe( () => {
                  window.location.href = '#/dashboard';
                } );

      }, 50000 );
    });
  }

  ingresar( forma: NgForm){

    if( forma.invalid ){
      return;
    }

    let usuario = new Usuario(null, null, forma.value.email, forma.value.password);

    this._usuarioService.login( usuario, forma.value.recuerdame )
                  .subscribe( resp => {

                    //console.log('RESP', resp);
                    this.router.navigate(['/dashboard']);

                  } )

  }

  getDataRoute() {
    return this.router.events.pipe(

      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
      map( (evento: ActivationEnd) => evento.snapshot.data  )

    );
  }

}
