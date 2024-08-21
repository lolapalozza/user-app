'use client'

import {createContext, useEffect, useState} from "react";
import {authorization} from "@/services/authorization";
import {getUser} from "@/app/api";
import Script from "next/script";

export const UserContext = createContext({});

export const Auth = ({children}) => {

  const [user, setUser] = useState({})
  const [userLoading, setLoading] = useState(false)

  useEffect(() => {

    setLoading(true)

    if(process.env.NEXT_PUBLIC_ENV === 'local'){
      getUser().then((_user) => {
        setUser(_user)
        setLoading(false)
      })
    }else{
      authorization.init().then((data) => { // this is to set tg_query header to requests. no need for local
        if(data.result){
          getUser().then((_user) => {
            setUser(_user)
          }).catch((e) =>{
            console.log(e)
          }).finally(() => {
            setLoading(false)
          })
        }
      })
    }

  }, []);

  return <>
    <Script src="https://telegram.org/js/telegram-web-app.js" />
    <UserContext.Provider value={{ user, userLoading }}>
      {children}
    </UserContext.Provider>
  </>
}
