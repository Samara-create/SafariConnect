import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DungaBeachPackage = () => {
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
      destination: 'Dunga Beach',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🌊 Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Dunga Beach</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Located on the shores of Lake Victoria in Kisumu, Dunga Beach is a serene lakeside destination known for its traditional fishing culture,
          birdwatching, and eco-tourism. Visitors can enjoy fresh fish, canoe rides, and cultural interactions with local communities.
        </p>
      </div>

      <div className="image-gallery">
        {[
          'https://kisumucounty.go.ke/wp-content/uploads/2021/05/Dunga-Beach-Kisumu.jpg',
          'https://media-cdn.tripadvisor.com/media/photo-s/0f/c8/e3/7a/dunga-beach.jpg',
          'https://images.unsplash.com/photo-1577985051082-3249f9e7a313',
          'https://kenyanbackpacker.com/wp-content/uploads/2022/03/Dunga-Boardwalk-Kisumu.jpg',
          'https://pbs.twimg.com/media/FW8OSt0WQAIKZ4b.jpg',
          'https://www.kisumucity.co.ke/images/photos/3.jpg'
        ].map((img, i) => (
          <ImageComponent
            key={i}
            src={img}
            alt={`${fileName.replace("Package.js", "").replace(".js", "")} image ${i + 1}`}
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
        ))}
      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🌅 Activities & Highlights</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Sunset views over Lake Victoria</li>
          <li>Traditional canoe rides & fishing excursions</li>
          <li>Birdwatching at the Dunga Wetland</li>
          <li>Fresh tilapia and authentic lakeside cuisine</li>
          <li>Local artisan markets and eco-boardwalk tour</li>
        </ul>
      </div>

      <div className="mt-16 bg-white p-8 rounded-2xl shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">📅 Book Your Visit</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange} type="text" className="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">ID / Passport Number</label>
            <input name="idNumber" value={formData.idNumber} onChange={handleChange} type="text" className="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Date of Visit</label>
            <input name="date" value={formData.date} onChange={handleChange} type="date" className="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Group Size</label>
            <input name="groupSize" value={formData.groupSize} onChange={handleChange} type="number" min="1" max="50" className="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Interests</label>
            <textarea name="interests" value={formData.interests} onChange={handleChange} rows="3" placeholder="e.g. canoe rides, nature, fishing" className="w-full border border-gray-300 rounded px-4 py-2" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full">
            Submit Booking
          </button>
        </form>
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Find Dunga Beach</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Dunga Beach Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15958.193476396422!2d34.75119108913355!3d-0.10569339816610605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182aa525de5091f3%3A0x88120fabc289a33e!2sDunga%20Beach!5e0!3m2!1sen!2ske!4v1628731790000!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">🎣 Upcoming Events</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🛶 <strong>Oct 10:</strong> Morning Canoe Safari & Hippo Spotting</li>
          <li>🎵 <strong>Oct 15:</strong> Lakeside Sunset Acoustic Jam</li>
          <li>🧭 <strong>Oct 20:</strong> Eco-Trail Boardwalk Nature Walk</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Dunga%20Beach%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default DungaBeachPackage;
