import firebase_app from "../config";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);
const coll = 'expenses';
export default async function addExpense(data) {
    let result = null;
    let error = null;

    if(data.amount == '') {
        throw "Cannot add empty expense"
    }

    try {
        const docRef = await addDoc(collection(db, coll), data)
    } catch (e) {
        error = e;
    }

    return { result, error };
}