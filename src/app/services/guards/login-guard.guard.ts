import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ){}

  canActivate(){

    let u = this._usuarioService.estaLogueado;
    console.log('token-tamaño', u);

    if( this._usuarioService.estaLogueado() ){
      console.log('Pasó el Guard login');
      return true;
    }else{
      console.log('Bloqueado por el Guard');
      this.router.navigate(['/login']);
      return false;
    }

  }

}
