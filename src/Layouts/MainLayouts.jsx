import { Link, Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { Sling as Hamburger } from 'hamburger-react'
import Footer from "../Pages/Shared/Footer";
import auth from "../Firebase/firebase.config";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

function MainLayouts() {
  const [isOpen, setOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
      const handleClickOutside = (event) => {
          if (
              sidebarRef.current &&
              !sidebarRef.current.contains(event.target) &&
              buttonRef.current &&
              !buttonRef.current.contains(event.target)
          ) {
              setOpen(false);
          }
      };

      if (isOpen) {
          document.addEventListener('mousedown', handleClickOutside);
      } else {
          document.removeEventListener('mousedown', handleClickOutside);
      }

      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, [isOpen]);

  const handleMenuButtonClick = (event) => {
      event.stopPropagation();
      setOpen(!isOpen);
  };



  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
const handleLogout=async()=>{
  const success = await signOut();
  if(success){
    toast.success("signed out")
  }
}
  return (
    
    <>
      <div className="flex h-screen flex-col ">
        <header className="bg-neutral text-neutral-content p-4 flex justify-between items-center relative z-30  ">
          <div ref={buttonRef} className="md:hidden" onClick={handleMenuButtonClick}>
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </div>
          <h1 className="text-lg">E-Ticket</h1>
        </header>
        <div className="flex flex-1 ">
          <div
            ref={sidebarRef}
            className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-neutral text-neutral-content p-4 w-64 z-20 md:relative md:translate-x-0 md:flex md:flex-col   `}
          >
            <nav className="mt-14 sticky top-0">
              <Link to={"/"} className="block px-4 py-2 text-white">Home</Link>
        
              {
                !user ? <><Link to={'/login'} href="#" className="block px-4 py-2 text-white">Login</Link>
                <Link to={'/Register'} href="#" className="block px-4 py-2 text-white">Register</Link> </>
                :
                <>
                <Link to={'/payment'} href="#" className="block px-4 py-2 text-white">payment</Link>
              <button onClick={handleLogout} className="block px-4 py-2 text-white">logout</button>
              </>
              }
              
            </nav>
          </div>
          <main className="flex-1 p-4">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MainLayouts;
