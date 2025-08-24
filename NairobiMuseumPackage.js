import React from 'react';
import ImageComponent from '../components/ImageComponent';
import '../styles/images.css';
import TripProfileForm from '../components/TripProfileForm';

const NairobiMuseumPackage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-100 to-yellow-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-800 mb-4">Nairobi National Museum</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover the rich cultural and natural heritage of Kenya at the Nairobi National Museum. From prehistoric fossils to modern art, this is a must-visit for history lovers and explorers alike.
          </p>
        </div>

        {/* Gallery */}
        <div className="image-gallery mb-10">
          {[ 
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb4NflVbcWBV4_flM9TEv_stDOUqib9RcOaw&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0mSxzqnAi74Pv_iHN81kO_cDg8zW3e04i6Q&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9IDJGm3yzfqizdr8cLxt5l3DZaaw_7XLRtQ&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXkBSRYIwivC1I1Noprnd-KME2mK4li1MXhQ&s',
            'https://momaa.org/wp-content/uploads/2019/10/Culture-Zoma-Contemporary-Art-Center-Article01.png',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ErxIByVxRXUwb1Fsgr-EGwoQ3JS27lF01g&s'
          ].map((img, i) => (
            <ImageComponent
              key={i}
              src={img}
              alt={`Museum image ${i + 1}`}
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
          ))}
        </div>

        {/* Profile Form for matchmaking */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
          <TripProfileForm />
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 text-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-yellow-700">📍 Location & Highlights</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm md:text-base">
            <li>Located in the Museum Hill area, Nairobi</li>
            <li>Exhibits include fossils, traditional Kenyan crafts, wildlife dioramas, and contemporary art</li>
            <li>Access to Snake Park and botanical gardens</li>
            <li>Perfect for educational trips, families, and solo travelers</li>
          </ul>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-yellow-700 mb-2">💵 Entry Fees</h3>
            <p>Local Adults: KES 200<br />Local Students/Children: KES 100<br />Foreign Residents: KES 600<br />Foreign Tourists: KES 1,200</p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-yellow-700 mb-2">⏰ Opening Hours</h3>
            <p>Daily: 8:30 AM - 5:30 PM (including public holidays)</p>
          </div>

       

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-yellow-700 mb-2">🗺️ Location on Map</h3>
            <div className="w-full h-64">
              <iframe
                title="Nairobi National Museum Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.144168272349!2d36.81114041613132!3d-1.2685956999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f175d74e23427%3A0x3db7ab54f2e80e8c!2sNairobi%20National%20Museum!5e0!3m2!1sen!2ske!4v1632152602297!5m2!1sen!2ske"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl border border-yellow-300"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NairobiMuseumPackage;