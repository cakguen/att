'use client'
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import addExpense from "../firebase/firestore/addExpense";

function Page() {
    const { user } = useAuthContext();
    const router = useRouter();
    
    const [expenseTitle, setExpenseTitle] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [category, setCategory] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null); // New state for file preview

    useEffect(() => {
        if (user === null) {
            router.push("/");
        }
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFilePreview(URL.createObjectURL(file)); // Create a temporary URL for preview
    };

    const handleForm = async (event) => {
        event.preventDefault();
        try {
            // Upload image to Firebase storage
            if (selectedFile) {
                const storage = getStorage();
                const storageRef = ref(storage, `receipts/${user.uid}/${selectedFile.name}`)
                await uploadBytes(storageRef, selectedFile);
                const imageUrl = await getDownloadURL(storageRef);
                
                // Add expense data to Firestore
                const data = {
                    title: expenseTitle,
                    amount: expenseAmount,
                    category: category,
                    roles: { [user?.uid]: 'owner' },
                    imageUrl: imageUrl,
                };
                await addExpense(data);
                router.push("/myexpenses");
            } else {
                console.error("Please select a file.");
            }
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    return (
        <div>
            <h1>Create new expense</h1>
            <form onSubmit={handleForm} className="form">
                <label htmlFor="ExpenseTitle">
                    <input
                        autoComplete="off"
                        onChange={(e) => setExpenseTitle(e.target.value)}
                        required
                        type="text"
                        name="expenseTitle"
                        id="expenseTitle"
                        placeholder="What is your expense?"
                        className="inputField"
                        value={expenseTitle}
                    />
                </label>
                <label htmlFor="ExpenseAmount">
                    <input
                        autoComplete="off"
                        onChange={(e) => setExpenseAmount(e.target.value)}
                        required
                        type="number"
                        name="expenseAmount"
                        id="expenseAmount"
                        placeholder="How much did you spend?"
                        className="inputField"
                        value={expenseAmount}
                    />
                </label>
                <label htmlFor="Category">
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        name="category"
                        id="category"
                        className="dropdownSelector"
                        value={category}
                    >
                        <option value="">Choose a category</option>
                        <option value="Donation">Donation</option>
                        <option value="Medical">Medical Expense</option>
                    </select>
                </label>
                <label htmlFor="FileUpload">
                    <p>Upload Receipt:</p>
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleFileChange}
                        className="imageUpload"
                    />
                    {filePreview && <img src={filePreview} alt="File Preview" />}
                </label>
                <button type="submit" className="buttonPrimary">
                    Add Expense
                </button>
            </form>
        </div>
    );
}

export default Page;
