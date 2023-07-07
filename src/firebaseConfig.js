import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCPW0sp7IhDW5LE-MKoV6OBH3UT8UhyMbw",
  authDomain: "primer-e-commerce.firebaseapp.com",
  projectId: "primer-e-commerce",
  storageBucket: "primer-e-commerce.appspot.com",
  messagingSenderId: "397335227516",
  appId: "1:397335227516:web:445fc3886b6fa70da5adf9"
};

//inicializamos app
const app = initializeApp(firebaseConfig);

///////////////////////////////////////////////////////////////////////////////
//traemos el metodo getFirestore y lo exportamos a la app con "db" (database)
export const db = getFirestore(app)

///////////////////////////////////////////////////////////////////////////////
//Sign up - Login --> Autenticador
//traemos el metodo getAuth 
const auth = getAuth(app)
//y lo exportamos junto con la funcion "login"
export const login = async ( {email , password} )=> {
  try{ //con try - catch podemos manipular el mensaje de error a nuestro antojo
    return await signInWithEmailAndPassword( auth, email, password )
  }catch (error){
    console.error(error)
  }
}
export const register = async( {email , password} ) => {
  try{
    return await createUserWithEmailAndPassword(auth, email, password)
  }catch (error){
    console.error(error)
  }
}

//Google Authenticator
const googleAuth = new GoogleAuthProvider()
export const loginWithGoogle = async () => {
  try{
    return await signInWithPopup(auth, googleAuth)
  }catch (error) {
    console.error(error)
  }
}