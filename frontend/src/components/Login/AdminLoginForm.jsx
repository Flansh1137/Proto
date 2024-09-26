// src/pages/AdminLoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AdminLoginForm = ({ onLogin }) => {
  const [bucketName, setBucketName] = useState('');
  const [cloudFrontDomain, setCloudFrontDomain] = useState('');
  const [cloudAccessKeyId, setCloudAccessKeyId] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const [regionName, setRegionName] = useState('');
  const [rtspUrl, setRtspUrl] = useState('');
  const [showSecretAccessKey, setShowSecretAccessKey] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const adminDetails = {
      bucketName,
      cloudFrontDomain,
      cloudAccessKeyId,
      secretAccessKey,
      regionName,
      rtspUrl,
    };

    try {
      await axios.post('http://localhost:5000/save-admin-details', adminDetails);
      onLogin('/admin-dashboard');
    } catch (err) {
      setError('Error saving admin details');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Admin Login</h2>
      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Cloud Settings</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Bucket Name:</label>
            <input
              type="text"
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">CloudFront Domain URL:</label>
            <input
              type="text"
              value={cloudFrontDomain}
              onChange={(e) => setCloudFrontDomain(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Cloud Access Key ID:</label>
            <input
              type="text"
              value={cloudAccessKeyId}
              onChange={(e) => setCloudAccessKeyId(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700">Secret Access Key:</label>
            <div className="relative mt-1">
              <input
                type={showSecretAccessKey ? 'text' : 'password'}
                value={secretAccessKey}
                onChange={(e) => setSecretAccessKey(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              />
              <button
                type="button"
                onClick={() => setShowSecretAccessKey(!showSecretAccessKey)}
                className="absolute inset-y-0 right-0 px-3 py-2 text-sm font-medium text-gray-500"
              >
                {showSecretAccessKey ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Region Name:</label>
            <input
              type="text"
              value={regionName}
              onChange={(e) => setRegionName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-4">Camera Settings</h3>
          <div className="mb-4">
            <label className="block text-gray-700">RTSP URL:</label>
            <input
              type="text"
              value={rtspUrl}
              onChange={(e) => setRtspUrl(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginForm;
