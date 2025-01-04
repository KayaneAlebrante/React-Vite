import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAPdiH4kF___1IYnomjBevKErr4haHPQkQ",
    authDomain: "tech-space-4924e.firebaseapp.com",
    projectId: "tech-space-4924e",
    storageBucket: "tech-space-4924e.firebasestorage.app",
    messagingSenderId: "44389467407",
    appId: "1:44389467407:web:e226ed88f427d2366d2a7a",
    measurementId: "G-1S3RBGBTVF"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, auth, storage };