import { initializeApp } from "firebase/app";
import { getAuth, 
         signInWithRedirect, 
         signInWithPopup, 
         GoogleAuthProvider, 
         createUserWithEmailAndPassword ,
         signInWithEmailAndPassword,
         signOut,
         onAuthStateChanged
        } from "firebase/auth";
import { getFirestore, 
         doc, 
         getDoc, 
         setDoc, 
         collection, 
         writeBatch,
         query,
         getDocs,
        } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiAOKxGCILWOwHxN_mSRkvNQp4JBsCu2s",
  authDomain: "nana-style-db.firebaseapp.com",
  projectId: "nana-style-db",
  storageBucket: "nana-style-db.appspot.com",
  messagingSenderId: "359320186468",
  appId: "1:359320186468:web:2b809dae472f358f31b971"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters ({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  })

  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

}
/* 
db structure
{
  hats: {
    title: 'Hats',
    items: [
      {},
      {}
    ]
  },
  sneakers: {
    title: 'Sneakers',
    items: [
      {},
      {}
    ]
  }
}
 */
export const createUserDocumentFromAuth = async (userAuth, addittionalInformation = {}) => {
  if(!userAuth) return;
  
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot =await getDoc(userDocRef);
  
  //console.log(userSnapshot);
  //console.log(userSnapshot.exists());

  //if user data does not exists
  //create/set the document with the data from userAuth in my collection
  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...addittionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  //if user data exists
  //return userDocRef
  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};