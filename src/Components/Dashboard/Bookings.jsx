import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Bookings() {
    const { id } = useParams();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`https://e-ticket-server-black.vercel.app/booking/event/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBookings(response.data.result);
            } catch (error) {
                setError(error.response ? error.response.data.message : 'Error fetching bookings');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
  return (
    <div>
    <h2>Bookings for Event ID: {id}</h2>
    <ul>
        {bookings.map((booking) => (
            <li key={booking._id} className='mb-5'>
                <p>User ID: {booking.userId}</p>
                <p>Number of Tickets: {booking.numberOfTickets}</p>
                <p>Total Price: {booking.totalPrice}</p>
            </li>
        ))}
    </ul>
</div>
  )
}

export default Bookings
