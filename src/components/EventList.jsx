import React from "react";

function EventList({ events, onDelete, onEdit }) {
  return (
    <div className="event-list">
      {events.map((event) => (
        <div key={event.id} className="event-card">
          {/* 🖼️ Banner image */}
          {event.banner && (
            <img src={event.banner} alt={event.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
          )}
          <h3>{event.title}</h3>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p>{event.description}</p>
          <button onClick={() => onEdit(event)}>✏️ Edit</button>
          <button onClick={() => onDelete(event.id)}>🗑️ Delete</button>
        </div>
      ))}
    </div>
  );
}

export default EventList;
