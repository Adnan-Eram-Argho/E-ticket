/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"


function EventCard({event}) {
    
  return (
    <div className="card card-compact w-72 bg-base-100 shadow-xl">
   
    <div className="card-body">
      <h2 className="card-title">{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Location: {event.location}</p>
      <p>Price: {event.isFree ? "Free" : `$${event.price}`}</p>
      <p>Capacity: {event.capacity}</p>
      <p>Booked Tickets: {event.bookedTickets}</p>
      <div className="card-actions justify-end">
        <Link to={`details/${event?._id}`} className="btn btn-primary">See detail</Link>
        <Link to={`bookings/${event?._id}`} className="btn btn-primary">See bookings</Link>
      </div>
    </div>
  </div>
  )
}

export default EventCard
