import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
 const [formData, setFormData] = useState({
  First_Name: '',
  Last_Name: '',
  email: '',
  Password: '',
  confirmPassword: '',
 });

 const [message, setMessage] = useState('');
 const [isError, setIsError] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [errors, setErrors] = useState({});
 const navigate = useNavigate();

 const validateForm = () => {
  const newErrors = {};

  if (!formData.First_Name.trim()) {
   newErrors.First_Name = 'First name is required';
  }

  if (!formData.Last_Name.trim()) {
   newErrors.Last_Name = 'Last name is required';
  }

  if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
   newErrors.email = 'Valid email is required';
  }

  if (!formData.Password.trim()) {
   newErrors.Password = 'Password is required';
  }

  if (formData.Password !== formData.confirmPassword) {
   newErrors.confirmPassword = 'Passwords do not match';
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
   await axios.post('https://news-today-api.vercel.app/auth/signup', formData);
   setMessage('Signup successful! Redirecting to login...');
   setIsError(false);

   setTimeout(() => navigate('/login'), 1500);
  } catch (error) {
   const errMsg = error.response?.data?.message || 'Signup failed';
   setMessage(errMsg);
   setIsError(true);
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <section className="max-w-lg mx-auto my-10 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
   <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

   {message && (
    <div className={`text-center p-3 mb-4 rounded-lg ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`} role="alert">
     {message}
    </div>
   )}

   <form onSubmit={handleSubmit} className="space-y-4">

    <div>
     <label htmlFor="First_Name" className="block text-gray-700 mb-1">
      First Name <span className="text-red-500">*</span>
     </label>
     <input type="text" id="First_Name" name="First_Name" value={formData.First_Name} onChange={handleChange}
      className={`w-full p-2 border ${errors.First_Name ? 'border-red-500' : 'border-gray-300'} rounded`} />
     {errors.First_Name && <p className="text-red-500 text-sm">{errors.First_Name}</p>}
    </div>

    <div>
     <label htmlFor="Last_Name" className="block text-gray-700 mb-1">
      Last Name <span className="text-red-500">*</span>
     </label>
     <input type="text" id="Last_Name" name="Last_Name" value={formData.Last_Name} onChange={handleChange}
      className={`w-full p-2 border ${errors.Last_Name ? 'border-red-500' : 'border-gray-300'} rounded`}
     />
     {errors.Last_Name && <p className="text-red-500 text-sm">{errors.Last_Name}</p>}
    </div>

    <div>
     <label htmlFor="email" className="block text-gray-700 mb-1">
      Email <span className="text-red-500">*</span>
     </label>
     <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
      className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`} />
     {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
    </div>

    <div>
     <label htmlFor="Password" className="block text-gray-700 mb-1">
      Password <span className="text-red-500">*</span>
     </label>
     <input type="password" id="Password" name="Password" value={formData.Password} onChange={handleChange}
      className={`w-full p-2 border ${errors.Password ? 'border-red-500' : 'border-gray-300'} rounded`} />
     {errors.Password && <p className="text-red-500 text-sm">{errors.Password}</p>}
    </div>

    <div>
     <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">
      Confirm Password <span className="text-red-500">*</span>
     </label>
     <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
      className={`w-full p-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded`} />
     {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
    </div>

    <div className="text-sm text-gray-600">
     Already have an account?{' '}
     <Link to="/login" className="text-blue-500 hover:underline">
      Login
     </Link>
    </div>

    <button type="submit" disabled={isLoading}
     className={`w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
     {isLoading ? (
      <span className="flex items-center justify-center">
       <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
       </svg>
       Processing...
      </span>
     ) : (
      'Sign Up'
     )}
    </button>
   </form>
  </section>
 );
};

export default SignupPage;
