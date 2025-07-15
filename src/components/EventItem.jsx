import React from "react";

function EventItem({ event, onDelete, onEdit }) {
  return (
    <li className="event-item" style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Location: {event.location}</p>
      <button onClick={() => onEdit(event)}>Edit</button>
      <button onClick={() => onDelete(event.id)}>Delete</button>
    </li>
  );
}

export default EventItem;
