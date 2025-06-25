import React, { useContext, useReducer, useEffect } from 'react';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialState = {
  formData: {
    First_Name: '',
    Last_Name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
  errors: {},
  isLoading: false,
  message: { text: '', isError: false },
  showDeleteConfirm: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FORM':
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'CLEAR_ERRORS':
      return { ...state, errors: {} };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_MESSAGE':
      return { ...state, message: action.payload };
    case 'CLEAR_MESSAGE':
      return { ...state, message: { text: '', isError: false } };
    case 'RESET_FORM':
      return {
        ...state,
        formData: {
          ...state.formData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        },
      };
    case 'SET_SHOW_DELETE':
      return { ...state, showDeleteConfirm: action.payload };
    default:
      return state;
  }
}

const Settings = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (user) {
      dispatch({
        type: 'SET_FORM',
        payload: {
          First_Name: user.First_Name,
          Last_Name: user.Last_Name,
          email: user.email,
        },
      });
    }
  }, [user]);

  const validateForm = (isPasswordChange = false) => {
    const { First_Name, Last_Name, email, currentPassword, newPassword, confirmPassword } = state.formData;
    const newErrors = {};

    if (!First_Name.trim()) newErrors.First_Name = 'First name is required';
    if (!Last_Name.trim()) newErrors.Last_Name = 'Last name is required';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Valid email is required';

    if (isPasswordChange) {
      if (!currentPassword) newErrors.currentPassword = 'Current password is required';
      if (newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters';
      if (newPassword !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    dispatch({ type: 'SET_ERRORS', payload: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    dispatch({ type: 'SET_FORM', payload: { [e.target.name]: e.target.value } });
    if (state.errors[e.target.name]) {
      dispatch({ type: 'SET_ERRORS', payload: { ...state.errors, [e.target.name]: '' } });
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm(false)) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await axios.put(
        `https://news-today-api.vercel.app/user/${user._id}`,
        {
          First_Name: state.formData.First_Name,
          Last_Name: state.formData.Last_Name,
          email: state.formData.email,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      dispatch({ type: 'SET_MESSAGE', payload: { text: 'Profile updated successfully!', isError: false } });
    } catch (error) {
      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          text: error?.response?.data?.message || 'Failed to update profile',
          isError: true,
        },
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!validateForm(true)) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      await axios.put(
        `https://news-today-api.vercel.app/user/${user._id}`,
        { Password: state.formData.newPassword },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      dispatch({ type: 'SET_MESSAGE', payload: { text: 'Password changed successfully!', isError: false } });
      dispatch({ type: 'RESET_FORM' });
    } catch (error) {
      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          text: error?.response?.data?.message || 'Failed to change password',
          isError: true,
        },
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // const handleAccountDelete = async () => {
  //   if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return;

  //   dispatch({ type: 'SET_LOADING', payload: true });

  //   try {
  //     await axios.delete('https://news-today-api.vercel.app/user/delete-account', {
  //       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  //     });

  //     localStorage.clear();
  //     setUser(null);
  //     navigate('/');
  //   } catch (error) {
  //     dispatch({
  //       type: 'SET_MESSAGE',
  //       payload: {
  //         text: error?.response?.data?.message || 'Failed to delete account',
  //         isError: true,
  //       },
  //     });
  //   } finally {
  //     dispatch({ type: 'SET_LOADING', payload: false });
  //   }
  // };

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold mb-4">Please log in to access settings</h2>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const { formData, errors, isLoading, message, showDeleteConfirm } = state;

  return (
    <div className="max-w-4xl mx-auto my-10 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h1>

      {message.text && (
        <div className={`p-3 mb-6 rounded-lg ${message.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}

      {/* Profile Update */}
      <form onSubmit={handleProfileUpdate} className="bg-white rounded-lg shadow-md p-6 mb-8 space-y-4">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['First_Name', 'Last_Name'].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 mb-1">
                {field.replace('_', ' ')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full p-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded`}
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <button disabled={isLoading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-70">
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      {/* Password Change */}
      <form onSubmit={handlePasswordChange} className="bg-white rounded-lg shadow-md p-6 mb-8 space-y-4">
        <h2 className="text-xl font-semibold">Change Password</h2>
        {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
          <div key={field}>
            <label className="block text-gray-700 mb-1">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="password"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={`w-full p-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
          </div>
        ))}
        <button
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-70"
        >
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </form>

      {/* Delete Account */}
      {/* <div className="bg-white rounded-lg shadow-md p-6 border border-red-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Delete Account</h2>
        <p className="text-gray-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
        {showDeleteConfirm ? (
          <div className="space-y-4">
            <p className="text-red-600 font-medium">Are you sure you want to delete your account?</p>
            <div className="flex gap-3">
              <button onClick={handleAccountDelete} disabled={isLoading} className="bg-red-600 text-white px-4 py-2 rounded">
                {isLoading ? 'Deleting...' : 'Yes, Delete My Account'}
              </button>
              <button onClick={() => dispatch({ type: 'SET_SHOW_DELETE', payload: false })} className="bg-gray-200 text-gray-800 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => dispatch({ type: 'SET_SHOW_DELETE', payload: true })} className="text-red-600 border border-red-600 px-4 py-2 rounded">
            Delete Account
          </button>
        )}
      </div> */}
    </div>
  );
};

export default Settings;
