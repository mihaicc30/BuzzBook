import React, { useEffect } from 'react'
import { FcGoogle } from "react-icons/fc";
import { VscVerifiedFilled } from "react-icons/vsc";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const nav = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  
  useEffect(() => {
    if (user) nav("/dashboard");
  }, [user, nav]);

  return (
    <div>
      
      <div className="z-10">
          <p className="text-center text-sm">Sign In</p>
          <button
            className={`text-blue-600 flex flex-nowrap gap-2 justify-center items-center border-2 font-bold bg-white/60 border-black/50 rounded-xl mx-auto p-2`}
            onClick={() => signInWithGoogle("riders")}
          >
            <FcGoogle className="text-3xl my-auto" />
          </button>
          <button
            className={`text-blue-600 flex flex-nowrap gap-2 justify-center items-center border-2 font-bold bg-white/60 border-black/50 rounded-xl mx-auto p-2 mt-2`}
            onClick={() => logInWithEmailAndPassword()}
          >
            <VscVerifiedFilled className="text-3xl my-auto" />
            Sign In with Test Account
          </button>
        </div>


    </div>
  )
}
