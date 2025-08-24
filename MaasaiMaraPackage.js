import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ImageComponent from '../components/ImageComponent';
import '../styles/images.css';
import TripProfileForm from '../components/TripProfileForm';

const MaasaiMaraPackage = () => {
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    startDate: '',
    endDate: '',
    groupSize: '',
    interests: '',
    email: '',
    phone: '',
    lookingForCompanion: true,
    travelStyle: 'mixed',
    accommodationPreference: 'any',
    addToCalendar: true,
    autoMatchmaking: true,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tripDuration, setTripDuration] = useState(1);

  // Passport/ID validation function
  const validatePassport = (passportNumber) => {
    const cleanPassport = passportNumber.replace(/\s/g, '').toUpperCase();
    const kenyanPassportRegex = /^[A-Z]\d{8}$/;
    const kenyanIdRegex = /^\d{8}$/;
    const internationalPassportRegex = /^\d{9}$/;
    
    if (kenyanPassportRegex.test(cleanPassport)) {
      return { isValid: true, type: 'Kenyan Passport', formatted: cleanPassport };
    } else if (kenyanIdRegex.test(cleanPassport)) {
      return { isValid: true, type: 'Kenyan ID', formatted: cleanPassport };
    } else if (internationalPassportRegex.test(cleanPassport)) {
      return { isValid: true, type: 'International Passport', formatted: cleanPassport };
    } else {
      return { 
        isValid: false, 
        message: 'Please enter a valid passport/ID number (8-9 digits or letter + 8 digits)' 
      };
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    setFormData(prev => ({ ...prev, startDate }));
    
    // Auto-calculate end date based on trip duration
    if (startDate && tripDuration > 0) {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + tripDuration - 1);
      setFormData(prev => ({ 
        ...prev, 
        endDate: endDate.toISOString().split('T')[0] 
      }));
    }
  };

  const handleDurationChange = (e) => {
    const duration = parseInt(e.target.value);
    setTripDuration(duration);
    
    // Update end date if start date is set
    if (formData.startDate && duration > 0) {
      const endDate = new Date(formData.startDate);
      endDate.setDate(endDate.getDate() + duration - 1);
      setFormData(prev => ({ 
        ...prev, 
        endDate: endDate.toISOString().split('T')[0] 
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Passport/ID validation
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'Passport/ID number is required';
    } else {
      const passportValidation = validatePassport(formData.idNumber);
      if (!passportValidation.isValid) {
        newErrors.idNumber = passportValidation.message;
      }
    }
    
    // Date validation
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    } else {
      const selectedDate = new Date(formData.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.startDate = 'Start date cannot be in the past';
      }
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      if (endDate < startDate) {
        newErrors.endDate = 'End date cannot be before start date';
      }
    }
    
    // Group size validation
    if (!formData.groupSize) {
      newErrors.groupSize = 'Group size is required';
    } else if (formData.groupSize < 1 || formData.groupSize > 50) {
      newErrors.groupSize = 'Group size must be between 1 and 50';
    }

    // Email validation (if provided)
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addToGoogleCalendar = async (tripData) => {
    try {
      const event = {
        summary: `Safari Trip: ${tripData.destination}`,
        description: `Safari adventure to ${tripData.destination}\nGroup Size: ${tripData.groupSize}\nInterests: ${tripData.interests || 'Not specified'}`,
        start: {
          date: tripData.startDate,
          timeZone: 'Africa/Nairobi',
        },
        end: {
          date: tripData.endDate,
          timeZone: 'Africa/Nairobi',
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 1 day before
            { method: 'popup', minutes: 60 }, // 1 hour before
          ],
        },
      };

      // For now, we'll create a Google Calendar link that users can click
      const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.summary)}&dates=${tripData.startDate}/${tripData.endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(tripData.destination)}&sf=true&output=xml`;
      
      return calendarUrl;
    } catch (error) {
      console.error('Calendar error:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    const passportValidation = validatePassport(formData.idNumber);
    const bookingData = {
      ...formData,
      idNumber: passportValidation.formatted,
      idType: passportValidation.type,
      destination: 'Maasai Mara National Reserve',
      createdAt: new Date(),
    };
    
    try {
      // Save trip to database
      const response = await axios.post('http://localhost:5000/api/trips', bookingData);
      
      // Create Google Calendar event
      if (formData.addToCalendar) {
        const calendarUrl = await addToGoogleCalendar(bookingData);
        if (calendarUrl) {
          // Open calendar in new tab
          window.open(calendarUrl, '_blank');
          toast.info('📅 Google Calendar event created! Check your browser for the calendar page.');
        }
      }

      // Auto-enroll in matchmaking if selected
      if (formData.autoMatchmaking) {
        toast.info('🔍 You\'ve been enrolled in matchmaking! We\'ll notify you of compatible travelers.');
      }
      
      toast.success('🦓 Trip booked successfully! Check your dashboard for details.');
      setFormData({ 
        name: '', 
        idNumber: '', 
        startDate: '', 
        endDate: '', 
        groupSize: '', 
        interests: '', 
        email: '', 
        phone: '',
        lookingForCompanion: true,
        travelStyle: 'mixed',
        accommodationPreference: 'any',
        addToCalendar: true,
        autoMatchmaking: true,
      });
      setErrors({});
      setTripDuration(1);
    } catch (error) {
      console.error('Booking error:', error);
      if (error.response?.status === 400) {
        toast.error('❌ Invalid booking data. Please check your information.');
      } else if (error.response?.status === 409) {
        toast.error('❌ Booking already exists for this date.');
      } else {
        toast.error('❌ Booking failed. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Maasai Mara National Reserve</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Experience Kenya's most iconic safari destination — home to the Great Migration, the Big Five, and a landscape rich in Maasai culture and wildlife encounters.
        </p>
      </div>

      <div className="image-gallery">
        {[
         'https://s3.amazonaws.com/cdn.micato.com/wp-content/uploads/2018/09/07230521/maasai-mara-8.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/17/Masai_Mara_at_Sunset.jpg',
    'https://www.kenyasafari.com/images/masai-mara-saruni-mara-590x390.jpg',
    'https://www.matriarchafrica.com/wp-content/uploads/2019/01/Ecotourism-Safari-Masai-Mara.jpg',
    'https://www.greatadventuresafaris.com/wp-content/uploads/Masai-Mara-wildlife-reserve-1200x675.jpg',
    'https://www.maasaimarakenyapark.com/wp-content/uploads/2019/12/Hotels-in-Masai-Mara-National-Reserve-749x450.jpg'
        ].map((img, i) => (
          <ImageComponent
            key={i}
            src={img}
            alt={`Maasai Mara image ${i + 1}`}
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
        ))}
      </div>
    {/* TripProfileForm instead of booking form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
        <TripProfileForm />
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Find Maasai Mara on Map</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Maasai Mara Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4069517.522707167!2d33.96349387084819!3d-1.5305718272915554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f08b898061aaa%3A0xded847b8998fdb6f!2sMaasai%20Mara%20National%20Reserve!5e0!3m2!1sen!2ske!4v1628617740956!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">🗓️ Upcoming Safari Events</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🐃 <strong>Oct 1:</strong> Great Migration Finale Safari</li>
          <li>📸 <strong>Oct 10:</strong> Wildlife Photography Workshop</li>
          <li>🎪 <strong>Oct 20:</strong> Maasai Cultural Dance & Campfire Night</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Maasai%20Mara%20safari%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default MaasaiMaraPackage;
