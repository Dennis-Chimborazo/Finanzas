// firebasetoken.js (o firebasetoken.ts si estás usando TypeScript)
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'; // 👈 ya usamos el auth inicializado

class FirebaseAuthService {
  static async loginAndGetToken(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      return idToken;
    } catch (error) {
      console.error("Error de autenticación:", error);
      return null;
    }
  }

  static async registerWithLoginAndGetToken(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      return idToken;
    } catch (error) {
      console.error("Error de autenticación:", error);
      return null;
    }
  }

}

export default FirebaseAuthService;
