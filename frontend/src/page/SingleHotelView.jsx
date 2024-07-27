import React, { useEffect, useState } from "react";
import WrapperContainer from "../Components/WrapperContainer";
import { useParams, Link ,useNavigate} from "react-router-dom";
import { HotelRoomDetail } from "../Detail/HotelDetail";
import { RoomDetail } from "../Detail/RoomDetail";
import { ArrowBack } from "@mui/icons-material"; // Importing ArrowBack icon from Material UI

const SingleHotelView = () => {
  const { id } = useParams();
  const [hotelDetail, setHotelDetail] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const [error, setError] = useState("");
  const [roomData, setRoomData] = useState(null); // State to store room data
  const [selectedProperty, setSelectedProperty] = useState();
  const navigate = useNavigate(); 

  useEffect(() => {
    // Function to fetch hotel detail and room data
    const fetchData = async () => {
      try {
        // Fetch hotel detail from HotelRoomDetail array
        const hotelDetailData = HotelRoomDetail.find((detail) => detail.id === +id);
        setHotelDetail(hotelDetailData);

        // Make POST request to fetch room data
        const response = await fetch("http://localhost:5000/hotel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ hotel_id: hotelDetailData.pid.toString() }),
        });
        const data = await response.json();
        setRoomData(data); // Store room data in state

        // Store room data in local storage
        localStorage.setItem("roomData", JSON.stringify(data));

        // Retrieve cityProperties from local storage and filter
        const cityProperties = JSON.parse(localStorage.getItem("cityProperties"));
        if (cityProperties) {
          const selectedProperty = cityProperties.filter((property) => property[0] === hotelDetailData.pid);
          setSelectedProperty(selectedProperty);
          localStorage.setItem('selectedProperty',selectedProperty);
          

          // Update hotelDetailData with room type costs
          hotelDetailData.rt1_cost = selectedProperty[0][8];
          hotelDetailData.rt2_cost = selectedProperty[0][9];
          hotelDetailData.rt3_cost = selectedProperty[0][10];
          hotelDetailData.rt4_cost = selectedProperty[0][11];


        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setHotelDetail(null); // Handle error state if needed
        showLoginExpiredPopup();
      }
    };

    

    fetchData();
  }, [id]);

  

  if (!hotelDetail || !roomData || !selectedProperty) {
    return null; // You can return a loading indicator or handle the loading state
  }

  const {
    name,
    city,
    images,
    description: hotelDescription,
    extras,
    rt1_cost,
    rt2_cost,
    rt3_cost,
    rt4_cost,
  } = hotelDetail;

  const handleRoomTypeClick = (roomType) => {
    const selectedRoom = RoomDetail.find((room) => room.type === roomType);
    setSelectedRoomType(selectedRoom);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError(""); // Reset error message
  };

  const handleCheckInChange = (e) => {
    setCheckInDate(e.target.value);
  };

  const handleCheckOutChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  const handleNumGuestsChange = (e) => {
    setNumGuests(parseInt(e.target.value));
  };

  const handleConfirmBooking = () => {
    // Validation checks
    if (!checkInDate || !checkOutDate || !numGuests) {
      setError("Please fill in all fields.");
      return;
    }
  
    // Convert dates to Date objects for comparison
    const today = new Date();
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
  
    // Set hours, minutes, seconds, and milliseconds of today's date to 0 for accurate comparison
    today.setHours(0, 0, 0, 0);
  
    // Check if checkInDate is not before today's date
    if (checkIn.getTime() < today.getTime()) {
      setError("Check-in date must be today or a future date.");
      return;
    }
  
    // Calculate number of days between checkIn and checkOut
    const timeDifference = checkOut.getTime() - checkIn.getTime();
    const numDays = timeDifference / (1000 * 3600 * 24);
  
    // Check if number of days is greater than or equal to 1
    if (numDays < 1) {
      setError("Minimum stay duration is 1 day.");
      return;
    }
  
    if (numGuests < 1) {
      setError("Number of guests must be greater than or equal to 1.");
      return;
    }
  
    // Perform booking confirmation logic here
    console.log("Booking confirmed:", {
      roomType: selectedRoomType,
      checkInDate,
      checkOutDate,
      numGuests,
    });
    localStorage.setItem("bookingDetails", JSON.stringify({
      roomType: selectedRoomType.type,
      roomName: selectedRoomType.name,
      checkInDate,
      checkOutDate,
      numGuests,
    }));
  
    closeModal();
    navigate('/PaymentPage');
  };

  const showLoginExpiredPopup = () => {
    // Handle login expiration
    alert('Login expired. Redirecting to home page.');
    localStorage.clear();
    navigate('/');
  };
  
  

  return (
    <div>
      <div className="bg-cover bg-center h-screen relative" style={{ backgroundImage: `url(${images})` }}>
        <WrapperContainer>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute">
            <div className="relative container text-white capitalize">
              <div className="flex items-center py-8">
                {/* Back button with "Back" text and ArrowBack icon */}
                <Link to="/CategoryPage" className="absolute left-4 top-4 flex items-center text-white text-lg font-semibold no-underline">
                  <ArrowBack style={{ fontSize: 30 }} />
                  <span className="ml-2">Back</span>
                </Link>
                {/* Heading */}
                <div className="p-4 pl-12">
                  <h1 className="text-8xl font-bold mb-2">{name}</h1>
                  <p className="font-bold text-3xl">{city}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-5xl">{hotelDescription}</p>
                <ul className="pl-6 text-lg list-disc list-inside">
                  {extras.map((detail, i) => (
                    <li key={i} className="mb-2">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </WrapperContainer>
      </div>

      {/* Book Now section */}
      <section className="bg-gray-100 py-12">
        <WrapperContainer>
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-4">Book Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {RoomDetail.map((room, index) => (
                <div
                  key={index}
                  className={`border border-gray-300 rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out transform hover:shadow-lg ${
                    selectedRoomType && selectedRoomType.type === room.type ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleRoomTypeClick(room.type)}
                >
                  <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                  <p className="text-sm">{room.idealfor}</p>
                  <p className="text-lg font-bold">${hotelDetail[`rt${index + 1}_cost`]}</p>
                </div>
              ))}
            </div>
          </div>
        </WrapperContainer>
      </section>

      {/* Modal for booking details */}
      {isModalOpen && selectedRoomType && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedRoomType.name} - Book Now</h2>
            <p className="text-lg mb-4">{selectedRoomType.description}</p>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Check-In Date:</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  value={checkInDate}
                  onChange={handleCheckInChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Check-Out Date:</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  value={checkOutDate}
                  onChange={handleCheckOutChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Number of Guests:</label>
                <input
                  type="number"
                  className="border border-gray-300 rounded w-full py-2 px-3"
                  value={numGuests}
                  onChange={handleNumGuestsChange}
                  min={1}
                  max={10}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                  onClick={handleConfirmBooking}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleHotelView;
