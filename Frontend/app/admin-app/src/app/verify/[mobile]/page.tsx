// Frontend/app/admin-app/src/app/verify/[mobile]/page.tsx 
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { motion } from "framer-motion";
import { FaCableCar } from 'react-icons/fa6';
import { FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '@packages/auth-store/src/useAuth';

// import { KeyIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
export default function VerifyPage() {
  const [number, setNumber] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(120);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

    const { mobile } = useParams();
  const { login, isLoading } = useAuth();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...number];
    newCode[index] = value;
    setNumber(newCode);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !number[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(120);
    alert('کد جدید برای شماره ' + mobile + ' ارسال شد.');
  };
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
     const code = number.join('');
    if (code.length !== 6) return;
    
    try {
      const response = await login(mobile as string,  code );
      console.log('response',response)
      
    } catch (error) {
      
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-blue-200 text-black w-full">


       <main className="flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-16 py-8">
{/* //         بخش سمت چپ - توضیحات */}
         <div className="lg:w-1/2 mb-12 lg:mb-0 text-right">
           <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
             اعتماد در تحویل کارها،
              <span className="text-green-400 block">تجربه‌ای بی‌نظیر</span>
            </h1>

            <p className="text-gray-500 text-lg mb-8 max-w-lg">
              به بزرگ‌ترین پلتفرم خدمات منزل و تحویل کارها به ایجنت ها خوش آمدید.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-gray-800 p-3 rounded-full ">
                  <FaCableCar className="text-green-400 text-xl " />
                </div>
                <div className="mx-2">
                  <h3 className="font-bold text-lg">درخواست تسکر</h3>
                  <p className="text-gray-400">سریع و آسان تعمییرات خود را انجام دهید</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-gray-800 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-green-400 text-xl" />
                </div>
               <div className="mx-2">
                  <h3 className="font-bold text-lg">ردیابی لحظه‌ای</h3>
                  <p className="text-gray-400">
                    موقعیت و تکمیل فرآیند کارها را لحظه ای دنبال کنید
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-gray-800 p-3 rounded-full">
                  <FaShieldAlt className="text-green-400 text-xl" />
                </div>
                <div className="mx-2">
                  <h3 className="font-bold text-lg">تضمین کارها</h3>
                  <p className="text-gray-400">
                    تمام کاهای خود را به متخصصین بسپارید
                  </p>
                </div>
              </div>
            </div>

            <div className="text-gray-400 text-sm">
              <p>
                با ورود یا ثبت‌نام، با{" "}
                <span className="text-green-400">قوانین و مقررات</span> موافقت
                می‌کنید
              </p>
            </div>
          </motion.div>
        
    </div>
          <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:w-1/2 max-w-md w-full"
        >
        {/* بخش سمت راست - فرم لاگین */}
          <div className="text-center mb-8">
             <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-200 mb-4">
               {/* <KeyIcon className="h-10 w-10" /> */}
             </div>
             <h1 className="text-3xl font-bold text-gray-900 mb-1">کد تأیید</h1>
             <p className="text-gray-500">کد ۶ رقمی ارسال‌شده به شماره</p>
             <p className="font-medium text-gray-800 mt-1" dir="ltr">{mobile}</p>
           </div>

           <form onSubmit={handleVerify} className="space-y-6">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                 کد تأیید را وارد کنید
               </label>
               <div className="flex justify-center gap-3 rtl:flex-row-reverse">
                 {number.map((digit, index) => (
                   <input
                     key={index}
                     type="text"
                     inputMode="numeric"
                     pattern="\d*"
                     maxLength={1}
                     ref={el => { inputRefs.current[index] = el; }}
                     value={digit}
                     onChange={e => handleChange(index, e.target.value)}
                     onKeyDown={e => handleKeyDown(index, e)}
                     className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-2xl bg-gray-50/50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all text-gray-900"
                     required
                   />
                 ))}
               </div>
               {/* Slogan below the code inputs */}
               <div className="mt-4 text-center">
                 <span className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full border border-primary-200">
                   امن و مطمئن
                 </span>
               </div>
             </div>

             <button
               type="submit"
               disabled={isLoading || number.join('').length !== 6}
               className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white py-4 rounded-2xl font-medium shadow-lg shadow-primary-200 hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
             >
               {isLoading ? (
                 <span>در حال بررسی...</span>
               ) : (
                 <>
                   <span>تأیید و ورود</span>
                   {/* <ArrowLeftIcon className="h-5 w-5" /> */}
                 </>
               )}
             </button>

             <div className="text-center">
               {timer > 0 ? (
                 <p className="text-sm text-gray-500">
                   دریافت مجدد کد تا {formatTime(timer)} دیگر
                 </p>
               ) : (
                 <button
                   type="button"
                   onClick={handleResend}
                   className="text-sm font-medium text-primary-600 hover:text-primary-700"
                 >
                   ارسال مجدد کد
                 </button>
               )}
             </div>
           </form>

           <button
             onClick={() => router.back()}
             className="mt-6 flex w-full items-center justify-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
           >
            {/* <ArrowLeftIcon className="h-4 w-4" /> */}
             <span>ویرایش شماره موبایل</span>
           </button>
          </motion.div>
        
      </main>
    </div>
  );
}


// // frontend/app/admin-app/src/app/verify/[mobile]/page.tsx
// 'use client';
// import { useState } from 'react';
// import { useParams } from 'next/navigation';
// import { useAuth } from '@packages/auth-store/src/useAuth';

// export default function VerifyPage() {
//   const { mobile } = useParams();
//   const [code, setCode] = useState('');
//   const { login, isLoading } = useAuth();
// console.log('mobile',mobile)
// console.log('login',login)
// console.log('isLoading',isLoading)
//   const handleVerify = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const result = await login(mobile as string, code);
//     console.log('result',result)
//     if (!result.success) {
//       alert(result.error);
//     }
//   };

//   return (
//     <form onSubmit={handleVerify}>
//       <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="کد تأیید" />
//       <button type="submit" className='bg-amber-500'>تأیید</button>
//     </form>
//   );
// }