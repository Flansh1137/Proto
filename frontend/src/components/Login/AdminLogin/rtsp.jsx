import React, { useState } from 'react';
import axios from 'axios';

const RtspConfiguration = () => {
    const [rtspUrl, setRtspUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/rtsp', { rtsp_url: rtspUrl });
            alert(`Success! RTSP URL is: ${response.data.data['rtsp URL']}`);
            setRtspUrl(''); // Clear the input after successful submission
        } catch (error) {
            console.error('There was an error saving the RTSP URL!', error);
            alert('There was an error saving the RTSP URL!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">RTSP Configuration</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="rtsp_url" className="sr-only">RTSP URL</label>
                            <input
                                type="text"
                                id="rtsp_url"
                                name="rtsp_url"
                                value={rtspUrl}
                                onChange={(e) => setRtspUrl(e.target.value)}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="RTSP URL"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RtspConfiguration;
