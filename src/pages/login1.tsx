import  { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import LoginIcon from '@mui/icons-material/Login';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { Server } from '../constants/config';
import { useDispatch, UseDispatch } from 'react-redux';
import { userExited } from '../redux/reducers/auth';

interface LoginSchema {
  email: string;
  password: string;
}

function AdminLogin() {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchema>();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme === 'dark');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);
const dispatch =  useDispatch()


  const handleFormSubmit = async (data: LoginSchema) => {
    setLoadingBtn(true);
    try {
      // Replace with your actual backend login URL
      const adminLogin = await axios.post(`${Server}admin/login`, {
        email: data.email,
        password: data.password
      });
      if(adminLogin.status >= 200 && adminLogin.status <=300){
        
      }
      dispatch(userExited(adminLogin.data))
      console.log(adminLogin);
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="min-h-screen w-full flex items-center justify-center pt-16">
        <div className="w-full max-w-md px-8 py-10 mx-4">
          <div className={`w-full ${isDark ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-xl rounded-3xl shadow-xl p-8 border ${isDark ? 'border-gray-700/50' : 'border-gray-200'}`}>
            <div className="mb-8 text-center">
              <div className={`w-20 h-20 ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <LoginIcon className={`h-10 w-10 ${isDark ? 'text-white' : 'text-gray-900'}`} />
              </div>
              <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                Admin Login
              </h2>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Sign in to access the admin panel
              </p>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EmailIcon className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl ${isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'} border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                  })}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl ${isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'} border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long'
                    }
                  })}
                />
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loadingBtn}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-medium transition flex items-center justify-center space-x-2 disabled:opacity-70 group"
              >
                {loadingBtn ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowForwardIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
