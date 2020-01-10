import { eventSignIn, eventGoogleSignIn, eventFacebookSignIn } from '../controller/login-controller.js';

export default () => {
  const loginTemplate = `
    <div class="login-register-header flex">
    <figure>
        <img class="login-register-img" src="./img/fondo.jpg" alt="Mujer programando">
    </figure>
    </div>
    <div class="login-register-section flex">
        <div class="login-register-body flex">
            <figure>
            <img class="" src="./img/logo6.png" alt="logo CodeGirl" width=170px>
            </figure>
            <h3>¡Bienvenida, coder!</h3>
            <input class="input-log-reg style" type="email" placeholder="Ingresa tu correo"></br>
            <input class="input-log-reg style" type="password" placeholder="Ingresa tu contraseña"></br>
            <button class="btn-log-reg style" id="btn-enter">Log in</button>
            <p id="message-error"></p>
        </div>
        <div class="login-footer flex">
            <p id="">O bien ingresa con...</p>
            <p>
            <i id="btn-facebook"><img class="icon-network" src="https://img.icons8.com/color/48/000000/facebook-new.png"></i>
            <i id="btn-google"><img class="icon-network" src="https://img.icons8.com/color/48/000000/google-plus--v1.png"></i>
            </p>
            <p>¿No tienes una cuenta? <a href="#/register">Registrate</a></p>
        </div>
    </div>
    `;
  // Crear div.
  const divElement = document.createElement('div');
  // Agregar class
  divElement.classList.add('login-register');
  // Pintar template.
  divElement.innerHTML = loginTemplate;
  // Click Login - Manual.
  divElement.querySelector('#btn-enter').addEventListener('click', eventSignIn);
  // Click Login - Google.
  divElement.querySelector('#btn-google').addEventListener('click', eventGoogleSignIn);
  // Click Login - Facebook.
  divElement.querySelector('#btn-facebook').addEventListener('click', eventFacebookSignIn);
  // Retornamos
  return divElement;
};
