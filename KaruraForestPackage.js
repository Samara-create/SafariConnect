import React from 'react';
import ImageComponent from '../components/ImageComponent';
import TripProfileForm from '../components/TripProfileForm';

const KaruraForestPackage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Karura Forest</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Nestled in Nairobi, Karura Forest is a serene urban forest reserve offering
          tranquil walking trails, scenic waterfalls, bamboo groves, and a peaceful escape from the city.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[ 
          'https://www.friendsofkarura.org/wp-content/uploads/2024/09/Biking-at_Karura-Forest.jpg',
          'https://samburunationalreservekenya.com/wp-content/uploads/2022/05/0fgjhs63re3iua8va.jpg', 
          'https://i0.wp.com/www.travelwithapen.com/wp-content/uploads/2020/10/Karura-Forest-Picnic-Nairobi-Kenya-scaled.jpg?resize=1709%2C2560',
          'https://healthykajuju.com/wp-content/uploads/2018/08/fullsizeoutput_165f.jpeg',
          'https://waybird.imgix.net/experiences/kodak_images/000/016/333/original/Go_hiking_in_Karura_Forest.jpg?w=1420&h=946&crop=center%20center&fit=min&dpr=1&q=50&auto=format',
          'https://www.amboseliparkkenya.com/wp-content/uploads/2024/02/Karura-Forest-waterfall.jpg'
        ].map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Karura Forest image ${i + 1}`}
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
        ))}
      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-green-800 mb-4">🌿 Highlights</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Nature walks & biking trails</li>
          <li>Beautiful waterfalls & caves</li>
          <li>Birdwatching and forest picnics</li>
          <li>Butterfly watching & indigenous trees</li>
          <li>Safe, family-friendly green escape</li>
        </ul>
      </div>

      {/* TripProfileForm instead of booking form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
        <TripProfileForm />
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">📍 Karura Forest Map</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Karura Forest Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1991.9545540672945!2d36.81845141576704!3d-1.250658199074602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f175c304b9511%3A0xf99db365c6550c14!2sKarura%20Forest!5e0!3m2!1sen!2ske!4v1628532105146!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I%20am%20interested%20in%20Karura%20Forest"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default KaruraForestPackage;
