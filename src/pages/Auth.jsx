import React, { useEffect } from "react"
import { FcGoogle } from "react-icons/fc"
import { VscVerifiedFilled } from "react-icons/vsc"
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebaseConfig"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"

export default function Auth() {
  const nav = useNavigate()
  const [user, loading, error] = useAuthState(auth)

  useEffect(() => {
    if (user) nav("/dashboard")
  }, [user, nav])

  return (
    <div className=" flex flex-col z-10 overflow-auto">
      <div className="w-full flex justify-center items-center mt-4">
        <img src="./assets/ic.png" alt="Logo" className="h-auto w-[300px]" />
      </div>
      <div className="flex flex-col justify-center items-center my-2 py-2">
        <h1 className="text-center text-[4rem] tracking-widest leading-[40px] text-[#181831] ff">Buzz</h1>
        <h1 className="text-center text-[2.4rem] tracking-widest leading-[40px] text-[#B74216]">
          <span>-</span>
          <span className="ff">BOOK</span>
          <span>-</span>
        </h1>
      </div>
      <p className="text-center text-sm">Sign In</p>
      <button className={`text-blue-600 flex flex-nowrap gap-2 justify-center items-center border-2 font-bold bg-white/60 border-black/50 rounded-xl mx-auto p-2`} onClick={() => signInWithGoogle("riders")}>
        <FcGoogle className="text-3xl my-auto" />
      </button>
      <button className={`text-blue-600 flex flex-nowrap gap-2 justify-center items-center border-2 font-bold bg-white/60 border-black/50 rounded-xl mx-auto p-2 mt-2`} onClick={() => logInWithEmailAndPassword()}>
        <VscVerifiedFilled className="text-3xl my-auto" />
        Sign In with Test Account
      </button>

      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
      <p className="opacity-[0] scale-[0.8] ani">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum facere enim officiis possimus? Vel accusantium dicta rerum eaque ratione nulla officia modi quasi quo iure assumenda, suscipit adipisci, aliquid reprehenderit?</p>
    </div>
  )
}
