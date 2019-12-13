import { signInUser } from '../controllers/login-controller.js';

export default () => {
  const viewLogin = `
    <div class="login-register-header flex">
      <img class="login-register-img" src="../src/img/fondo.jpg" alt="Mujer programando">
    </div>
    <div class="login-register-section flex">
      <div class="login-register-body flex">
        <img class="" src="../src/img/logo6.png" alt="logo CodeGirl" width=170px>
        <h3>¡Bienvenida, coder!</h3>
        <input class="input-log-reg style" type="email" id="email" placeholder="Ingresa tu correo"></br>
        <input class="input-log-reg style" type="password" id="password" placeholder="Ingresa tu contraseña"></br>
        <button class="btn-log-reg style" id="btn-enter">Log in</a></button>
        <p id="message-error"></p>
      </div>
      <div class="login-footer flex">
        <p id="">O bien ingresa con...</p>
        <p>
        <i><img src="https://img.icons8.com/color/48/000000/facebook-new.png"></i>
        <i><img src="https://img.icons8.com/color/48/000000/google-plus--v1.png"></i>
        </p>
        <p>¿No tienes una cuenta? <a href="#/register">Registrate</a></p>
      </div>
    </div>
    `;
  const divElement = document.createElement('div');
  divElement.classList.add('login-register');
  divElement.innerHTML = viewLogin;
  divElement.querySelector('.btn-log-reg').addEventListener('click', () => {
    signInUser();
  });
  return divElement;
};
