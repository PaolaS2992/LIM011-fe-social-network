/* eslint-disable no-console */

export const createAuth = (email, password) => (
  firebase.auth().createUserWithEmailAndPassword(email, password)
);

export const verificationEmail = () => firebase.auth().currentUser.sendEmailVerification();

export const signIn = (email, password) => (
  firebase.auth().signInWithEmailAndPassword(email, password)
);

export const googleSignIn = () => (
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
);
// Crea una instancia del objeto del proveedor de Google.

export const facebookSignIng = () => (
  firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
);
// Crea una instancia del objeto del proveedor de Facebook.

// Cerrar Sesion.
export const signOut = () => firebase.auth().signOut();
export const user = () => firebase.auth().currentUser;
export const addNote = (note, id, obj) => firebase.firestore().collection(note).doc(id).set(obj);
export const getNote = (note) => firebase.firestore().collection(note).get();

export const addPost = (nameCollection, obj) => (
  firebase.firestore().collection(nameCollection).add(obj)
);
export const showPost = (callback) => firebase.firestore().collection('post').onSnapshot((querySnapshot) => {
/*   document.querySelector('#all-publications').innerHTML = ''; */
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  callback(data);
});

export const deletePost = (ide) => firebase.firestore().collection('post').doc(ide).delete();
export const updatePost = (ide, obj) => firebase.firestore().collection('post').doc(ide).update(obj);

export const saveLikes = (idPost, obj, ide) => firebase.firestore().collection('post').doc(idPost).collection('likes')
  .doc(ide)
  .set(obj);
export const showLikes = (idPost) => firebase.firestore().collection('post').doc(idPost).collection('likes');

export const addComments = (idPost, obj) => firebase.firestore().collection('post').doc(idPost).collection('comments')
  .add(obj);

export const showComments = (idPost) => firebase.firestore().collection('post').doc(idPost).collection('comments')
  .get();
