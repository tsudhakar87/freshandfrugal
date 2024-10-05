// firebase/authService.ts

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const loginUser = async (email: string, password: string) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User logged in:", user.uid);
    return user;  // Optionally return the user object if needed
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;  // Re-throw the error so it can be handled by the caller
  }
};
