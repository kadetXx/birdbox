import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

console.log(process.env.VUE_APP_FIREBASE_API_KEY);

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "birdbox-8194a.firebaseapp.com",
  projectId: "birdbox-8194a",
  storageBucket: "birdbox-8194a.appspot.com",
  messagingSenderId: "253321208919",
  appId: "1:253321208919:web:a331e6d4d3beb6f81e2f12",
  measurementId: "G-FGGNB6P2JM",
};

// write function to store newly authenticated users to db

export const checkIfUserExists = async (authUser) => {
  if (!authUser) return;

  const userRef = firestore.doc(`users/${authUser.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    return false;
  } else {
    return userRef;
  }
};

export const createUserDocument = async (authUser, extraData) => {
  if (!authUser) return;

  const userRef = firestore.doc(`users/${authUser.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = authUser;
    const createdAt = new Date();

    try {
      await userRef
        .set({
          displayName,
          email,
          createdAt,
          ...extraData,
        })
        .then(() => {
          window.location = "/";
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ promt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
