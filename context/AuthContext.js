import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "@/firebase"; // import firestore instance
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // firestore functions

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signup = async (name, email, phone, pinCode, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // save user to Firestore
    await saveUserToFirestore(result.user.uid, {
      name,
      email,
      phone,
      pinCode,
      createdAt: new Date(),
    });
  };

  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // After login, check if user already exists in Firestore
    const userDoc = await getDoc(doc(firestore, "users", result.user.uid));

    if (!userDoc.exists()) {
      // if user doesn't exist, create it
      await saveUserToFirestore(result.user.uid, {
        name: result.user.displayName,
        email: result.user.email,
        phone: result.user.phoneNumber || "",
        pinCode: "", // Google doesn't give pincode by default
        createdAt: new Date(),
      });
    }
  };

  const saveUserToFirestore = async (uid, data) => {
    const userRef = doc(firestore, "users", uid);
    await setDoc(userRef, data);
  };

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
