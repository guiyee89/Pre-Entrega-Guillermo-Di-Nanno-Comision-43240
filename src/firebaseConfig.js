import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, sendPasswordResetEmail } from "firebase/auth";

//configuracion de VITE para proteger la informacion de variables de entorno (.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY, //objetos
  authDomain:import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING,
  appId: import.meta.env.VITE_APP_ID
};

//inicializamos app
const app = initializeApp(firebaseConfig);

///////////////////////////////////////////////////////////////////////////////
//traemos el metodo getFirestore y lo exportamos a la app con "db" (database)
export const db = getFirestore(app)

//AUTH ANTERIOR
///////////////////////////////////////////////////////////////////////////////
//Sign up - Login --> Autenticador
//traemos el metodo getAuth 
// const auth = getAuth(app)
// //y lo exportamos junto con la funcion "login"
// export const login = async ( {email , password} )=> {
//   try{ //con try - catch podemos manipular el mensaje de error a nuestro antojo
//     return await signInWithEmailAndPassword( auth, email, password )
//   }catch (error){
//     return error
//   }
// }
// export const register = async( {email , password} ) => {
//   try{
//     return await createUserWithEmailAndPassword(auth, email, password)
//   }catch (error){
//     return error
//   }
// }

// //Google Authenticator
// const googleAuth = new GoogleAuthProvider()

// export const loginWithGoogle = async () => {
//     const res = await signInWithPopup(auth, googleAuth)
//     console.log(res)
// }

/*********   Auth   ********/
const auth = getAuth(app)
//Login
export const onLogin = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return { user };
  } catch (error) {
    return { error }; // Return the error object
  }
};
export const onRegister = async ({ email, password }) => {
  try {
      return await createUserWithEmailAndPassword(auth, email, password)
  } catch (error) {
      return error
  }
}
//Google Authenticator
const googleAuth = new GoogleAuthProvider()

export const loginWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleAuth)
  console.log(res)
  return res
}
//Log out session
export const logout = () => {
  signOut(auth)
}
export const forgotPassword = async (email) => {
  try {
      let res = await sendPasswordResetEmail(auth, email)
      return res
  } catch (error) {
      return error
  }
}