import { eventDeleteComment, eventUpdateComment } from '../controller/comments-controller.js';

const commentView = (comment) => {
  // console.log(comment);
  const commentTemplate = `
    <div class="div-allcomments" id="div-allcomments">
      <div class="div-comment">
          <div class="comment-header">
                <span>${comment.name_user}</span>
                <img id="btn-edit-${comment.id_publication}" class="icons" src="https://img.icons8.com/flat_round/64/000000/edit-file.png">
                <img id="btn-save-${comment.id_publication}" class="icons hide" src="https://img.icons8.com/cute-clipart/64/000000/save-close.png">
                <span id="btn-delete-${comment.id_publication}" class="btn-delete">&times;</span>
          </div>
          <div class="comment-body">
              <p id="comment-message" class="comment-message" contenteditable="false">${comment.message}</p>
          </div>
      </div>
    </div>
    `;
  const divElement = document.createElement('div');
  divElement.innerHTML = commentTemplate;

  const allcomments = document.querySelector(`#${comment.id_publication}`);
  allcomments.appendChild(divElement);

  // Borrar comentario.
  const btnDeleteComment = divElement.querySelector(`#btn-delete-${comment.id_publication}`);
  btnDeleteComment.addEventListener('click', () => {
    console.log(comment.id_publication);
    eventDeleteComment(comment.id_publication, comment.id);
  });

  // Editar comentario.
  const btnSaveComment = divElement.querySelector(`#btn-save-${comment.id_publication}`);
  const btnEditComment = divElement.querySelector(`#btn-edit-${comment.id_publication}`);
  const messageComment = divElement.querySelector('#comment-message');
  btnEditComment.addEventListener('click', () => {
    console.log('edit');
    messageComment.contentEditable = true;
    messageComment.focus();
    btnEditComment.classList.add('hide');
    btnSaveComment.classList.remove('hide');
  });
  btnSaveComment.addEventListener('click', () => {
    console.log('save');
    messageComment.contentEditable = false;
    const newComment = messageComment.innerHTML;
    const obj = {
      message: newComment,
    };
    eventUpdateComment(comment.id_publication, comment.id, obj);
    btnEditComment.classList.remove('hide');
    btnSaveComment.classList.add('hide');
  });

  return divElement;
};

export default commentView;
