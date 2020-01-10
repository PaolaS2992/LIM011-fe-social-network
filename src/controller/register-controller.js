import { createUser, verificationEmail, setDocument } from '../model/firebase-model.js';

const eventCreateUser = (e) => {
  const btnRegister = e.target;
  const nameUser = btnRegister.closest('div').querySelector('[type = text]').value;
  const email = btnRegister.closest('div').querySelector('[type = email]').value;
  const password = btnRegister.closest('div').querySelector('[type = password]').value;
  const message = btnRegister.closest('div').querySelector('p');
  if (email !== '' || password !== '' || nameUser !== '') {
    createUser(email, password)
      .then((newUser) => {
        verificationEmail();
        const obj = {
          name: nameUser,
          email: newUser.user.email,
          photoURL: 'https://img.icons8.com/ios-glyphs/120/000000/user-female.png',
        };
        setDocument('user', newUser.user.uid, obj)
          .then(() => {
            window.location.hash = '#/';
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/invalid-email':
            message.innerHTML = 'La dirección de correo electrónico no es valida';
            break;
          case 'auth/email-already-in-use':
            message.innerHTML = 'La dirección de correo electrónico ya esta en uso';
            break;
          case 'auth/weak-password':
            message.innerHTML = 'La contraseña debe tener al menos 6 caracteres.';
            break;
          default:
            message.innerHTML = 'Se produjo un error';
        }
      });
  } else {
    message.innerHTML = 'Ingresar todos los campos';
  }
};

export default eventCreateUser;
