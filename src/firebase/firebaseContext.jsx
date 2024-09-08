import { createContext, useContext, useEffect, useState } from "react";
import { addDocument, isUserExist, onAuthChangeFunction } from './firebaseFunctions';


export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {

  const [userData, setUserData] = useState(null);

  const userGlobal = (data) => {
    setUserData(data);
  }

  useEffect(() => {
    onAuthChangeFunction(setUserData)
  }, [])

  return (
    <FirebaseContext.Provider value={{ addDocument, isUserExist, userGlobal, userData, setUserData }}>
      {children}
    </FirebaseContext.Provider>
  );
};


export const useFirebaseContext = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebaseContext must be used within a FirebaseProvider");
  }
  return context;
};
