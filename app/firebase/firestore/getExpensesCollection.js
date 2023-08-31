import firebase_app from "../config";
import { getFirestore, collection, query, where } from "firebase/firestore";

const db = getFirestore(firebase_app);

export function getExpensesCollection(userId) {
    const q = query(collection(db, "expenses"), where(`roles.${userId}`, "==", 'owner'))
    return q; // Return the collection reference
}