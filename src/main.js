import changeView from './controller/route.js';

const init = () => {
// Tomar # Hash y mandarsela a la funcion changeView() para cambiar de vista.
  window.addEventListener('hashchange', () => changeView(window.location.hash));
  // Conexion con Firebase.
  const firebaseConfig = {
    apiKey: 'AIzaSyC9Lzk9hVLj0qZ17AWjwis0l1B3uyQN8lg',
    authDomain: 'codegirl011.firebaseapp.com',
    databaseURL: 'https://codegirl011.firebaseio.com',
    projectId: 'codegirl011',
    storageBucket: 'codegirl011.appspot.com',
    messagingSenderId: '842165782313',
    appId: '1:842165782313:web:fc7f4b364affd66c55d938',
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Para que cuando recargue automàticamente se vaya al Login.
  changeView(window.location.hash);
};

window.addEventListener('load', init());
