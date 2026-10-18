// frontend/user-app/src/app/page.tsx
'use client'
// import Login from '@packages/ui-kit/src/auth/Login'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authSdk } from '@packages/auth-sdk';
import { motion } from "framer-motion";
import { FaPhone, FaCar, FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";
export default function HomePage() {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authSdk.sendCode({ mobile });
      router.push(`/verify/${mobile}`);
    } catch (error) {
      alert('خطا در ارسال کد');
    } finally {
      setLoading(false);
    }
  };

  return (
       <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-blue-200 text-black w-full">
         <main className="flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-16 py-8">
         {/* بخش سمت چپ - توضیحات */}
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
                  <FaCar className="text-green-400 text-xl " />
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
        {/* بخش سمت راست - فرم لاگین */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:w-1/2 max-w-md w-full"
        >
          <div className="text-black  rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-green-400 p-3 rounded-full">
                <FaPhone className="text-2xl text-gray-100" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">
              ورود / ثبت‌نام
            </h2>
            <p className="text-gray-700 text-center mb-8">
              برای ادامه، شماره موبایل خود را وارد کنید
            </p>
            <form onSubmit={handleSendCode}>
              <div className="mb-6">
                <label
                  htmlFor="mobile"
                  className="block text-right mb-2 text-gray-900"
                >
                  شماره موبایل <span>09123456789</span>
                </label>
                <div className="flex">
                  <div className="relative flex-shrink-0">
                    {/* <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="h-full bg-gray-200/50 border-l border-gray-600 rounded-r-lg p-4 appearance-none  focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      <option value="+98">+98 (ایران)</option>
                    </select> */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-400">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="912 345 6789"
                    className="w-full h-full bg-gray-200/50 border border-gray-50 rounded-l-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    dir="ltr"
                  />
                </div>



                <p className="text-gray-500 text-sm mt-2 text-right">
                  کد تأیید برای این شماره پیامک خواهد شد
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !mobile }
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 text-gray-50 ${
                  loading || !mobile
                    ? "bg-gray-950 cursor-not-allowed "
                    : "bg-green-400 hover:bg-green-500 text-gray-100"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    در حال ارسال کد...
                  </span>
                ) : (
                  "دریافت کد تأیید"
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-sm text-center">
                با ادامه، شما با{" "}
                <span className="text-green-400">شرایط استفاده</span> و{" "}
                <span className="text-green-400">سیاست حفظ حریم خصوصی</span> ما
                موافقت می‌کنید
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button className="text-gray-400 hover:text-white transition text-sm">
              مشکل در ورود دارید؟
            </button>
          </div>
        </motion.div>
        
      </main>
    </div>
  );
}
