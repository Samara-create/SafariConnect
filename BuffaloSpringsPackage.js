import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ImageComponent from '../components/ImageComponent'; // Adjust path if different
import TripProfileForm from '../components/TripProfileForm';

const BuffaloSpringsPackage = () => {
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
      destination: 'Buffalo Springs National Reserve',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🐘 Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Buffalo Springs National Reserve</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Located in northern Kenya, Buffalo Springs is known for its clear springs, rare Grevy's zebras, reticulated giraffes, and rich Samburu culture.
        </p>
      </div>

      <div className="image-gallery">
        {[
      
          'https://images.unsplash.com/photo-1508672019048-805c876b67e2'
          
        ].map((img, i) => (
          <ImageComponent
            key={i}
            src={img}
            alt={`Buffalo Springs image ${i + 1}`}
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
        ))}
      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-green-800 mb-4">🌿 Highlights</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Rare wildlife: Grevy's zebras, gerenuks, and reticulated giraffes</li>
          <li>Natural pools and springs perfect for photo moments</li>
          <li>Samburu cultural dances and guided tours</li>
          <li>Game drives with panoramic savannah views</li>
          <li>Birdwatching: over 365 species recorded</li>
        </ul>
      </div>

         {/* TripProfileForm instead of booking form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
        <TripProfileForm />
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">📍 Location Map</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Buffalo Springs Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4042.775576758616!2d37.57431561423805!3d0.5256267636330359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1788cf1544db957d%3A0xd3f0598f20d59bfb!2sBuffalo%20Springs%20National%20Reserve!5e0!3m2!1sen!2ske!4v1628792683927!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">📸 Upcoming Experiences</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🦓 <strong>Sep 7:</strong> Giraffe & Zebra Photo Safari</li>
          <li>🪘 <strong>Sep 14:</strong> Samburu Cultural Night</li>
          <li>🎯 <strong>Sep 21:</strong> Guided Wildlife Tracking Workshop</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Buffalo%20Springs%20National%20Reserve%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default BuffaloSpringsPackage;
