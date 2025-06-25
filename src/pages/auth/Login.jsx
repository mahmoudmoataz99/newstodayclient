import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', Password: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.Password.trim()) {
      newErrors.Password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const res = await axios.post('https://news-today-api.vercel.app/auth/login', formData);
      setMessage('Login successful!');
      setIsError(false);
      setUser(res.data.user); 
      navigate('/');
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Login failed';
      setMessage(errMsg);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-lg mx-auto my-10 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
 
    {message && (
     <div
      className={`text-center p-3 mb-4 rounded-lg ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
       }`}
      role="alert"
     >
      {message}
     </div>
    )}
 
    <form onSubmit={handleSubmit} className="space-y-4">
     <div>
      <label htmlFor="email" className="block text-gray-700 mb-1">
       Email <span className="text-red-500">*</span>
      </label>
      <input
       type="email"
       id="email"
       name="email"
       value={formData.email}
       onChange={handleChange}
       className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
        } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
       aria-invalid={!!errors.email}
       aria-describedby={errors.email ? "email-error" : undefined}
      />
      {errors.email && (
       <p id="email-error" className="text-red-500 text-sm mt-1">
        {errors.email}
       </p>
      )}
     </div>
 
     <div>
      <label htmlFor="Password" className="block text-gray-700 mb-1">
       Password <span className="text-red-500">*</span>
      </label>
      <input
       type="password"
       id="Password"
       name="Password"
       value={formData.Password}
       onChange={handleChange}
       className={`w-full p-2 border ${errors.Password ? 'border-red-500' : 'border-gray-300'
        } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
       aria-invalid={!!errors.Password}
       aria-describedby={errors.Password ? "Password-error" : undefined}
      />
      {errors.Password && (
       <p id="Password-error" className="text-red-500 text-sm mt-1">
        {errors.Password}
       </p>
      )}
     </div>
 
     <div className="text-sm text-gray-600">
      Don't have an account?{' '}
      <Link to="/signup" className="text-blue-500 hover:underline">
       Create One
      </Link>
     </div>
 
     <button
      type="submit"
      disabled={isLoading}
      className={`w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
       }`}
     >
      {isLoading ? (
       <span className="flex items-center justify-center">
        <svg
         className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
        >
         <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
         ></circle>
         <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
         ></path>
        </svg>
        Processing...
       </span>
      ) : (
       'Login'
      )}
     </button>
    </form>
   </section>
  );
};

export default Login;