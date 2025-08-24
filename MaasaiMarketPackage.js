import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ImageComponent from '../components/ImageComponent'; // Adjust path if different
import TripProfileForm from '../components/TripProfileForm';

const MaasaiMarketPackage = () => {
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
      destination: 'Maasai Market',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🛍️ Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Maasai Market</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          The Maasai Market is a vibrant cultural marketplace where artisans sell handmade crafts, jewelry, clothing, and artworks. It’s a perfect stop for souvenir shopping, cultural exploration, and meeting local creators.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
         'https://www.theculturetube.com/wp-content/uploads/2022/12/add.jpg',
    'https://www.wildlifekenyasafari.com/wp-content/uploads/2022/08/download.jpeg'
        ].map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Maasai Market image ${i + 1}`}
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
        ))}
      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-red-800 mb-4">🛍️ What to Expect</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Handcrafted jewelry, beadwork & sandals</li>
          <li>Traditional Maasai clothing & fabrics</li>
          <li>Art pieces, paintings & wood carvings</li>
          <li>Live demos and cultural storytelling</li>
          <li>Bargaining and direct artisan support</li>
        </ul>
      </div>

      {/* TripProfileForm instead of booking form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
        <TripProfileForm />
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-red-800 mb-4 text-center">📍 Locate Maasai Market</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Maasai Market Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.223471735066!2d36.81724499543483!3d-1.2841059324324108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d52b7c05f3%3A0x8b0c55c1131864c4!2sMaasai%20Market!5e0!3m2!1sen!2ske!4v1690000000000!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-red-800 mb-6 text-center">🎨 Upcoming Cultural Events</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🧵 <strong>Oct 8:</strong> Beadwork Workshop with Local Artisans</li>
          <li>🥁 <strong>Oct 15:</strong> Live Drumming & Dance Session</li>
          <li>🎨 <strong>Oct 22:</strong> Nairobi Open-Air Art Exhibition</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Maasai%20Market%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default MaasaiMarketPackage;
