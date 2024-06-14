/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";

function Payment() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from local storage
                const userId = localStorage.getItem("_id"); // Retrieve the user ID from local storage
                const response = await axios.get(`https://e-ticket-server-black.vercel.app/booking/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const bookingsData = response.data.result;
                setBookings(bookingsData);

                // Calculate the total price
                const price = bookingsData.reduce((acc, booking) => acc + booking.totalPrice, 0);
                setTotalPrice(price);
            } catch (error) {
                setError(error.response ? error.response.data.message : 'Error fetching bookings');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleRemoveBooking = async (bookingId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://e-ticket-server-black.vercel.app/booking/${bookingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Remove the booking from the state
            const updatedBookings = bookings.filter(booking => booking._id !== bookingId);
            setBookings(updatedBookings);

            // Update the total price
            const price = updatedBookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
            setTotalPrice(price);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error removing booking');
        }
    };

    const handlePayment = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem("_id");
            const tran_id = `tran_${Date.now()}`;

            const data = {
                amount: totalPrice,
                currency: "BDT",
                tran_id: tran_id,
                success_url: " http://localhost:5173/payment-success",
                fail_url: " http://localhost:5173/payment-fail",
                cancel_url: " http://localhost:5173/payment-cancel"
            };

            const response = await axios.get("https://e-ticket-server-black.vercel.app/init", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.GatewayPageURL) {
                window.location.href = response.data.GatewayPageURL;
            } else {
                setError("Failed to initiate payment");
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : "Error initiating payment");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">My Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found</p>
            ) : (
                <div>
                    <ul>
                        {bookings.map((booking) => (
                            <li key={booking._id} className="mb-4">
                                <div className="card card-compact w-full bg-base-100 shadow-xl">
                                    <div className="card-body">
                                        <h3 className="card-title">Event ID: {booking.eventId}</h3>
                                        <p>Number of Tickets: {booking.numberOfTickets}</p>
                                        <p>Total Price: ${booking.totalPrice}</p>
                                        <button
                                            onClick={() => handleRemoveBooking(booking._id)}
                                            className="btn btn-danger"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3 className="text-xl font-bold mt-4">Total Payable: ${totalPrice}</h3>
                    <button onClick={handlePayment} className="btn btn-primary">
                        Proceed to Payment
                    </button>
                </div>
            )}
        </div>
    );
}

export default Payment;
