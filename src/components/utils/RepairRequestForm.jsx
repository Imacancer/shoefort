import { DollarSign, MailIcon, ShoppingCart } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RequestForRepair = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    day: '',
    month: '',
    year: '',
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const customerId = sessionStorage.getItem('customerId');
      console.log('customerId:', customerId);
      if (!customerId) {
        // Redirect to login if customerId is not present
        alert('Please login to request a service.');
        return;
      }

      const requestData = { ...formData, customerId };

      await axios.post('http://localhost:4001/services', requestData);
      setFormData({
        name: '',
        email: '',
        service: '',
        day: '',
        month: '',
        year: '',
        comments: ''
      });

      alert('Request submitted successfully!');
      navigate('/')
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again later.');
    }
  };

  return (
    <div className="bg-white p-8 flex items-center justify-center h-screen">
      <div className="max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Request for a Service</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="border-black border-2 rounded-lg text-black px-4 py-2"
              style={{ width: '425px', height: '40px', borderRadius: '0.75rem', borderColor: 'black' }}
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
              className="border-black border-2 rounded-lg text-black px-4 py-2"
              style={{ width: '425px', height: '40px', borderRadius: '0.75rem', borderColor: 'black' }}
            />
          </div>
          <div className="flex justify-center mb-6">
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="text-black border-black border-b-2 rounded-lg"
              style={{ paddingLeft: '0px', paddingRight: '0px' }}
            >
              <option value="">Types of Service</option>
              <option value="repair">Repair</option>
              <option value="clean">Cleaning</option>
            </select>
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="text-black border-black border-b-2 rounded-lg ml-2"
              style={{ paddingLeft: '8px' }}
            >
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, index) => (
                <option key={index + 1} value={index + 1}>{index + 1}</option>
              ))}
            </select>
            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="text-black border-black border-b-2 rounded-lg ml-2"
              style={{ paddingLeft: '8px' }}
            >
              <option value="">Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="text-black border-black border-b-2 rounded-lg ml-2"
              style={{ paddingLeft: '8px' }}
            >
              <option value="">Year</option>
              {Array.from({ length: 100 }, (_, index) => (
                <option key={index} value={2024 - index}>{2024 - index}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <input
              type="text"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Message"
              className="border-black border-2 rounded-lg text-black px-4 py-2"
              style={{ width: '425px', height: '90px', borderRadius: '0.75rem', borderColor: 'black' }}
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="flex items-center justify-center w-32 h-10 bg-black text-white rounded-lg ml-4 hover:bg-white hover:text-black hover:border border-black transition duration-700"
            >
              <span>Submit</span>
              <MailIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestForRepair;
