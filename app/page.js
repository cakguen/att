'use client'

import React, { useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { useAuthContext } from "@/context/AuthContext";

function Page() {
    const { user } = useAuthContext()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()
    const auth = getAuth();

    useEffect(() => {
        if (user) {
            router.push("/myexpenses");
        }
    })

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log('success: '+user)
          return router.push("/admin")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('error: '+errorMessage)
        });
    }
    return (<div className="wrapper">
        <div className="form-wrapper">
            <h1 className="mt-60 mb-30">Sign in</h1>
            <form onSubmit={handleForm} className="form">
                <label htmlFor="email">
                    <p className='formLabel'>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" className="inputField" />
                </label>
                <label htmlFor="password">
                    <p className='formLabel'>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" className="inputField" />
                </label>
                <button type="submit" className='buttonPrimary'>Sign In</button>
            </form>
        </div>

    </div>);
}

export default Page;