import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ImageComponent from '../components/ImageComponent'; // Adjust path if different
import TripProfileForm from '../components/TripProfileForm';

const AlmasiArtPackage = () => {
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
      destination: 'Almasi Art Agency',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🎨 Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Almasi Art Agency</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Almasi Art Agency is a contemporary African art space that showcases emerging and established Kenyan artists. From stunning canvases to interactive installations, it’s a hub for creativity and culture in Nairobi.
        </p>
      </div>

      <div className="image-gallery">
        {[
  'https://abiri.home.blog/wp-content/uploads/2025/01/almasi-art-agency-2.jpg',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
  'https://kenya.tortoisepath.com/wp-content/uploads/2024/04/Almasi-Art-Agency-Diani-Beach-Kenya-TortoisePathcom-6-jpeg.webp'
].map((img, i) => (
  <ImageComponent
    key={i}
    src={img}
    alt={`Almasi Art image ${i + 1}`}
    className="rounded-xl shadow-lg w-full h-64 object-cover"
  />
))}
      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🎭 Artistic Highlights</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Paintings, sculptures & installations by Kenyan artists</li>
          <li>Live art demonstrations & artist meet-and-greets</li>
          <li>Workshops in painting, photography, and crafts</li>
          <li>Art for purchase and exhibition tours</li>
        </ul>
      </div>

          {/* TripProfileForm instead of booking form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
        <TripProfileForm />
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Find Almasi Art Agency</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Almasi Art Agency Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1992.1026709631812!2d36.798823084185935!3d-1.2917907999999933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1762d9f3c9e1%3A0x7cb5b8fa4bb969a6!2sAlmasi%20Art%20Agency!5e0!3m2!1sen!2ske!4v1656123456789!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">🗓️ Upcoming Exhibitions</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🎨 <strong>Oct 5:</strong> Nairobi Art Collective Showcase</li>
          <li>🧑‍🎨 <strong>Oct 12:</strong> Live Sketching & Wine Evening</li>
          <li>📷 <strong>Oct 20:</strong> Visual Storytelling Workshop</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Almasi%20Art%20Agency%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default AlmasiArtPackage;
