import {
  eventDeletePost, eventUpdatePost, eventAddComment, eventShowComment, eventCountLike,
} from '../controller/post-controller.js';
import { user } from '../model/firebase-model.js';
import commentView from './comments-view.js';

const postView = (publication) => {
  const postTemplate = `
<div class="div-post">
    <div class="post-header">
        <p>Publicado por 
            <span> ${publication.name_user}</span>
        </p>
        <select name="status" id="post-status-${publication.id}" disabled>
            <option value="publico">Público</option>
            <option value="privado">Privado</option>
        </select>
        <span class="btn-delete" id="btn-delete-${publication.id}">&times;</span>
    </div>
    <div class="post-body">
      <div id="post-message" contentEditable = "false">${publication.message}</div>
    </div>
    <div class="post-footer">
        <div class ="section-likes">
        <img id="btn-like-${publication.id}" class="icons" src="//img.icons8.com/cotton/64/000000/like--v3.png">
        <img id="btn-nonlike-${publication.id}" class="icons hide" src="https://img.icons8.com/flat_round/64/000000/hearts.png">
        &nbsp; &nbsp; <p class="count-likes" id="count-likes-${publication.id}"></p>   
        </div>    
        <img id="btn-commentView-${publication.id}" class="icons" src="https://img.icons8.com/doodle/48/000000/filled-topic.png">
        <img id="btn-edit-${publication.id}" class="icons" src="https://img.icons8.com/flat_round/64/000000/edit-file.png">
        <img id="btn-save-${publication.id}" class="icons hide" src="https://img.icons8.com/cute-clipart/64/000000/save-close.png">
    </div>
    <div id ="comments-section" class="comments-section hide">
        <form class ="form-comment">
        <textarea class="comment-post" id="comment-post" cols="30" rows="2" placeholder="Escribe un comentario"></textarea>
        <img id="btn-comment-${publication.id}" class="icons" src="https://img.icons8.com/color/96/000000/telegram-app.png">
        </form> 
        <div class="" id="${publication.id}">   
        </div>
    </div>
</div>
  `;
  const divElement = document.createElement('div');
  divElement.innerHTML = postTemplate;
  // Borrar una publicacion.
  const btnDelete = divElement.querySelector(`#btn-delete-${publication.id}`);
  btnDelete.addEventListener('click', () => {
    eventDeletePost(publication.id);
  });
  // Editar una publicacion.
  const btnEdit = divElement.querySelector(`#btn-edit-${publication.id}`);
  const btnSave = divElement.querySelector(`#btn-save-${publication.id}`);
  const postMessage = divElement.querySelector('#post-message');
  const postStatus = divElement.querySelector(`#post-status-${publication.id}`);
  btnEdit.addEventListener('click', () => {
    postMessage.contentEditable = true;
    postStatus.disabled = false;
    postMessage.focus();
    btnEdit.classList.add('hide');
    btnSave.classList.remove('hide');
  });
  btnSave.addEventListener('click', () => {
    postMessage.contentEditable = false;
    postStatus.disabled = true;
    const newMessage = postMessage.innerHTML;
    const newStatus = postStatus.value;
    const obj = {
      message: newMessage,
      status: newStatus,
    };
    eventUpdatePost(publication.id, obj);
    btnEdit.classList.remove('hide');
    btnSave.classList.add('hide');
  });
  // Actualizar select de acuerdo a status.
  if (publication.status === 'publico') {
    postStatus.options[0].selected = true;
  } else {
    postStatus.options[1].selected = true;
  }
  // Habilitacion de CRUD si estas logeado.
  if (publication.id_user !== user().uid) {
    btnDelete.classList.add('hide');
    btnEdit.classList.add('hide');
    console.log(user().uid);
  }
  // Mostrar textarea para comentario.
  const btnCommentView = divElement.querySelector(`#btn-commentView-${publication.id}`);
  const commentSection = divElement.querySelector('#comments-section');
  btnCommentView.addEventListener('click', () => {
    commentSection.classList.toggle('hide');
  });
  // Agregar comentario.
  const btnComment = divElement.querySelector(`#btn-comment-${publication.id}`);
  btnComment.addEventListener('click', () => {
    const comment = divElement.querySelector('#comment-post').value;
    console.log(comment);
    const userActual = user();
    const obj = {
      message: comment,
      id_publication: publication.id,
      name_user: userActual.displayName,
    };
    eventAddComment(publication.id, obj);
    divElement.querySelector('#comment-post').value = '';
  });
  // Like / DisLike
  const btnLike = divElement.querySelector(`#btn-like-${publication.id}`);
  btnLike.addEventListener('click', () => {
    eventCountLike(publication.id);
  });
  const btnDisLike = divElement.querySelector(`#btn-nonlike-${publication.id}`);
  btnDisLike.addEventListener('click', () => {
    eventCountLike(publication.id);
  });
  const allLikes = publication.likeEmail; // Cambio de icono de Like y DisLike.
  if (allLikes.length !== 0) {
    allLikes.forEach((like) => {
      if (like === user().email) {
        btnLike.classList.add('hide');
        btnDisLike.classList.remove('hide');
      }
    });
  }
  const countLike = divElement.querySelector(`#count-likes-${publication.id}`); // Contador de Likes (realizarlo desde aqui permite el cambio rapido).
  countLike.innerHTML = publication.likeEmail.length;

  // Obtener COMENTARIOS a tiempo real.
  eventShowComment(publication.id, (arrComment) => {
    const divComments = divElement.querySelector(`#${publication.id}`);
    divComments.innerHTML = '';
    arrComment.forEach((comment) => {
      // console.log(comment);
      divComments.appendChild(commentView(comment));
    });
  });
  return divElement;
};

export default postView;
