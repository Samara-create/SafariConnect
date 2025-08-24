import React from 'react';
import ImageComponent from '../components/ImageComponent';
import TripProfileForm from '../components/TripProfileForm';

const HellsGatePackage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Hell's Gate National Park</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Located in the Great Rift Valley near Lake Naivasha, Hell’s Gate is one of Kenya’s most dramatic landscapes.
          Famous for its cliffs, gorges, rock towers, and geothermal activity — it’s perfect for hiking, biking, and wildlife spotting.
        </p>
      </div>

      {/* Gallery */}
      <div className="image-gallery">
        {[ 
          'https://www.hikingadventures.net/wp-content/uploads/2021/01/Hells-Gate-1-scaled.jpg',
          'https://images-prod.trailsoffroad.com/scout_routes/2124/hero_file_name/1691523513107_hell%27s_gate-1440.jpg',
          'https://easemysafari.com/wp-content/uploads/Cycling-or-Bike-Tour-in-Hells-Gate-National-Park.jpg',
          'https://www.freetour.com/images/tours/40944/hells-gate-national-park-01.jpg',
          'https://www.hellsgateairtram.com/wp-content/uploads/2023/05/2022-08-15.png',
          'https://www.lakenakurukenya.com/wp-content/uploads/2020/02/Hell%E2%80%99s-gate-national-park-gorge.jpg',
        ].map((img, i) => (
          <ImageComponent
            key={i}
            src={img}
            alt={`Hells Gate image ${i + 1}`}
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
        ))}
      </div>

      {/* Matchmaking Profile Form */}
      <div className="bg-white rounded-xl shadow-md p-6 my-12 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
        <TripProfileForm />
      </div>

      {/* Highlights */}
      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🗺️ Highlights & Activities</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Hiking through Hell’s Gate Gorge & Fischer’s Tower</li>
          <li>Rock climbing & cycling through wild terrain</li>
          <li>Wildlife spotting — zebras, giraffes, buffalos</li>
          <li>Hot springs, volcanic plugs, and geothermal spa</li>
          <li>Guided tours and camping options available</li>
        </ul>
      </div>

      {/* Map */}
      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Map to Hell's Gate</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Hell's Gate National Park Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.307739082224!2d36.3074957!3d-0.9004964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182a29e0071a2b45%3A0x94576a3e3ae9e8f7!2sHell's%20Gate%20National%20Park!5e0!3m2!1sen!2ske!4v1628522117157!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Events */}
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">🔥 Upcoming Events & Tours</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🧗 <strong>Sept 3:</strong> Rock Climbing Adventure Challenge</li>
          <li>🚵 <strong>Sept 10:</strong> Guided Bike Safari + Picnic</li>
          <li>🎒 <strong>Sept 15:</strong> Gorge Trekking Expedition</li>
        </ul>
      </div>

      {/* WhatsApp */}
      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Hell's%20Gate%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default HellsGatePackage;