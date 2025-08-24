import React from 'react';
import ImageComponent from '../components/ImageComponent';
import TripProfileForm from '../components/TripProfileForm';

const TsavoWestPackage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-100 to-yellow-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Tsavo West National Park</h1>
          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
            Located in southeastern Kenya, Tsavo West is one of the largest national parks in Kenya. Known for its stunning landscape of rolling volcanic hills, lava flows, rivers, and diverse wildlife including lions, leopards, elephants, and hippos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[ 
            'https://www.tsavonationalparkkenya.com/wp-content/uploads/2020/06/Tsavo-West-National-Park.jpg',
            'https://s3.amazonaws.com/cdn.micato.com/wp-content/uploads/2024/07/07175635/Tsavo-West-National-Park-1-1200x767.jpg',
            'https://www.tsavonationalparkkenya.com/wp-content/uploads/2020/05/Tsavo-west-national-park-Kenya.jpg',
            'https://www.tsavonationalparkkenya.com/wp-content/uploads/2020/04/Tsavo-West-National-Park-animals.jpg',
            'https://www.tsavonationalparkkenya.com/wp-content/uploads/2020/04/Tsavo-West-National-Park-accommodation.jpg',
            'https://kenya-wildlife-safaris.de/wp-content/uploads/2017/11/Flusspferde_in_den_Mzima_Springs_im_Tsavo_West_Nationalpark.jpg'
          ].map((img, i) => (
            <ImageComponent
              key={i}
              src={img}
              alt={`Tsavo image ${i + 1}`}
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
          ))}
        </div>

        {/* Profile Form for matchmaking */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
          <TripProfileForm />
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 text-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">🦁 What to Expect</h2>
          <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
            <li>Explore Mzima Springs with crystal-clear pools and hippos</li>
            <li>Visit the Shetani Lava Flow and Chaimu Crater</li>
            <li>Game drives featuring elephants, lions, and rhinos</li>
            <li>Guided walks and birdwatching excursions</li>
            <li>Luxury lodges and scenic viewpoints</li>
          </ul>

          <div className="mt-10">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">📍 Location Map</h3>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="Tsavo West National Park Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31863.0797862562!2d38.14521730932455!3d-2.9994621320316506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1843d27df9dc9d1b%3A0x95ce7eb8d90e37f5!2sTsavo%20West%20National%20Park!5e0!3m2!1sen!2ske!4v1628703032483!5m2!1sen!2ske"
                width="100%"
                height="450"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

         
          <div className="mt-10 text-center">
            <a
              href="https://wa.me/254728454524"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-md transition duration-300"
            >📲 Contact via WhatsApp</a>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default TsavoWestPackage;
