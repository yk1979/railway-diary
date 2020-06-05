import firebase from "../../firebase";

const authProvider = new firebase.auth.GoogleAuthProvider();

export const handleSignIn = async (): Promise<void> => {
  await firebase.auth().signInWithPopup(authProvider);
};

export const handleSignOut = async (): Promise<void> => {
  await firebase.auth().signOut();
};
