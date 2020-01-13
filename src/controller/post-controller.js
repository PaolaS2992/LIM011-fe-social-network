import {
  deleteDocument, updateDocument, addSubCollection, showComment,
  getDocument, addEleArray, deleteEleArray, user,
} from '../model/firebase-model.js';

export const eventDeletePost = (idPost) => {
  deleteDocument(idPost)
    .then(() => console.log('Document successfully deleted!'))
    .catch((error) => console.error('Error removing document: ', error));
};

export const eventUpdatePost = (idPost, obj) => {
  updateDocument(idPost, obj)
    .then(() => console.log('Document successfully updated!'))
    .catch((error) => console.error('Error updating document: ', error));
};

export const eventAddComment = (idPost, obj) => {
  addSubCollection(idPost, obj)
    .then((docRef) => {
      console.log('Document written with ID: ', docRef);
      document.querySelector('#comment-post').value = '';
    })
    .catch((error) => console.error('Error adding document: ', error));
};

export const eventShowComment = (idPost, callback) => {
  showComment(idPost, callback);
};

export const eventCountLike = (idPost) => {
  getDocument('post', idPost)
    .then((doc) => {
      if (doc.exists) {
        /* console.log('datos de la publicaion: ', doc.data());
        console.log(idPost); */
        const arraylikeEmail = doc.data().likeEmail;
        // console.log(arraylikeEmail.length);
        if (arraylikeEmail.length === 0) {
          addEleArray('post', idPost, user().email);
          console.log('Se agrego');
        } else {
          arraylikeEmail.forEach((ele) => {
            if (ele !== user().email) {
              addEleArray('post', idPost, user().email);
              console.log('Se agrego');
            } else {
              deleteEleArray('post', idPost, user().email);
              console.log('Se borro');
            }
          });
        }
      } else {
        console.log('Documento no Existe');
      }
    });
};

/* NO UTILIZADO */
/* getSubCollection(idPost)
  .then((query) => {
    document.querySelector(`#${idPost}`).innerHTML = ''; // No se si colocar aqui es lo correcto.
    query.forEach((doc) => {
      commentView(doc);
    });
  })
  .catch((error) => console.log(error)); */
