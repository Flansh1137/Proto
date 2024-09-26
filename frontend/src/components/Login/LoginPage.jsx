import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminLoginForm from './AdminLoginForm';
import CustomerLoginForm from './CustomerLoginForm';

// Main Login Page with Toggle
const LoginPage = () => {
  const [isAdminLogin, setIsAdminLogin] = useState(false); // Toggle between Admin and Customer
  const navigate = useNavigate();

  const handleLogin = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            type="button"
            onClick={() => setIsAdminLogin(false)}
            className={`px-4 py-2 font-medium ${!isAdminLogin ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          >
            Customer Login
          </button>
          <button
            type="button"
            onClick={() => setIsAdminLogin(true)}
            className={`px-4 py-2 font-medium ${isAdminLogin ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          >
            Admin Login
          </button>
        </div>

        {/* Render the form based on the selected type */}
        {isAdminLogin ? (
          <AdminLoginForm onLogin={handleLogin} />
        ) : (
          <CustomerLoginForm onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
