import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WrapperContainer from '../Components/WrapperContainer';
import { HotelRoomDetail } from '../Detail/HotelDetail';
import { Card } from '../Components/Slider';
import { Link,useNavigate } from 'react-router-dom';

const CategoryPage = () => {
  const [cities, setCities] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cityProperties, setCityProperties] = useState([]);
  const navigate = useNavigate(); 

  let detail = HotelRoomDetail;

  const showLoginExpiredPopup = () => {
    // Handle login expiration
    alert('Login expired. Redirecting to home page.');
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const fetchCitiesFromLocalStorage = () => {
      const storedCities = localStorage.getItem('cities');
      if (storedCities) {
        setCities(JSON.parse(storedCities));
      }
    };

    const fetchCitiesFromAPI = () => {
      setLoading(true);
      axios.get('http://localhost:5000/home')
        .then(response => {
          const { cities } = response.data;
          setCities(cities);
          localStorage.setItem('cities', JSON.stringify(cities));
        })
        .catch(error => {
          console.error('Error fetching cities and properties:', error);
          showLoginExpiredPopup();
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (localStorage.getItem('cities')) {
      fetchCitiesFromLocalStorage();
    } else {
      fetchCitiesFromAPI();
    }

    // Cleanup function to clear cityProperties from local storage when component unmounts
    return () => {

    };
  }, []);

  const handleMouseEnter = index => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleCityClick = cityName => {
    setLoading(true);
    axios.post('http://localhost:5000/city', { city: String(cityName) })
      .then(response => {
        const { properties } = response.data;
        localStorage.setItem('cityProperties', JSON.stringify(properties));
        setCityProperties(properties);
      })
      .catch(error => {
        console.error('Error fetching city properties:', error);
        showLoginExpiredPopup();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const cityName = cityProperties.length > 0 ? cityProperties[0][3] : null;
  const filteredDetails = detail.filter(item => item.city === cityName);

  return (
    <div className="bg-[#0b8185] pt-4 pb-8">
      <WrapperContainer>
        <div className="mt-4 mb-8 text-white text-5xl font-bold text-center">Our Locations</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {cities.map((city, index) => (
            <div
              key={index}
              className={`bg-white p-4 rounded-lg shadow-md text-center cursor-pointer transition duration-300 transform hover:shadow-lg hover:bg-gray-100 hover:text-gray-800 hover:scale-105`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleCityClick(city)}
              style={{ fontSize: '1.2rem', margin: '10px' }}
            >
              <h3 className="text-xl font-semibold">{city}</h3>
            </div>
          ))}
        </div>
        
        {loading && (
          <div className="flex justify-center mt-8">
            <div className="loader"></div> {/* Replace with your loading animation component */}
          </div>
        )}

        {cityProperties.length > 0 && (
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-white mb-1">Hotels in {cityProperties[0][3]}</h2>
          </div>
        )}

        <div id="showcase-Section" className="pt-8">
          {filteredDetails.map(detail => (
            <Link to={`/SingleHotelView/${detail.id}`} key={detail.id} className="inline-block mb-4 md:w-1/4">
              <Card detail={detail} />
            </Link>
          ))}
        </div>
        
      </WrapperContainer>
    </div>
  );
};

export default CategoryPage;
