import {initializeApp} from "firebase/app"
import {getAuth,GoogleAuthProvider} from "firebase/auth"



const firebaseConfig = {
    apiKey: "AIzaSyB6y360I34E1vZU0XLdp0OBk5e7b8npX4o",
    authDomain: "mern-whatsapp-d0e85.firebaseapp.com",
    projectId: "mern-whatsapp-d0e85",
    storageBucket: "mern-whatsapp-d0e85.appspot.com",
    messagingSenderId: "884786235035",
    appId: "1:884786235035:web:4660c037fdcacdaa1ea83e"
  };

  const app=initializeApp(firebaseConfig);
  const auth=getAuth();
  const provider=new GoogleAuthProvider();
  export {app,auth,provider}