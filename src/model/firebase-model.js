/**
 * Firebase --> auth
*/
// 1. Crear Usuario.*
export const createUser = (email, password) => (
  firebase.auth().createUserWithEmailAndPassword(email, password));

// 2. Activar cuenta - Validacion de Email. << Pendiente de Test >>
export const verificationEmail = () => firebase.auth().currentUser.sendEmailVerification();

// 3. Iniciar Sesion Cuenta nueva.*
export const signIn = (email, password) => (
  firebase.auth().signInWithEmailAndPassword(email, password)
);

// 3.1. Iniciar Sesion Google.*
export const googleSignIn = () => (
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
);

// 3.2. Iniciar Sesion Facebook.*
export const facebookSignIn = () => (
  firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
);

// 4. Obtener los datos del Usuario Logeado. << Pendiente de Test >>
export const user = () => firebase.auth().currentUser;

// 5. Observador del objeto auth(). << Pendiente de Test >>
export const obsAuth = (callback) => (firebase.auth()
  .onAuthStateChanged((userx) => {
    const obj = {
      name: userx.displayName,
      email: userx.email,
      photoUrl: userx.photoURL,
      emailVerified: userx.emailVerified,
      uid: userx.uid,
    };
    callback(obj);
  })
);

// 6. Cerrar Sesion.*
export const signOut = () => firebase.auth().signOut();

/**
 * Firebase --> FireStore
 */

// 1. Agregar Usuario "Metodo SET". Si en caso ya existe reemplazarlo.*
export const setDocument = (collec, idDocu, obj) => (
  firebase.firestore().collection(collec).doc(idDocu).set(obj));

// 2. Agregar Post "Metodo ADD" el ID del documento se crea automaticamente.*
export const addDocument = (collec, obj) => (
  firebase.firestore().collection(collec).add(obj)
);

// 3. Eliminar Documento*
export const deleteDocument = (idDocu) => firebase.firestore().collection('post').doc(idDocu).delete();

// 4. Actualizar Documento*
export const updateDocument = (idDocu, obj) => firebase.firestore().collection('post').doc(idDocu).update(obj);

// 5. Leer los datos en Real Time.*
export const showPost = (callback) => (firebase.firestore().collection('post')
  // .where('id_user', '==', id)
  .orderBy('date_post', 'asc')
  .onSnapshot((querySnapshot) => {
    const dataPost = [];
    querySnapshot.forEach((doc) => {
      dataPost.push({ id: doc.id, ...doc.data() });
    });
    callback(dataPost);
  })
);

// 6. SUB-COLECCIONES:: Agregar comentario.*
export const addSubCollection = (idDocu, obj) => firebase.firestore().collection('post').doc(idDocu)
  .collection('comments')
  .add(obj);

// 7. SUB-COLECCIONES:: Eliminar comentario.*
export const deleteSubCollection = (idDocu, idSubCollection) => firebase.firestore().collection('post').doc(idDocu)
  .collection('comments')
  .doc(idSubCollection)
  .delete();

// 8. SUB-COLECCIONES:: Editar comentario.*
export const updateSubCollection = (idDocu, idComment, obj) => firebase.firestore().collection('post').doc(idDocu)
  .collection('comments')
  .doc(idComment)
  .update(obj);

// 9. Leer los comentarios.*
export const showComment = (idPost, callback) => (
  firebase.firestore().collection('post').doc(idPost).collection('comments')
    .onSnapshot((querySnapshot) => {
      const dataComment = [];
      querySnapshot.forEach((doc) => {
        dataComment.push({ id: doc.id, ...doc.data() });
      });
      callback(dataComment);
    })
);

/* NO UTILIZADOS */
// Leer los datos del Usuario.
// export const getDocument = (collec) => firebase.firestore().collection(collec).get();

// SUB-COLECCIONES:: Mostrar comentario.
/* export const getSubCollection = (idDocu) => firebase.firestore().collection('post').doc(idDocu)
  .collection('comments')
  .get(); */
