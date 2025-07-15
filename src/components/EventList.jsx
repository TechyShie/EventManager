import React from "react";
import EventItem from "./EventItem";

function EventList({ events, onDelete, onEdit }) {
  if (events.length === 0) {
    return <p>No events yet.</p>;
  }

  return (
    <ul>
      {events.map((event) => (
        <EventItem
          key={event.id}
          event={event}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default EventList;
