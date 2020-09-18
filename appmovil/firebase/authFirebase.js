import firebase from "@firebase/app";
import '@firebase/auth';

 export const getIn =async (email, pass) => {
    return await firebase.auth().signInWithEmailAndPassword(email, pass);;
  };

  export const createUser = async (email, pass) => {
    await firebase.auth().createUserWithEmailAndPassword(email, pass);
    return firebase.auth().currentUser.updateProfile({ email: email });
  };

  export const getUser = () => {
    return firebase.auth().currentUser.email;
  };

