import React, { useEffect, useState } from 'react'
import { FaBars, FaUser } from 'react-icons/fa6'
import { HiOutlineTranslate } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from '../../features/loginSlice';
import { useTranslation } from 'react-i18next';

export default function Header({ setOpen , open}) {
   const dispatch = useDispatch();
   const [showDropDown,setShowDropDown] = useState(false);
   const [selectedLang , setSelectedLang] = useState("ar");
   const {userProfileData} = useSelector(state => state?.login)
  const {t , i18n} = useTranslation();
   useEffect(() => {
    dispatch(fetchUserProfile())
   } , [dispatch])

   useEffect(() =>{
     localStorage.setItem("accept-language",(selectedLang))
     i18n.changeLanguage(selectedLang);
   },[selectedLang , i18n])

  return (
    <div className='bg-white shadow-lg relative px-[5vh]'>
        <div className="flex justify-between items-center gap-3 p-4">
        <div className='flex gap-3 items-center'>
        <FaBars onClick={() => setOpen(true)} className='text-[23px] text-(--main-color)'/>
        <img className='w-[200px] h-[50px] object-cover' src="https://laserjet-8405a.web.app/media/logos/logo.png" />
        </div>

          <div className='flex gap-[5vh] items-center'>
            
            
        <div className='flex gap-[2vh] items-center'> 
        <h3>Hello, {userProfileData?.username}</h3>
        <div className='w-[7vh] h-[7vh] bg-gray-400 rounded-full items-center justify-center flex'>
            <FaUser className='text-white' />
            </div>
        </div>
        <HiOutlineTranslate onClick={()=> setShowDropDown(prev => !prev)} className='text-[25px] text-(--main-color)' />
          </div>
        </div>

        {showDropDown && <div className='bg-white flex flex-col p-[2vh] rounded-md shadow-2xl w-fit absolute top-16 left-5 z-20'>
             <p className={`p-[2vh] px-[4vh] cursor-pointer  rounded-md ${selectedLang == "ar" ?  "bg-gray-300" : "bg-transparent"}`} onClick={() => setSelectedLang("ar")}>العربيه</p>
             <p className={`p-[2vh] px-[4vh] cursor-pointer rounded-md ${selectedLang == "en" ? "bg-gray-300" :"bg-transparent"}`} onClick={() => setSelectedLang("en")}>الانجليزيه</p>
          </div>}
    </div>
  )
}
