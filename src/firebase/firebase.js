import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyClJdn5S3Qjx4BZ4_MSMl9uMY8RQ8rgz2M",
    authDomain: "kevs-db.firebaseapp.com",
    databaseURL: "https://kevs-db.firebaseio.com",
    projectId: "kevs-db",
    storageBucket: "kevs-db.appspot.com",
    messagingSenderId: "644760596131",
    appId: "1:644760596131:web:9d2058abbcec03e3ffd916",
    measurementId: "G-NN5LZNB3JX"
  };

  //userAuth is the object that contains the various info about user authentication from Firebase
  export const createUserProfileDocument = async(userAuth,addtionalData) => {    
    if(!userAuth){                    //async because we're making an API request 
      return;
    }        

    // We get the documentReferance doc from the object (userAuth) in the users collection 
    //which contains the id that tells us whether the user is signed in or not

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    //Await because it's an API call thus an Async Function
    // The get function retrieves the documentSnapshot of the object which gives us the details of the user i.e whether signedin or not ,etc
    const snapShot = await userRef.get();                                        
    
    // To use CRUD methods , we have to use documentRefernace
    if(!snapShot.exists){
        // If user is NOT SIGNED IN , we create a user (ie. update that he/she is signed In)
        const {displayName,email} = userAuth;
        const createdAt = new Date();
        
        // As Storing data in the db is async, we use try-catch
        try {
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...addtionalData
          })
        } catch (error) {
          console.log('error in creating user',error.message);
        } 
      }

      return userRef;
  }     
  
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
