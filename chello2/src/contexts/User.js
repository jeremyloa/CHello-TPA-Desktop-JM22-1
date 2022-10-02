import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect, createContext, useContext } from 'react';
// import { app } from '../firebase-helper';

const UserContext = createContext({user: {}})

export const UserProvider = ({children}) => {
    const [currUser, setCurrUser] = useState();

    useEffect(() => {
        onAuthStateChanged(getAuth(), (currUser) => {setCurrUser(currUser)})
    });

    return (
        <UserContext.Provider value={{currUser}}> {children} </UserContext.Provider>
    )
}

export const UseCurrUser = () => useContext(UserContext)
