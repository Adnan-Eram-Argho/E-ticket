
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DetailedPage() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [numberOfTickets, setNumberOfTickets] = useState(1);
    const [bookingMessage, setBookingMessage] = useState(null);
  
    useEffect(() => {
      const fetchEvent = async () => {
        try {
          const token = localStorage.getItem('token'); // Retrieve the token from local storage
          const response = await axios.get(`https://e-ticket-server-black.vercel.app/event/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setEvent(response.data.result);
        } catch (error) {
          setError(error.response ? error.response.data.message : 'Error fetching event');
        } finally {
          setLoading(false);
        }
      };
  
      fetchEvent();
    }, [id]);
  
    const handleBooking = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        const response = await axios.post(
          'https://e-ticket-server-black.vercel.app/booking',
          { eventId: id, numberOfTickets },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setBookingMessage(response.data.message);
        
      } catch (error) {
        setBookingMessage(error.response ? error.response.data.message : 'Error making booking');
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
    <div className="card card-compact w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{event.title}</h2>
        <p>{event.description}</p>
        <p>Date: {new Date(event.date).toLocaleDateString()}</p>
        <p>Location: {event.location}</p>
        <p>Price: {event.isFree ? "Free" : `$${event.price}`}</p>
        <p>Capacity: {event.capacity}</p>
        <p>Booked Tickets: {event.bookedTickets}</p>
        <div className="card-actions justify-end">
          <input
            type="number"
            value={numberOfTickets}
            onChange={(e) => setNumberOfTickets(e.target.value)}
            min="1"
            max={event.capacity - event.bookedTickets}
            className="input input-bordered w-full max-w-xs"
          />
          <button onClick={handleBooking} className="btn btn-primary">Book Now</button>
        </div>
        {bookingMessage && <p>{bookingMessage}</p>}
      </div>
    </div>
  </div>
  )
}

export default DetailedPage
