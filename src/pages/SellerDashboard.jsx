import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "reactstrap"; // Using Reactstrap for styling (optional)

const SellerDashboard = () => {
  const [bookings, setBookings] = useState([]); // State to hold booking data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch bookings when component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("access_token"); // Get JWT token from localStorage
        const response = await axios.get("http://localhost:8000/bookings/dashboard/seller/", {
          headers: { Authorization: `Bearer ${token}` }, // Add token to request headers
        });
        setBookings(response.data); // Set bookings data
      } catch (err) {
        setError(err.data);
        console.log(err);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchDashboardData();
  }, []);

  // Loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Render the dashboard table
  return (
    <div className="seller-dashboard">
      <h1><center>Seller Dashboard</center></h1>
      <Table striped>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Package Name</th>
            <th>User Name</th>
            <th>Phone Number</th>
            <th>Booking Date</th>
            <th>Hotels</th>
            <th>Activities</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{booking.package_name}</td>
              <td>{booking.user_full_name}</td>
              <td>{booking.user_phone_number}</td>
              <td>{new Date(booking.booking_date).toLocaleString()}</td>
              <td>
                {booking.hotel_names.length > 0
                  ? booking.hotel_names.join(", ")
                  : "N/A"}
              </td>
              <td>
                {booking.activity_names.length > 0
                  ? booking.activity_names.join(", ")
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SellerDashboard;