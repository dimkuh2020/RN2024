import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext(); // созд контекст

export const useGlobalContext = () => useContext(GlobalContext); //просто калбэк чтобыиспользовать контекст

const GlobalProvider = ({ children }) => { //сам провайдер
  //шо будем менять
  const [isLogged, setIsLogged] = useState(false); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  
  
  useEffect (() => { // тут вся логика для работы в GlobalProvider
    getCurrentUser()
      .then((res) => {
        if (res) { //успех
          setIsLogged(true);
          setUser(res);        
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error)=> { //неудача
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      }) 
  }, [])

  return(
    <GlobalContext.Provider
        value={{   //типы значений
            isLogged,
            setIsLogged,
            user,
            setUser,
            loading,
        }}
    
    >
        {children}
    </GlobalContext.Provider>
  )  
}

export default GlobalProvider