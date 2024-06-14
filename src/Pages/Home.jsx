import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "../Components/EventCard";

function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const token = localStorage.getItem('token'); // Retrieve the token from local storage
          const response = await axios.get('http://localhost:5000/event', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setEvents(response.data.result);
        } catch (error) {
          setError(error.response ? error.response.data.message : 'Error fetching events');
        } finally {
          setLoading(false);
        }
      };
  
      fetchEvents();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
  return (
    <div>
    <h1 className="text-neutral text-3xl text-center">See All the Available Events</h1>
    <div className="events-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-items-center">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  </div>
  )
}

export default Home
