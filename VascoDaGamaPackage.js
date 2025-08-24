import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ImageComponent from '../components/ImageComponent'; // Adjust path if different
import TripProfileForm from '../components/TripProfileForm';

const VascoDaGamaPackage = () => {
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
      destination: 'Vasco Da Gama Pillar',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('📍 Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Vasco Da Gama Pillar</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          The Vasco Da Gama Pillar, located in Malindi, is one of the oldest European monuments in Africa.
          Erected by the famed Portuguese explorer, it offers panoramic views of the Indian Ocean and holds deep historic significance.
        </p>
      </div>

      <div className="image-gallery">
        {[
  'https://upload.wikimedia.org/wikipedia/commons/9/9e/Pillar_of_Vasco_da_Gama.jpg',
    'https://comewithmeonabudget.travel.blog/wp-content/uploads/2021/01/img_20201123_120455-19190685473838948922.jpg',
      'https://live.staticflickr.com/5347/29811626783_7f9d421ec7_b.jpg'
  
].map((img, i) => (
  <ImageComponent
    key={i}
    src={img}
    alt={`Vasco Da Gama image ${i + 1}`}
    className="rounded-xl shadow-lg w-full h-64 object-cover"
  />
))}

      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🌍 Highlights</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Historic Portuguese architecture</li>
          <li>Cliffside views of the Indian Ocean</li>
          <li>Excellent spot for photography</li>
          <li>Nearby access to Malindi Marine Park</li>
          <li>Local tour guides available on-site</li>
        </ul>
      </div>

         {/* TripProfileForm instead of booking form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
        <TripProfileForm />
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Find the Pillar on the Map</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Vasco Da Gama Pillar Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15948.38161558621!2d40.133371!3d-3.2201938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182a37680f028f4f%3A0x7dcbb8a739a9263!2sVasco%20da%20Gama%20Pillar!5e0!3m2!1sen!2ske!4v1628540482419!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">📌 Featured Events</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>📸 <strong>Aug 14:</strong> Coastal Photography Walk</li>
          <li>🗿 <strong>Aug 21:</strong> Pillar History Tour with local guide</li>
          <li>🌊 <strong>Aug 28:</strong> Beach Meditation & Monument Session</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Vasco%20Da%20Gama%20Pillar%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default VascoDaGamaPackage;
