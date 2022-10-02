import { createUserWithEmailAndPassword, getAuth, updateCurrentUser, updateProfile } from "firebase/auth";
import { addDoc, collection} from "firebase/firestore";
import { useRef } from "react";
import app,{db} from '../firebase-helper'
import { Link, useNavigate } from "react-router-dom"

export default function Register() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const auth = getAuth(app);
    function createAccount(e){
        e.preventDefault();
        const regisName = nameRef.current.value;
        const regisEmail = emailRef.current.value;
        const regisPass = passwordRef.current.value;
        console.log(regisName + " " + regisEmail + " " + regisPass);
        createUserWithEmailAndPassword(auth, regisEmail, regisPass)
        .then( (userCredential)=>{
          const user = userCredential.user;
          updateProfile(user, {displayName: regisName}).catch((error)=>{console.log(error)})
            console.log(user)
          try {
                let docRef = addDoc(collection(db, "MasterUser"), {
                    Name: regisName,
                    UUID: user.uid
                })
                console.log(docRef.id);
                navigate("/login")
            } catch (error) {
                console.log(error);
            }
          })
          .catch((error)=>{
          console.log(error.code + " " + error.message)
      })
    }

    return (
      <div className="min-h-screen bg-white flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-12 w-auto"
                src="/src/logo.svg"
                alt="Logo"
              />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Register new account</h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{' '}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">sign in here</Link>
              </p>
            </div>
  
            <div className="mt-8">
              <div className="mt-6">
                <form action="#" method="POST" className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        name="name"
                        type="name"
                        autoComplete="name"
                        ref={nameRef}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        ref={emailRef}
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
  
                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        ref={passwordRef}
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
  
                  <div className="space-y-1">
                    <button
                      type="submit"
                      onClick={createAccount}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    )
  }