import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ImageComponent from '../components/ImageComponent'; // Adjust path if different
import TripProfileForm from '../components/TripProfileForm';

const MarafaPackage = () => {
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
      destination: 'Marafa (Hell\'s Kitchen)',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🌋 Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Marafa (Hell's Kitchen)</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Marafa, also known as Hell’s Kitchen, is a stunning natural canyon near Malindi. Carved by wind and rain, the vibrant sandstone cliffs glow in reds, oranges, and yellows — especially magical at sunset.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
           'https://kirrasworld.com/wp-content/uploads/2021/04/20210425_181041.jpg',
    'https://www.kids365.org/wp-content/uploads/2023/08/Hells-Kitchen-cover-1400x744.jpg'
        ].map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Marafa Canyon image ${i + 1}`}
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
        ))}
      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-red-800 mb-4">🔥 Why Visit Marafa?</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>See natural rock formations shaped by erosion</li>
          <li>Guided tours with local myths and legends</li>
          <li>Best sunset photography in coastal Kenya</li>
          <li>Scenic canyon hikes with panoramic views</li>
          <li>Combine with a cultural visit to nearby villages</li>
        </ul>
      </div>

           {/* TripProfileForm instead of booking form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
        <TripProfileForm />
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-red-800 mb-4 text-center">📍 Find Marafa (Hell's Kitchen)</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Marafa Hell's Kitchen Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15927.433597284675!2d40.17721704710181!3d-3.228944849689249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18245a40268f814b%3A0xa5585c514f88c88f!2sMarafa%20Hell's%20Kitchen!5e0!3m2!1sen!2ske!4v1628800000024!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-red-800 mb-6 text-center">📸 Upcoming Experiences</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🌅 <strong>Oct 7:</strong> Sunset Photography Challenge</li>
          <li>🗿 <strong>Oct 14:</strong> Guided Geology Talk & Walk</li>
          <li>🔥 <strong>Oct 21:</strong> Bonfire Storytelling with Locals</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Marafa%20Hell's%20Kitchen%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default MarafaPackage;
