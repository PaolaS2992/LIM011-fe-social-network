import components from '../view/components.js';
import { showPost, obsAuth } from '../model/firebase-model.js';

// eslint-disable-next-line consistent-return
const changeView = (route) => {
// Section general.
  const container = document.querySelector('#container');
  container.innerHTML = '';
  if (route === '' || route === '#' || route === '#/') {
    return container.appendChild(components.login());
  }
  if (route === '#/register') {
    return container.appendChild(components.register());
  }
  if (route === '#/profile') {
    obsAuth((arrInfoUser) => {
      console.log(arrInfoUser);
      /* const elementP = document.createElement('p');
      elementP.textContent = arrInfoUser.name;
      container.appendChild(elementP); */
      showPost('id_user', '==', arrInfoUser.uid, (arrDataPost) => {
        container.innerHTML = '';
        container.appendChild(components.profile(arrDataPost));
      });
    });
  }
};

export default changeView;
