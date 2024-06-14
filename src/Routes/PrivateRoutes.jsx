/* eslint-disable no-unused-vars */
import { useAuthState } from "react-firebase-hooks/auth";

import { Navigate } from "react-router-dom";
import auth from "../Firebase/firebase.config";


// eslint-disable-next-line react/prop-types
export default function PrivateRooutes({children}) {
  const [user,loading]=useAuthState(auth);
  if(loading){
    return <div className="flex items-center justify-center h-screen"><span className="loading loading-spinner loading-lg text-center"></span></div>
  }
  if(!user){
    return <Navigate to="/login"/>
  }


    return children;
}