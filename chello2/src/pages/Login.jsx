import { getAuth, signInWithEmailAndPassword, updateCurrentUser, updateProfile } from "firebase/auth";
import { collection, onSnapshot, query, where} from "firebase/firestore";
import { useRef } from "react";
import app, {db} from '../firebase-helper'
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const auth = getAuth(app);
    const navigate = useNavigate();
    const colRef = collection(db, 'MasterUser')
    function goLogin(e){
        e.preventDefault();
        const loginEmail = emailRef.current.value;
        const loginPass = passwordRef.current.value;
        console.log(loginEmail + " " + loginPass);
        signInWithEmailAndPassword(auth, loginEmail, loginPass).then((userCredential)=>{
            const user = userCredential.user;
            try {
              const name = user.displayName;
              console.log(name);
            //   const q = query(colRef, where("UUID", "==", user.uid))
            //   onSnapshot(q, (snapshot)=>{
            //     let users = []
            //     snapshot.docs.forEach((doc)=>{
            //       users.push({...doc.data(), id:doc.id})
            //     })
            //     console.log(users[0].Name)
            //     updateProfile(user, {displayName: users[0].Name}).catch((error)=>{
            //         console.log(error)})
            //     // updateProfile(auth.currentUser, {displayName: users[0].Name}).catch((error)=>{
            //     //   console.log(error)
            //     // })
            //   })
              navigate("/app/home")
            } catch (error) {
              console.log(error)
            }
        }).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " " + errorMessage);
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
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{' '}
                <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">register here</Link>
              </p>
            </div>
  
            <div className="mt-8">
              <div className="mt-6">
                <form action="#" method="POST" className="space-y-6">
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
  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>
  
                    <div className="text-sm">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                      </a>
                    </div>
                  </div>
  
                  <div>
                    <button
                      type="submit"
                      onClick={goLogin}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in
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