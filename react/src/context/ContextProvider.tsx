import { createContext, useContext, useState } from 'react';
import {
    type Dispatch,
  } from 'react';

const StateContext = createContext({
    user:null,
    token:null,
    setUser:(() => {}) as Dispatch<any>,
    setToken:(() => {}) as Dispatch<any>

})

export const ContextProvider = ({children}:any) =>{
    const
      [user, setUser] = useState<any>({}),
      [token, setToken] = useState<any>(localStorage.getItem('ACCESS_TOKON')),
      
      _setToken = (_token:any) =>{

        setToken(_token)

        if(_token){
            localStorage.setItem('ACCESS_TOKON',_token);
        }else{
            localStorage.removeItem('ACCESS_TOKON');
        }

      };


    return(
        <StateContext.Provider value={{
            user,
            token,
            setToken,
            setUser,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = ()=> useContext(StateContext)