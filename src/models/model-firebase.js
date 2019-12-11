export const createAuth = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
}