import {
  deleteDocument, updateDocument, addSubCollection, showComment,
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

/* NO UTILIZADO */
/* getSubCollection(idPost)
  .then((query) => {
    document.querySelector(`#${idPost}`).innerHTML = ''; // No se si colocar aqui es lo correcto.
    query.forEach((doc) => {
      commentView(doc);
    });
  })
  .catch((error) => console.log(error)); */
