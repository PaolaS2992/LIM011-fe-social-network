import {
  signIn, googleSignIn, facebookSignIn, setDocument,
} from '../model/firebase-model.js';

export const eventSignIn = (e) => {
  e.preventDefault();
  const btnLogin = e.target;
  const email = btnLogin.closest('div').querySelector('[type=email]').value;
  const password = btnLogin.closest('div').querySelector('[type=password]').value;
  const message = btnLogin.closest('div').querySelector('p');
  signIn(email, password)
    .then((newUser) => {
      if (newUser.user.emailVerified !== true) {
        message.innerHTML = 'VALIDAR CUENTA - REVISA TU CORREO';
      } else {
        window.location.hash = '#/profile';
      }
      console.log(newUser);
    })
    .catch((error) => {
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/wrong-password':
          message.innerHTML = 'La contraseña es invalida o el usuario no tiene una contraseña';
          break;
        case 'auth/user-not-found':
          message.innerHTML = 'No hay registro de usuario correspondiente a este identificador. El usuario puede haber sido eliminado';
          break;
        case 'auth/invalid-email':
          message.innerHTML = 'La dirección de correo electrónico no es valida';
          break;
        default:
          message.innerHTML = 'Se produjo un error';
      }
    });
};

export const eventGoogleSignIn = (e) => {
  const btnGoogle = e.target;
  const message = btnGoogle.closest('div').querySelector('p');
  googleSignIn()
    .then((result) => {
      const user = result.user;
      const obj = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      console.log(obj);
      setDocument('user', user.uid, obj)
        .then(() => {
          window.location.hash = '#/profile';
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => {
      const errorMessage = error.message;
      message.innerHTML = errorMessage;
    });
};

export const eventFacebookSignIn = (e) => {
  const btnFacebook = e.target;
  const message = btnFacebook.closest('div').querySelector('p');
  facebookSignIn()
    .then((result) => {
      const user = result.user;
      const obj = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      setDocument('user', user.uid, obj)
        .then(() => {
          window.location.hash = '#/profile';
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        message.innerHTML = 'La dirección de correo electrónico ya esta en uso';
      }
    });
};
