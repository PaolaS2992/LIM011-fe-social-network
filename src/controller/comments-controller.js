import { deleteSubCollection, updateSubCollection } from '../model/firebase-model.js';

/**/
export const eventDeleteComment = (idPost, idComment) => {
  deleteSubCollection(idPost, idComment)
    .then(() => console.log('Document successfully deleted!'))
    .catch((error) => console.error('Error removing document: ', error));
};

export const eventUpdateComment = (idPost, idComment, obj) => {
  updateSubCollection(idPost, idComment, obj)
    .then(() => console.log('Document successfully update!'))
    .catch((error) => console.error('Error document: ', error));
};
