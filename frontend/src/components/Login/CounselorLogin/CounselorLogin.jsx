import React from 'react';
import { useNavigate } from 'react-router-dom';

function CounselorLogin() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/'); // Go back to the previous page in history
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-4 md:mx-6 lg:mx-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Admission Details</h1>
          {/* Back Button */}
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleBack}
          >
            Back
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-around mt-8">
          <div className="text-center mb-4 md:mb-0">
            <div className="mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => navigate('/new-registration')}
              >
                New Registration
              </button>
            </div>
          </div>

          <div className="text-center mb-4 md:mb-0">
            <div className="mb-4">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => navigate('/main-program')}
              >
                Main Program
              </button>
            </div>
          </div>

          <div className="text-center mb-4 md:mb-0">
            <div className="mb-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => navigate('/data-analysis')}
              >
                Data Analysis
              </button>
            </div>
          </div>
          {/* <div className="text-center mb-4 md:mb-0">
            <div className="mb-4">
              <button
                className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => navigate('/view-data')}
              >
                View Data
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default CounselorLogin;
