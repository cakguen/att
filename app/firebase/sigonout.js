import { getAuth, signOut } from 'firebase/auth'


export default function signOutUser() {
    const auth = getAuth();
    signOut(auth);
}