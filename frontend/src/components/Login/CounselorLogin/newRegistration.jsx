import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CaptureImages from './captureImages';

const NewRegistrationForm = () => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        phone: '',
        age: '',
        bloodGroup: '',
        height: '',
        weight: '',
    });
    const [showCapture, setShowCapture] = useState(false);
    const [imageData, setImageData] = useState([]);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/new-registration', formData);
            console.log('Form submitted successfully:', response.data);
            setMessage('Registration successful!'); // Show success message
            setIsError(false);
            setShowCapture(true); // Show capture images section after form submission
            setTimeout(() => {
                setMessage(''); // Clear message after 2 seconds
            }, 2000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage('Error submitting registration. Please try again.'); // Show error message
            setIsError(true);
            setTimeout(() => {
                setMessage(''); // Clear message after 2 seconds
            }, 2000);
        }
    };

    const handleBack = () => {
        navigate('/Counselor-Login');
    };

    const toggleCapture = () => {
        setShowCapture(!showCapture);
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-4 md:mx-6 lg:mx-8">
                <h1 className="text-2xl font-bold mb-4">New Registration Form</h1>
                {!showCapture ? (
                    <form onSubmit={handleSubmit}>
                        {Object.keys(formData).map((field) => (
                            <div key={field} className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
                                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                                </label>
                                <input
                                    type="text"
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={toggleCapture}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
                        >
                            Capture Images
                        </button>
                    </form>
                ) : (
                    <div>
                        <CaptureImages setImageData={setImageData} />
                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
                            >
                                Back to Counselor Login
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {message && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div
                        className={"p-6 rounded-lg text-center " + (isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700")}
                    >
                        <p className="text-lg font-bold mb-4">{message}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewRegistrationForm;