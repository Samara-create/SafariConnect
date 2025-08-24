import React from 'react';
import ImageComponent from '../components/ImageComponent';
import TripProfileForm from '../components/TripProfileForm';
import '../styles/images.css';

const DianiBeachPackage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Diani Beach</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Diani Beach is one of Kenya’s most beautiful coastal destinations. With soft white sands,
          palm-lined shores, and coral reefs, it’s the perfect getaway for relaxation and adventure.
        </p>
      </div>

      {/* Gallery */}
      <div className="image-gallery grid md:grid-cols-3 gap-6 mb-12">
        {[
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR84jsEDgeB3IKcKEvWbTbFK_baE2vcaiRQ-g&s',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuaynvTbBHhmdlvPkC_e7YI4T2NkpIPQK6Xw&s',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTSFkVPTuzuDyZii5UyOXqJM08RA_RyuSNEQ&s',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSICHGTXB-4kmR7NKX207bycK_ZbOCI7IRSkA&s',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbovgoIwsLjxT7tNTn6COy007dg_y4XEgKIw&s',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKD3fUreJ08QsPKep1uee2juTTigV8r9eqxQ&s',
        ].map((img, i) => (
          <ImageComponent
            key={i}
            src={img}
            alt={`Diani Beach image ${i + 1}`}
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
        ))}
      </div>

      {/* Package Details */}
      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🏖️ Package Details</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Accommodation in beachfront resort</li>
          <li>Breakfast & dinner included</li>
          <li>Marine park access & boat rides</li>
          <li>Beach volleyball, snorkeling & kayaking</li>
          <li>Sunset photography experience</li>
        </ul>
      </div>

      {/* SafariConnect Features */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 shadow-lg mb-12">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">🌐 Travel Smart with SafariConnect</h2>
        <p className="text-gray-700 text-lg mb-4">
          Connect with other travelers heading to Diani Beach. Share transportation, stay in touch via in-app chat, and enjoy group discounts.
        </p>
        <ul className="text-gray-700 text-base list-disc list-inside space-y-2">
          <li>💬 In-app group chat</li>
          <li>🚐 Shared van/shuttle coordination</li>
          <li>📸 Experience reviews from other travelers</li>
        </ul>
      </div>

      {/* ✅ Trip Profile Form replaces old form */}
      <div className="bg-white shadow-md rounded-2xl p-8 mb-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">📅 Plan Your Trip & Start Matching</h2>
        <TripProfileForm />
      </div>

      {/* Events */}
      <div className="mt-20 bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">🌅 Upcoming Beach Events</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🏖️ <strong>Aug 10:</strong> Diani Sunset Yoga & Bonfire</li>
          <li>🎶 <strong>Aug 15:</strong> Beachside DJ Party at Sands</li>
          <li>🐬 <strong>Aug 20:</strong> Dolphin Spotting Tour</li>
        </ul>
      </div>

      {/* WhatsApp Chat */}
      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Diani%20Beach%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default DianiBeachPackage;
