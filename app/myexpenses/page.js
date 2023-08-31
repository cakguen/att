'use client'
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { onSnapshot } from "firebase/firestore";

import { getExpensesCollection } from "../firebase/firestore/getExpensesCollection";
import signOutUser from "../firebase/sigonout";
import ReceiptCard from '../../components/receiptCard/ReceiptCard';
import FloatingButton from '../../components/FloatingButton/FloatingButton';

function Page() {
    const { user } = useAuthContext();
    const router = useRouter();
    
    const [expenses, setExpenses] = useState([]);
    const [unsubscribe, setUnsubscribe] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        if (user === null) {
            router.push("/");
        } else {
            const userId = user?.uid;
            const expensesQuery = getExpensesCollection(userId);

            const unsubscribeFromSnapshot = onSnapshot(expensesQuery, snapshot => {
                let sumAmount = 0;
                const fetchedExpenses = snapshot.docs.map(doc => ({
                    id: doc.id,
                    title: doc.data().title,
                    amount: doc.data().amount,
                    category: doc.data().category,
                    imageUrl: doc.data()?.imageUrl
                }));
                fetchedExpenses.forEach(element => {
                    sumAmount += Number(element.amount);
                    if (!element.imageUrl) {
                        element.imageUrl = "https://e7.pngegg.com/pngimages/602/2/png-clipart-cat-dog-pet-surprised-cat-three-cats-illustration-painted-animals-thumbnail.png"
                    }
                });
                setExpenses(fetchedExpenses);
                setTotalAmount(sumAmount);
            });

            setUnsubscribe(() => unsubscribeFromSnapshot);
        }
        
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [user]);

    const handleSignOut = () => {
        signOutUser();
    };

    const routeToNewExpensePage = () => {
        router.push("/newexpense");
    }

    return (
        <div>
            <h1>Welcome {user?.email}</h1>
            <FloatingButton onClick={routeToNewExpensePage}/>
            <p>You can deduct {totalAmount} from your 2023 tax return.</p>
            {expenses.map(({ id, title, amount, category, imageUrl }) => (
                <div>
                    <ReceiptCard
                      imageUrl={imageUrl}
                      title={title}
                      amount={Number(amount)}
                      category={category ? category : "Donation"}
                      date="19.01.1992"
                    />
                  </div>
            ))}
            <button className="buttonPrimary" onClick={handleSignOut}>
                Sign out
            </button>
        </div>
    );
}

export default Page;
