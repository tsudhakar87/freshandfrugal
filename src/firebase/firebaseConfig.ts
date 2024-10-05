// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, connectFirestoreEmulator, doc, getDoc, 
  getDocs, getFirestore, onSnapshot, query, 
  where} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQKe2gfN86C1Zh1ABnzg1nO5OkbAyMfjc",
  authDomain: "freshandfrugal-900a1.firebaseapp.com",
  projectId: "freshandfrugal-900a1",
  storageBucket: "freshandfrugal-900a1.appspot.com",
  messagingSenderId: "810015311265",
  appId: "1:810015311265:web:94a0d84011cfdf2e2437e0",
  measurementId: "G-MZT2H0T4YS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Creating an instance of FireStore and Accessing Data
const firestore = getFirestore(); // initializes firestore with default settings
connectFirestoreEmulator(firestore, 'localhost', 8080);

/*
Adds a new document for any collection with the given data.
*/
async function addNewDocument(collectionRef, data) {
  try {
    const newDoc = await addDoc(collectionRef, data);
    console.log(`Your document was created at ${newDoc.path}`);
    return newDoc;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

/*
Reads a document from the given collection and doc ID.
*/

async function readDocument(collectionRef, docId) {
  try {
    const docRef = doc(collectionRef, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(`Document data: `, docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error reading document: ", error);
  }
}

/*
Listens to the given doc from the collection, using the inputted callback function
to handle the returned data.
*/
function listenToDocument(collectionRef, docId, callback) {
  const docRef = doc(collectionRef, docId);

  const unsubscribe = onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      console.log("Current data: ", docSnap.data());
      callback(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }, (error) => {
    console.error("Error listening to document: ", error);
  });

  // Return the unsubscribe function to stop listening when necessary
  return unsubscribe;
}

/*
Queries for a document from the given collection based on the given query conditions.
*/
async function queryDocuments(collectionRef, conditions) {
  try {
    // Build the query dynamically based on the conditions
    const q = query(
      collectionRef,
      ...conditions.map(cond => where(cond.field, cond.operator, cond.value))
    );
    
    const querySnapshot = await getDocs(q);
    
    const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() || {}}));
    
    console.log("Queried documents: ", documents);
    
    return documents;
  } catch (error) {
    console.error("Error querying documents: ", error);
  }
}