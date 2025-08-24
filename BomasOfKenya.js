import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import TripProfileForm from '../components/TripProfileForm';

const BomasOfKenyaPackage = () => {
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
      destination: 'Bomas of Kenya',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('✅ Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Bomas of Kenya</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Experience Kenya’s rich cultural heritage at the Bomas of Kenya — a unique site showcasing traditional homesteads, music, dance, and customs of various ethnic groups.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
         'https://heregoeskenya.com/wp-content/uploads/2021/04/Luo-Village-bomas-of-kenya.jpg',
    'https://www.hermosanairobi.com/images/1671998570.jpg',
    'https://www.naturaltoursandsafaris.com/wp-content/webp-express/webp-images/uploads/2019/08/Bomas-of-Kenya-1.jpg.webp'
  
        ].map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Bomas image ${i + 1}`}
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
        ))}
      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🎭 Cultural Experiences</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Traditional homesteads from diverse communities</li>
          <li>Live music and traditional dance performances</li>
          <li>Craft exhibitions and storytelling</li>
          <li>Spacious amphitheater and tour guide options</li>
          <li>Perfect for school trips and international tourists</li>
        </ul>
      </div>

          {/* TripProfileForm instead of booking form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
        <TripProfileForm />
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Bomas Location on Map</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Bomas of Kenya Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.9929582666244!2d36.78339631600684!3d-1.3096988992181977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11814623611d%3A0x6f69f121e0553b69!2sBomas%20of%20Kenya!5e0!3m2!1sen!2ske!4v1628543332937!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">🗓️ Upcoming Events</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🪘 <strong>Sept 2:</strong> Maasai Dance Showcase</li>
          <li>🎶 <strong>Sept 9:</strong> Traditional Drumming Festival</li>
          <li>🎭 <strong>Sept 17:</strong> Cultural Village Night Tour</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Bomas%20of%20Kenya%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default BomasOfKenyaPackage;
