
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtbBIiBtzWRyq5f6rmIfnOiPoDcR_IHFo",
  authDomain: "house-marketplace-app-4d26b.firebaseapp.com",
  projectId: "house-marketplace-app-4d26b",
  storageBucket: "house-marketplace-app-4d26b.appspot.com",
  messagingSenderId: "642956043088",
  appId: "1:642956043088:web:34963204981f771f6bc255"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)