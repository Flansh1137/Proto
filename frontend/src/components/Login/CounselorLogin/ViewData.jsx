import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const ViewData = () => {
  const [newRegistration, setNewRegistration] = useState([]);
  const [dataAnalysis, setDataAnalysis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    axios.get('/newRegistration.json')
      .then(response => {
        setNewRegistration(response.data);
      })
      .catch(error => {
        console.error('Error fetching new registration data:', error);
      });
  }, []);

  const fetchData = async (endpoint) => {
    setLoading(true);
    setActiveTab(endpoint);

    try {
      const response = await axios.get(`http://localhost:5000/${endpoint}`);
      if (endpoint === 'get-new-registration') {
        setNewRegistration(response.data);
      } else if (endpoint === 'get-data-analysis') {
        setDataAnalysis(response.data);
      }
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }

    setLoading(false);
  };

  const filterBySearchAndDate = (items) => {
    return items.filter(item => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const matchesSearchTerm = Object.values(item).some(value =>
        String(value).toLowerCase().includes(lowerCaseSearchTerm)
      );

      if (activeTab === 'get-data-analysis' && startDate && endDate) {
        const [dayStart, monthStart, yearStart] = item.startDate.split('/').map(Number);
        const [dayEnd, monthEnd, yearEnd] = item.endDate.split('/').map(Number);
        const itemStartDate = new Date(yearStart, monthStart - 1, dayStart);
        const itemEndDate = new Date(yearEnd, monthEnd - 1, dayEnd);

        const matchesDateRange = itemStartDate >= startDate && itemEndDate <= endDate;
        return matchesSearchTerm && matchesDateRange;
      }

      return matchesSearchTerm;
    });
  };

  const renderItems = (items) => (
    <div className="space-y-4">
      {filterBySearchAndDate(items).map((item, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="border-b pb-3 mb-3">
            <p className="text-lg font-semibold text-gray-800"><strong>ID:</strong> {item.id}</p>
            <p className="text-lg font-semibold text-gray-800"><strong>Name:</strong> {item.name}</p>
          </div>
          <div className="space-y-2">
            {Object.entries(item).map(([key, value]) => (
              key !== 'id' && key !== 'name' && !key.startsWith('image_') && (
                <p key={key} className="text-gray-700"><strong>{key}:</strong> {value}</p>
              )
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const selectionRange = {
    startDate: startDate || new Date(),
    endDate: endDate || new Date(),
    key: "selection"
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">View Data</h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <button
            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeTab === 'get-new-registration' ? 'bg-blue-700' : ''}`}
            onClick={() => fetchData('get-new-registration')}
          >
            View Registration
          </button>

          <button
            className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${activeTab === 'get-data-analysis' ? 'bg-green-700' : ''}`}
            onClick={() => {
              fetchData('get-data-analysis');
              setStartDate(null); // Reset start date
              setEndDate(null); // Reset end date
            }}
          >
            View Data Analysis
          </button>

          <button
            onClick={() => navigate(-1)} // Navigate back to the previous page
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Back
          </button>
        </div>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />

        {activeTab === 'get-data-analysis' && (
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            className="mb-4"
          />
        )}

        <div>
          {loading && <p className="text-gray-600">Loading...</p>}
          {!loading && activeTab === 'get-new-registration' && renderItems(newRegistration)}
          {!loading && activeTab === 'get-data-analysis' && renderItems(dataAnalysis)}
        </div>
      </div>
    </div>
  );
}

export default ViewData;
