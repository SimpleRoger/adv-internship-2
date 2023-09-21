// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKxLK7JMGAlXnILgJzxc62pBPDNd7c2qA",
  authDomain: "adv-internship.firebaseapp.com",
  projectId: "adv-internship",
  storageBucket: "adv-internship.appspot.com",
  messagingSenderId: "441741891507",
  appId: "1:441741891507:web:dd6210da50356506205dc6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//database
export const db = getFirestore(app);
export const storage = getStorage();
export const auth = getAuth(app);


// export const initFirebase = () => {
//   return app;
// };
