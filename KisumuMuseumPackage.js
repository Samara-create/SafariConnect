import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ImageComponent from '../components/ImageComponent'; // Adjust path if different
import TripProfileForm from '../components/TripProfileForm';

const KisumuMuseumPackage = () => {
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
      destination: 'Kisumu Museum',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🏛️ Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Kisumu Museum</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Discover the heritage of Western Kenya at Kisumu Museum — featuring Luo traditional homesteads, cultural artifacts, fish species, and exhibitions about Lake Victoria’s biodiversity.
        </p>
      </div>

      <div className="image-gallery">
       {[
  'https://museums.or.ke/wp-content/uploads/2024/01/Kisumu-Museum1.jpg',
    'https://www.kenyasafari.com/images/kisumu-museum-kenya-590x390.jpg',
    'https://kisumucitycouncil.wordpress.com/wp-content/uploads/2013/01/museum1.jpg?w=584'
].map((img, i) => (
  <ImageComponent
    key={i}
    src={img}
    alt={`Kisumu Museum image ${i + 1}`}
    className="rounded-xl shadow-lg w-full h-64 object-cover"
  />
))}

      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🏺 Cultural & Natural Exhibits</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Luo homestead replicas and community life exhibits</li>
          <li>Traditional fishing tools and artifacts</li>
          <li>Aquarium with native fish species of Lake Victoria</li>
          <li>Snake pit and biodiversity information</li>
          <li>Great for student field trips and researchers</li>
        </ul>
      </div>

          {/* TripProfileForm instead of booking form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
        <TripProfileForm />
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Find Us on the Map</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Kisumu Museum Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.635912526302!2d34.74816958794148!3d-0.10332643716163616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182aa5435079e9a3%3A0x9872dbdaefc8e2e3!2sKisumu%20Museum!5e0!3m2!1sen!2ske!4v1628592782345!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">📆 Upcoming Museum Days</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🎓 <strong>Sept 5:</strong> Student Field Day + Snake Talk</li>
          <li>🎣 <strong>Sept 11:</strong> Traditional Fishing Demo</li>
          <li>🏺 <strong>Sept 20:</strong> Luo Culture & Heritage Showcase</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Kisumu%20Museum%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default KisumuMuseumPackage;
