import firebase from "../firebase";

const authProvider = new firebase.auth.GoogleAuthProvider();

export const handleSignIn = async () => {
  await firebase.auth().signInWithPopup(authProvider);
};

export const handleSignOut = async () => {
  await firebase.auth().signOut();
};
