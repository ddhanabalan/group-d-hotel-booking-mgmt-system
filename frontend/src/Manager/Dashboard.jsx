import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import Loader from '../Components/Loader';  // Import the Loader component
import './Dashboard.css';

// Styled components for Paper and Typography
const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const RoundedBox = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `2px solid ${theme.palette.divider}`,
}));

const ChartTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

function Dashboard() {
  const [data, setData] = useState([]);
  const [hotelDetails, setHotelDetails] = useState([]);
  const [roomCategories, setRoomCategories] = useState([0, 0, 0, 0]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [totalRooms, setTotalRooms] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      }
    ]
  });

  const combinedData = availableRooms.map((entry, index) => ({
    category: entry.category,
    availableRooms: entry.count,
    bookedRooms: (totalRooms[index]?.count - entry.count) || 0
  }));

  useEffect(() => {
    const fetchBookingRecords = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = 'http://localhost:5000/mngr/fetchRec';
        const response = await axios.post(apiUrl, {
          pid: localStorage.getItem('pid')
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data && response.data.result) {
          const bookings = response.data.result.map(record => ({
            id: record[0],
            category: record[3],
            bookingDate: record[4],
            amount: record[8],
            cancelled: record[9]
          }));

          const categoryCounts = [0, 0, 0, 0];
          bookings.forEach(booking => {
            if (booking.category >= 1 && booking.category <= 4) {
              categoryCounts[booking.category - 1]++;
            }
          });

          setRoomCategories(categoryCounts);
          setData(bookings);
        } else {
          console.error('Invalid API response format:', response.data);
          showLoginExpiredPopup();
        }
      } catch (error) {
        console.error('Error fetching booking records:', error);
        showLoginExpiredPopup();
      }
    };

    const fetchHotelDetails = async (cityname, pid) => {
      try {
        const response = await axios.post('http://localhost:5000/city', {
          city: cityname
        });

        const filteredProperties = response.data.properties.filter(property => property[0] === parseInt(pid));

        console.log('Fetched Hotel Details:', filteredProperties);

        if (filteredProperties.length > 0) {
          setTotalRooms([
            { category: 1, count: filteredProperties[0][4] },
            { category: 2, count: filteredProperties[0][5] },
            { category: 3, count: filteredProperties[0][6] },
            { category: 4, count: filteredProperties[0][7] },
          ]);
          setHotelDetails(filteredProperties); // Update this to set the fetched data
        }
      } catch (error) {
        console.error('Error fetching hotel details:', error);
        showLoginExpiredPopup();
      }
    };

    const fetchHotelInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = 'http://localhost:5000/hotel';

        const response = await axios.post(apiUrl, {
          hotel_id: localStorage.getItem('pid')
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data && response.data.info) {
          const roomsData = response.data.info.map(item => ({
            category: item[0],
            count: item[1]
          }));
          setAvailableRooms(roomsData);
        } else {
          console.error('Invalid API response format:', response.data);
          showLoginExpiredPopup();
        }
      } catch (error) {
        console.error('Error fetching hotel info:', error);
        showLoginExpiredPopup();
      }
    };

    const storedHotelDetail = JSON.parse(localStorage.getItem("HotelDetails")) || [];
    fetchBookingRecords();
    fetchHotelInfo();
    if (storedHotelDetail[0]) {
      fetchHotelDetails(storedHotelDetail[0].city, localStorage.getItem('pid'));
    }
    
    // Set loading to false once all data fetching is done
    Promise.all([fetchBookingRecords(), fetchHotelInfo(), storedHotelDetail[0] ? fetchHotelDetails(storedHotelDetail[0].city, localStorage.getItem('pid')) : Promise.resolve()])
      .then(() => setLoading(false))
      .catch(error => {
        console.error('Error during fetching:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchData = () => {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      const monthlyData = monthNames.reduce((acc, month) => {
        acc[month] = { sum: 0, count: 0 };
        return acc;
      }, {});

      const getMonthName = (dateStr) => {
        const date = new Date(dateStr);
        const month = date.getMonth(); // Months are 0-based in JavaScript Date
        return monthNames[month];
      };

      data.forEach(booking => {
        const monthName = getMonthName(booking.bookingDate);
        if (monthlyData[monthName]) {
          monthlyData[monthName].sum += parseFloat(booking.amount) || 0;
        }
      });

      const labels = monthNames;
      const dataPoints = monthNames.map(month => monthlyData[month] ? monthlyData[month].sum : 0);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Monthly Revenue',
            data: dataPoints,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
          }
        ]
      });
    };

    if (data.length) {
      fetchData();
    }
  }, [data]);

  const roomCategoryNames = ['Standard', 'Deluxe', 'Executive', 'Presidential'];

  const pieChartData1 = roomCategories.map((count, index) => ({
    name: roomCategoryNames[index],
    value: count
  }));

  const pieChartData2 = [
    { name: 'Available Rooms', value: combinedData.reduce((acc, entry) => acc + entry.availableRooms, 0) },
    { name: 'Booked Rooms', value: combinedData.reduce((acc, entry) => acc + entry.bookedRooms, 0) }
  ];

  const pieChartData3 = [
    { name: 'Cancelled', value: data.filter(i => i.cancelled === 1).length },
    { name: 'Confirmed', value: data.filter(i => i.cancelled === 0).length }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const showLoginExpiredPopup = () => {
    // Handle login expiration
    alert('Login expired. Redirecting to home page.');
    localStorage.clear();
    navigate('/');
  };

  if (loading) {
    return <Loader />; // Show loader while data is being fetched
  }

  return (
    <div className="container mx-auto p-4">
      <div className="" style={{ marginBottom: '10px' }}>
        <Button
          component={Link}
          to="/HomeMan"
          variant="outlined"
          color="primary"
          style={{ marginBottom: '20px' }}
        >
          Back
        </Button>
        <div className="">
          {hotelDetails && hotelDetails.length > 0 && hotelDetails.map(detail => (
            <RoundedBox key={detail[0]}> {/* Adjust the key based on your data structure */}
              <Typography variant="h5">{detail[1]}</Typography> {/* Adjust properties based on your data structure */}
              <Typography variant="h6" style={{ }}>{detail[3]}</Typography>
            </RoundedBox>
          ))}
        </div>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ChartContainer>
            <ChartTitle variant="h6">
              Room Availability
            </ChartTitle>
            <BarChart width={550} height={350} data={combinedData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookedRooms" stackId="stack" fill="#82ca9d" name="Booked Rooms" />
              <Bar dataKey="availableRooms" stackId="stack" fill="#8884d8" name="Available Rooms" />
            </BarChart>
          </ChartContainer>
        </Grid>

        {/* Pie Charts */}
        <Grid item xs={12} md={6}>
          <ChartContainer>
            <ChartTitle variant="h6">Room Categories</ChartTitle>
            <PieChart width={400} height={300}>
              <Pie data={pieChartData1} dataKey="value" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {pieChartData1.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ChartContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartContainer>
            <ChartTitle variant="h6">Room Availability</ChartTitle>
            <PieChart width={400} height={300}>
              <Pie data={pieChartData2} dataKey="value" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label>
                {pieChartData2.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ChartContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartContainer>
            <ChartTitle variant="h6">Booking Status</ChartTitle>
            <PieChart width={400} height={300}>
              <Pie data={pieChartData3} dataKey="value" cx="50%" cy="50%" outerRadius={100} fill="#ff7300" label>
                {pieChartData3.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ChartContainer>
        </Grid>
      </Grid>

      <Grid>
        {/* Monthly Revenue Line Chart */}
        <Grid item xs={12} md={6}>
          <ChartContainer>
            <ChartTitle variant="h6">Monthly Revenue</ChartTitle>
            <BarChart
              width={800}
              height={300}
              data={chartData.labels.map((label, index) => ({
                name: label,
                revenue: chartData.datasets[0].data[index]
              }))}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ChartContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
