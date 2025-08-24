import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ImageComponent from '../components/ImageComponent'; // Adjust path if different
import TripProfileForm from '../components/TripProfileForm';

const WildWatersPackage = () => {
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    date: '',
    groupSize: '',
    interests: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      ...formData,
      destination: 'Wild Waters Mombasa',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🎢 Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Wild Waters Mombasa</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Wild Waters is Mombasa’s premier water park with thrilling slides, splash pools, lazy rivers, and entertainment for all ages — a must-visit for fun seekers and families!
        </p>
      </div>

      <div className="image-gallery">
        {[
  'https://www.wildwaterskenya.com/img/bg2.jpg',
    'https://www.kenyawildlifetours.com/wp-content/uploads/2023/05/wild-waters-inner-view.jpg',
    'https://www.kids365.org/wp-content/uploads/2023/08/Wild-Waters-cover-shot-3-1400x744.jpg'
].map((img, i) => (
  <ImageComponent
    key={i}
    src={img}
    alt={`Wild Waters image ${i + 1}`}
    className="rounded-xl shadow-lg w-full h-64 object-cover"
  />
))}

      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🎉 Attractions</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>12+ water slides for kids and adults</li>
          <li>Rain dance, lazy river, and splash zones</li>
          <li>Food court, gaming arcade, and bouncing castle</li>
          <li>Birthday and event packages</li>
          <li>Safe, family-friendly water thrills</li>
        </ul>
      </div>
     {/* TripProfileForm instead of booking form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
        <TripProfileForm />
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Location on Map</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Wild Waters Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.2712630810026!2d39.69097581600782!3d-4.043903997003802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1840120c49f430e3%3A0x622b3d7ef3085c92!2sWild%20Waters!5e0!3m2!1sen!2ske!4v1628542191070!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">🎊 Upcoming Activities</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🎂 <strong>Sept 5:</strong> Kids Carnival & Foam Party</li>
          <li>🎤 <strong>Sept 12:</strong> Live DJ Pool Bash</li>
          <li>🏊 <strong>Every Weekend:</strong> Family Splash Days</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Wild%20Waters%20Mombasa%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default WildWatersPackage;
