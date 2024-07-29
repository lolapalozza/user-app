'use client'

import {createContext, useEffect, useState} from "react";
import {authorization} from "@/services/authorization";
import Script from "next/script";
import {getUser} from "@/app/api";

export const UserContext = createContext({});

export const Auth = ({children}) => {

  const [user, setUser] = useState({})

  useEffect(() => {

    if(process.env.NEXT_PUBLIC_ENV === 'local'){
      getUser().then((_user) => {
        setUser(_user)
      })
    }else{
      authorization.init().then((data) => { // this is to set tg_query header to requests. no need for local
        if(data.result){
          getUser().then((_user) => {
            setUser(_user)
          })
        }
      })
    }

  }, []);

  return <>
    <Script src="https://telegram.org/js/telegram-web-app.js" />
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  </>
}
