import {
  user, signOut, addDocument, obsAuth,
} from '../model/firebase-model.js';

export const eventObsAuth = () => {
  obsAuth((arrObsAuth) => {
    document.querySelector('#name-user').textContent = arrObsAuth.name;
    document.querySelector('#name').textContent = arrObsAuth.name;
    document.querySelector('#email').textContent = arrObsAuth.email;
    document.querySelector('#photo').src = arrObsAuth.photoUrl;
    // console.log(arrObsAuth);
  });
};

const datePost = (date) => {
  const yearPost = date.getFullYear();
  const monthPost = date.getMonth() + 1;
  const dayPost = date.getDate();
  const hourPost = date.toLocaleTimeString();
  const completeDate = `${dayPost}/${monthPost}/${yearPost} a las ${hourPost}`;
  return completeDate;
};

export const eventAddPost = (e) => {
  e.preventDefault();
  const post = document.querySelector('#message-post').value;
  const statusPost = document.querySelector('#status-post').value;
  const date = new Date();
  const userActual = user(); // OBS: Existira alguna forma de utilizar el obsAuth().
  const obj = {
    message: post,
    id_user: userActual.uid,
    name_user: userActual.displayName,
    date_post: datePost(date),
    status: statusPost,
    likeEmail: [],
  };
  addDocument('post', obj)
    .then((docRef) => {
      console.log('Document written with ID: ', docRef);
      // Limpiar el campo Message.
      document.querySelector('#message-post').value = '';
    })
    .catch((error) => console.error('Error adding document: ', error));
};

export const eventSignOut = () => {
  signOut()
    .then(() => {
      window.location.hash = '#/';
    })
    .catch((error) => console.log(error));
};

/* NO UTILIZADOS */
/* export const eventGetDocument = () => {
  getDocument('user')
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc);
        if (doc.id === user().uid) {
          document.querySelector('#name-user').textContent = doc.data().name;
          document.querySelector('#name').textContent = doc.data().name;
          document.querySelector('#email').textContent = doc.data().email;
          document.querySelector('#photo').src = doc.data().photoURL;
        }
      });
    });
};
 */
