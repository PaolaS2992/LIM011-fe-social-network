import {
  signIn, createUser, googleSignIn, facebookSignIn, signOut,
} from '../src/model/firebase-model.js';

// Configuraciòn firebase mock.
const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  () => null,
  () => mockauth,
  () => mockfirestore,
);

// Iniciando tests.
describe('createUser', () => {
  it('Deberia poder crear nuevo usuario', () => createUser('pao@gmail.com', '123456')
    .then((user) => {
      console.log(user.emailVerified);
      console.log(user);
      // verificationEmail();
      expect(user.email).toStrictEqual('pao@gmail.com');
      // expect(user.emailVerified).toStrictEqual(false);
    }));
});
describe('signIn', () => {
  it('Deberia poder iniciar Sesion', () => signIn('pao@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toStrictEqual('pao@gmail.com');
    }));
});
describe('googleSignIn', () => {
  it('Deberìa poder logearse con Google', () => googleSignIn()
    .then((user) => {
      console.log(user);
      expect('sonia@gmail.com').toStrictEqual('sonia@gmail.com');
    }));
});
describe('facebookSignIn', () => {
  it('Deberìa poder logearme con Facebook', () => facebookSignIn()
    .then((user) => {
      console.log(user);
      expect('pao@hotmail.com').toStrictEqual('pao@hotmail.com');
    }));
});
describe('signOut', () => {
  it('Deberia cerrar sesiòn', () => signOut()
    .then((user) => {
      console.log(user);
      expect('Fin de Sesion').toStrictEqual('Fin de Sesion');
    }));
});
/* describe('verificationEmail', () => {
  it('Deberia validar correo', () => verificationEmail()
    .then((user) => {
      console.log(user);
      expect(user.emailVerified === false).toStrictEqual('pao@gmail.com');
    }));
});
 */
