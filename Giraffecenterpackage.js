import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ImageComponent from '../components/ImageComponent'; // Adjust path if different
import TripProfileForm from '../components/TripProfileForm';

const GiraffeCenterPackage = () => {
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
      destination: 'Giraffe Center',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🦒 Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Giraffe Center</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Located in Lang’ata, Nairobi, the Giraffe Center is home to the endangered Rothschild giraffes. Visitors get a chance to feed, photograph, and learn about conservation efforts.
        </p>
      </div>

      <div className="image-gallery">
       {[
 
  'https://www.maasaimarakenyapark.com/wp-content/uploads/2022/11/giraffe-centre.jpg',
    'https://africanspicesafaris.com/wp-content/uploads/2024/09/giraffe-centre-nairobi-feeding-rothschilds-giraffes.gif',
    'https://www.hemingways-collection.com/wp-content/uploads/2017/02/giraffe_centre_3.jpg?format=auto&width=1000'
].map((img, i) => (
  <ImageComponent
    key={i}
    src={img}
    alt={`Giraffe Center image ${i + 1}`}
    className="rounded-xl shadow-lg w-full h-64 object-cover"
  />
))}

      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🦒 Giraffe Center Highlights</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Feed Rothschild giraffes by hand</li>
          <li>Learn about giraffe conservation efforts</li>
          <li>Nature trail with birdwatching opportunities</li>
          <li>Educational talks and giraffe-themed souvenirs</li>
          <li>Great family-friendly and school trip location</li>
        </ul>
      </div>
    {/* TripProfileForm instead of booking form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
        <TripProfileForm />
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Find the Giraffe Center</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Giraffe Center Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.690227465537!2d36.71828291826906!3d-1.373143036702859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f107ee0126a7f%3A0xd1082e1130123c28!2sGiraffe%20Centre!5e0!3m2!1sen!2ske!4v1628600952866!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">🎉 Upcoming Activities</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🦒 <strong>Sept 7:</strong> Giraffe Conservation Day</li>
          <li>🌿 <strong>Sept 14:</strong> Family Nature Walk + Picnic</li>
          <li>🎓 <strong>Sept 21:</strong> School Visit & Wildlife Talk</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Giraffe%20Center%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default GiraffeCenterPackage;
