import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ImageComponent from '../components/ImageComponent'; // Adjust path if different
import TripProfileForm from '../components/TripProfileForm';

const GediRuinsPackage = () => {
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
      destination: "Gedi Ruins Malindi-Snake Park",
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🎉 Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Gedi Ruins & Snake Park</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Explore the ancient Swahili town of Gedi nestled in the Arabuko Sokoke Forest. This archaeological gem dates back to the 12th century and is rich in history and mystique — paired with an exciting snake park experience nearby.
        </p>
      </div>

      {/* Gallery */}
      <div className="image-gallery">
        {[
   'https://whc.unesco.org/uploads/thumbs/site_1720_0006-1200-630-20240326123444.jpg',
    'https://kenyaholidays.travel/wp-content/uploads/2020/06/Gedi-ruins.jpg'
].map((img, i) => (
  <ImageComponent
    key={i}
    src={img}
    alt={`Gedi Ruins image ${i + 1}`}
    className="rounded-xl shadow-lg w-full h-64 object-cover"
  />
))}

      </div>

      {/* Highlights */}
      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🏛️ Highlights</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Explore ancient coral-stone ruins & Swahili architecture</li>
          <li>Visit the Gedi museum and see excavated artifacts</li>
          <li>Discover rare reptiles and snakes at the nearby park</li>
          <li>Walk forest trails through Arabuko Sokoke</li>
          <li>Ideal for school tours, history lovers & families</li>
        </ul>
      </div>

         {/* TripProfileForm instead of booking form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
        <TripProfileForm />
      </div>

      {/* Map */}
      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Gedi Ruins on Google Maps</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Gedi Ruins Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15948.36460752671!2d40.0030978!3d-3.3064454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182a3ef207be91cb%3A0x76e7288f648e8f77!2sGedi%20Ruins!5e0!3m2!1sen!2ske!4v1628534590876!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Events */}
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">📌 Upcoming Tours</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>📖 <strong>Aug 12:</strong> Guided Historical Walk & Forest Trail</li>
          <li>🐍 <strong>Aug 20:</strong> Snake Handling & Conservation Workshop</li>
          <li>🏛️ <strong>Aug 27:</strong> Night at the Ruins – Light & Sound Show</li>
        </ul>
      </div>

      {/* WhatsApp */}
      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Gedi%20Ruins%20Malindi-Snake%20Park%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default GediRuinsPackage;
