import * as post from './post'

export class AuthService {
  static login = post.loginUsuario
  static register = post.registerUsuario
}
