import firebase from "../firebase";

const authProvider = new firebase.auth.GoogleAuthProvider();

const handleSignIn = async () => {
  await firebase.auth().signInWithRedirect(authProvider);
};

export default handleSignIn;
