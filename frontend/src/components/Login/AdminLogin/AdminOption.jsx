import React from 'react';
import { useNavigate } from 'react-router-dom';


const LoginSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Welcome</h2>
        <button
          onClick={() => navigate('/rtsp')}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          RTPS Login
        </button>
        <button
          onClick={() => navigate('/cloud')}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Cloud Login
        </button>
        <button
          onClick={() => window.location.href = 'https://s3.console.aws.amazon.com/s3/buckets/rtspcamera?region=ap-south-1&tab=objects'}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Redirect To S3
        </button>
      </div>
    </div>
  );
};

export default LoginSuccessPage;
