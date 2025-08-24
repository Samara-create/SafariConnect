import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ImageComponent from '../components/ImageComponent'; // Adjust path if different
import TripProfileForm from '../components/TripProfileForm';

const OserengoniPackage = () => {
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
      destination: 'Oserengoni Wildlife Sanctuary',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🦓 Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Oserengoni Wildlife Sanctuary</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Nestled in Naivasha, the Oserengoni Wildlife Sanctuary is a private reserve that offers guided wildlife safaris, nature walks, and eco-friendly lodging. Home to giraffes, zebras, buffalos, and many bird species — it’s a hidden gem for nature lovers.
        </p>
      </div>

      <div className="image-gallery">
      {[
 'https://i0.wp.com/ventesventures.com/wp-content/uploads/2019/01/Oserengoni-Wildlife-Sanctuary5.jpg?fit=550%2C367&ssl=1',
  'https://static.wixstatic.com/media/069e05_4a28f14aaa8d4be19fa211019f3d1bc4~mv2.jpg/v1/crop/x_0,y_209,w_1600,h_1906/fill/w_250,h_298,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/1P7A7327.jpg',
  'https://africanspicesafaris.com/wp-content/uploads/2023/02/oserengoni-camping-naivasha.gif'
].map((img, i) => (
  <ImageComponent
    key={i}
    src={img}
    alt={`Oserengoni Sanctuary image ${i + 1}`}
    className="rounded-xl shadow-lg w-full h-64 object-cover"
  />
))}

      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-green-800 mb-4">🦓 Wildlife Highlights</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Private game drives with expert guides</li>
          <li>Sightings of giraffes, zebras, antelopes, buffalos</li>
          <li>Birdwatching and peaceful nature trails</li>
          <li>Eco-lodges and farm-to-table dining</li>
          <li>Photography opportunities across the sanctuary</li>
        </ul>
      </div>
     {/* TripProfileForm instead of booking form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
        <TripProfileForm />
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">📍 Find Oserengoni Sanctuary</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Oserengoni Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1992.884897329306!2d36.38776665121815!3d-0.7539998029628481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182a28c85a83cfe7%3A0x1e6d4ef369d94fae!2sOserengoni%20Wildlife%20Sanctuary!5e0!3m2!1sen!2ske!4v1651115000000!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">🌿 Upcoming Events</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🛻 <strong>Oct 12:</strong> Evening Game Drive & Sundowner Picnic</li>
          <li>📸 <strong>Oct 17:</strong> Wildlife Photography Safari</li>
          <li>🔥 <strong>Oct 25:</strong> Bonfire & Bush Dinner under the Stars</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Oserengoni%20Sanctuary%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default OserengoniPackage;
