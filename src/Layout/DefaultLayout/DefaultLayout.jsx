import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import Header from '../Header/Header'
import { conifgs } from '../../config'
import LoginPage from '../../pages/LoginPage/LoginPage'

export default function DefaultLayout({children}) {
   const [open , setOpen] = useState(false)
   const userToken = localStorage.getItem(conifgs.localStorageTokenName);
   if(!userToken) {
      return <LoginPage />
   }
   
  return ( 
    <div className='flex'>

         <div className={`flex flex-col  w-full`}>
            <Header setOpen={setOpen} open={open}/>
             <SideBar open={open} setOpen={setOpen}/>
            <main className='m-5'>
               {children}
            </main>
         </div>
    </div>
  )
}
