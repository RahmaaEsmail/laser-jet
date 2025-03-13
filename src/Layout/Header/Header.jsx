// import React, { useEffect, useState } from 'react'
// import { FaBars, FaUser } from 'react-icons/fa6'
// import { HiOutlineTranslate } from 'react-icons/hi'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchUserProfile } from '../../features/loginSlice';
// import { useTranslation } from 'react-i18next';

// export default function Header({ setOpen , open}) {
//    const dispatch = useDispatch();
//    const [showDropDown,setShowDropDown] = useState(false);
//    const [selectedLang , setSelectedLang] = useState(localStorage?.getItem("accept-language") || "ar");
//    const {userProfileData} = useSelector(state => state?.login)
//   const {t , i18n} = useTranslation();
//    useEffect(() => {
//     dispatch(fetchUserProfile())
//    } , [dispatch])

//    useEffect(() =>{
//      localStorage.setItem("accept-language",(selectedLang))
//      i18n.changeLanguage(selectedLang);
//    },[selectedLang , i18n])

//   return (
//     <div className='bg-white shadow-lg relative px-[5vh]'>
//         <div className="flex justify-between items-center gap-1 md:gap-3 p-4">
//         <div className='flex gap-1 md:gap-3 items-center'>
//         <FaBars onClick={() => setOpen(true)} className='text-[23px] text-(--main-color)'/>
//         <img className=' w-[100px] md:w-[200px] h-[50px] object-cover' src="https://laserjet-8405a.web.app/media/logos/logo.png" />
//         </div>

//           <div className='flex gap-[5px] md:gap-[30px] items-center'>
            
            
//         <div className='flex gap-[4px] md:gap-[14px] items-center'> 
//         <h3 className='text-[15px] md:text-[20px]'>Hello, {userProfileData?.username}</h3>
//         <div className='w-[25px] h-[25px] md:w-[50px] md:h-[50px] bg-gray-400 rounded-full items-center justify-center flex'>
//             <FaUser className='text-white' />
//             </div>
//         </div>
//         <HiOutlineTranslate onClick={()=> setShowDropDown(prev => !prev)} className='text-[25px] text-(--main-color)' />
//           </div>
//         </div>

//         {showDropDown && <div className={`bg-white flex flex-col p-[2vh] rounded-md shadow-2xl w-fit absolute top-16 ${selectedLang == "ar" ? 'left-5' :'right-5'} z-20`}>
//              <p className={`p-[2vh] px-[4vh] cursor-pointer  rounded-md ${selectedLang == "ar" ?  "bg-gray-300" : "bg-transparent"}`} onClick={() => {
//               setSelectedLang("ar")
//               setShowDropDown(false)
//              }}>العربيه</p>
//              <p className={`p-[2vh] px-[4vh] cursor-pointer rounded-md ${selectedLang == "en" ? "bg-gray-300" :"bg-transparent"}`} onClick={() => {
//               setSelectedLang("en")
//               setShowDropDown(false)
//              }}>الانجليزيه</p>
//           </div>}
//     </div>
//   )
// }


import React, { useEffect, useState } from "react";
import { FaBars, FaUser } from "react-icons/fa6";
import { HiOutlineTranslate } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../features/loginSlice";
import { useTranslation } from "react-i18next";

export default function Header({ setOpen, open }) {
  const dispatch = useDispatch();
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedLang, setSelectedLang] = useState(
    localStorage?.getItem("accept-language") || "ar"
  );
  const { userProfileData } = useSelector((state) => state?.login);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("accept-language", selectedLang);
    i18n.changeLanguage(selectedLang);
  }, [selectedLang, i18n]);

  return (
    <div className="bg-white shadow-lg px-4 md:px-[30px] relative">
      <div className="flex justify-between items-center p-4">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <FaBars
            onClick={() => setOpen(true)}
            className="text-[16px] md:text-[23px] text-(--main-color) cursor-pointer"
          />
          <img
            className="w-[100px] md:w-[200px] h-[40px] md:h-[50px] object-cover"
            src="https://laserjet-8405a.web.app/media/logos/logo.png"
            alt="Logo"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 md:gap-[30px]">
          {/* Profile Info */}
          <div className="flex items-center gap-2 md:gap-[12px]">
            <h3 className="hidden sm:block">Hello, {userProfileData?.username}</h3>
            <div className="w-8 h-8 md:w-[42px] md:h-[42px] bg-gray-400 rounded-full flex items-center justify-center">
              <FaUser className="text-white text-lg" />
            </div>
          </div>

          {/* Language Switcher */}
          <HiOutlineTranslate
            onClick={() => setShowDropDown((prev) => !prev)}
            className="text:[24px] md:text-[25px] text-(--main-color) cursor-pointer"
          />
        </div>
      </div>

      {/* Language Dropdown */}
      {showDropDown && (
        <div
          className={`bg-white flex flex-col p-2 md:p-[12px] rounded-md shadow-2xl absolute top-16 z-20 ${
            selectedLang === "ar" ? "left-2 md:left-5" : "right-2 md:right-5"
          }`}
        >
          <p
            className={`p-2 px-4 md:p-[12px] md:px-[24px] cursor-pointer rounded-md ${
              selectedLang === "ar" ? "bg-gray-300" : "bg-transparent"
            }`}
            onClick={() => {
              setSelectedLang("ar");
              setShowDropDown(false);
            }}
          >
            {t("arabicText")}
          </p>
          <p
            className={`p-2 px-4 md:p-[12px] md:px-[24px] cursor-pointer rounded-md ${
              selectedLang === "en" ? "bg-gray-300" : "bg-transparent"
            }`}
            onClick={() => {
              setSelectedLang("en");
              setShowDropDown(false);
            }}
          >
            {t("englishText")}
          </p>
        </div>
      )}
    </div>
  );
}
