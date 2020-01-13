import MockFirebase from 'mock-cloud-firestore';
import {
  showPost, addDocument, deleteDocument, updateDocument, setDocument, showComment,
  addSubCollection, deleteSubCollection, updateSubCollection,
} from '../src/model/firebase-model.js';

const fixtureData = {
  __collection__: {
    post: {
      __doc__: {
        abc122: {
          idUser: 'def123',
          message: 'Primer post de prueba',
          likeEmail: ['email-uno@gmail.com'],
          __collection__: {
            comments: {
              __doc__: {
                ghi123: {
                  message: 'Comentario 1',
                },
              },
            },
          },
        },
        abc123: {
          idUser: 'def123',
          message: 'Segundo post de prueba',
          likeEmail: [],
          __collection__: {
            comments: {
              __doc__: {
                ghi123: {
                  message: 'Comentario 2',
                },
              },
            },
          },
        },
        abc124: {
          idUser: 'def124',
          message: 'Tercer post de prueba',
          likeEmail: ['email-tres@gmail.com'],
          __collection__: {
            comments: {
              __doc__: {
                ghi124: {
                  message: 'Comentario 3',
                },
                ghi127: {
                  message: 'Comentario 4',
                },
                ghi128: {
                  message: 'Comentario 5',
                },
              },
            },
          },
        },
        abc125: {
          idUser: 'def125',
          message: 'Cuarto post de prueba',
          likeEmail: ['email-cuatro@gmail.com'],
          __collection__: {
            comments: {
              __doc__: {
                ghi125: {
                  message: 'Comentario 7',
                },
              },
            },
          },
        },
      },
    },
    user: {
      __doc__: {
        def123: {
          email: 'paola@hotmail.com',
          name: 'Paola HG',
          photoURL: 'fotito1.com',
        },
        def124: {
          email: 'sonia@gmail.com',
          name: 'Sonia G',
          photoURL: 'fotito2.com',
        },
        def125: {
          email: 'paul@gmail.com',
          name: 'Paul H',
          photoURL: 'fotito3.com',
        },
      },
    },
  },
};

const objPost = {
  idUser: 'def123',
  message: 'Laboratoria',
};
const objPostUpdate = {
  message: 'Laboratoria 2020',
};
const objUser = {
  id: 'def126',
  email: 'laboratoria@gmail.com',
  name: 'Laboratoria Lima',
  photoURL: 'fotito4.com',
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('showPost', () => {
  it('debería mostrar los post la data en tiempo real', (done) => {
    const callback = (post) => {
      console.log(post);
      done();
    };
    showPost('idUser', '==', 'def123', callback);
  });
});

describe('addDocument', () => {
  it('Agregar Post', (done) => addDocument('post', objPost)
    .then(() => showPost(
      'idUser', '==', 'def123', (data) => {
        console.log(data);
        const result = data.find((post) => post.message === 'Laboratoria');
        expect(result.message).toBe('Laboratoria');
        done();
      },
    )));
});

describe('setDocument', () => {
  it('Agregar Usuario', (done) => setDocument('user', 'def126', objUser)
    .then(() => {
      expect(objUser.id).toBe('def126');
      console.log(objUser);
      done();
    }));
});

// eslint-disable-next-line jest/no-focused-tests
/* describe.only('addEleArray', () => {
  it('Agregar Email Array', (done) => addEleArray('post', 'abc122', 'laboratoria-Lima@gmail.com'));
  expect();
}); */

/**
 * IMPORTANTE: only
 * Propiedad: only, significa "solamente" esta propiedad nos permite
 * testear solamente lo que deseamos.
 * Ejemplo:
 * describe.only('deleteDocument', () => { ....
 */

describe('deleteDocument', () => {
  it('Eliminat Post', (done) => deleteDocument('abc125')
    .then(() => showPost(
      'idUser', '==', 'def125', (collection) => {
        console.log(collection);
        const result = collection.find((post) => post.id === 'abc125');
        console.log(result);
        expect(result).toBeUndefined();
        done();
      },
    )));
});

describe('updateDocument', () => {
  it('Actualizar Post', (done) => updateDocument('abc123', objPostUpdate)
    .then(() => showPost(
      'idUser', '==', 'def123', (collection) => {
        console.log(collection);
        const result = collection.find((post) => post.message === 'Laboratoria 2020');
        expect(result.message).toBe('Laboratoria 2020');
        done();
      },
    )));
});

const objComment = {
  id: 'ghi126',
  message: 'Comentario 4',
};

describe('addSubCollection', () => {
  it('Agregar Comentario', (done) => addSubCollection('abc124', objComment)
    .then(() => showComment(
      'abc124', (subCollection) => {
        console.log(subCollection);
        const result = subCollection.find((comments) => comments.message === 'Comentario 4');
        expect(result.message).toBe('Comentario 4');
        done();
      },
    )));
});

describe('deleteSubCollection', () => {
  it('Eliminar Comentario', (done) => deleteSubCollection('abc124', 'ghi127')
    .then(() => showComment(
      'abc124', (subCollection) => {
        console.log(subCollection);
        const result = subCollection.find((comments) => comments.id === 'ghi127');
        expect(result).toBe(undefined);
        done();
      },
    )));
});

const objCommentUpdate = {
  message: 'Comentario 100',
};

describe('updateSubCollection', () => {
  it('Actualizar Comentario', (done) => updateSubCollection('abc124', 'ghi128', objCommentUpdate)
    .then(() => showComment(
      'abc124', (subCollection) => {
        console.log(subCollection);
        const result = subCollection.find((comments) => comments.message === 'Comentario 100');
        expect(result.message).toBe('Comentario 100');
        done();
      },
    )));
});
/* describe('showPost', () => {
  it('debería mostrar los comentarios a tiempo real', (done) => {
    const callback = (comments) => {
      console.log(comments);
      done();
    };
    showComment('abc123', callback);
  });
}); */

/*
Backup::
const fixtureData = {
  __collection__: {
    post: {
      __doc__: {
        abc123: {
          message: 'Primer post de prueba',
          __collection__: {
            comments: {
              __doc__: {
                ghi123: {
                  message: 'Comentario 1',
                },
              },
            },
          },
        },
        abc124: {
          message: 'Segundo post de prueba',
          __collection__: {
            comments: {
              __doc__: {
                ghi124: {
                  message: 'Comentario 2',
                },
                ghi127: {
                  message: 'Comentario 5',
                },
                ghi128: {
                  message: 'Comentario 7',
                },
              },
            },
          },
        },
        abc125: {
          message: 'Tercero post de prueba',
          __collection__: {
            comments: {
              __doc__: {
                ghi125: {
                  message: 'Comentario 3',
                },
              },
            },
          },
        },
      },
    },
    user: {
      __doc__: {
        def123: {
          email: 'paola@hotmail.com',
          name: 'Paola HG',
          photoURL: 'fotito1.com',
        },
        def124: {
          email: 'sonia@gmail.com',
          name: 'Sonia G',
          photoURL: 'fotito2.com',
        },
        def125: {
          email: 'paul@gmail.com',
          name: 'Paul H',
          photoURL: 'fotito3.com',
        },
      },
    },
  },
};
*/
