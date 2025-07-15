import React, { useState, useEffect } from "react";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import EventFilter from "./components/EventFilter";

function App() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  // ✅ NEW: filters state
  const [filters, setFilters] = useState({
    title: "",
    date: "",
    location: "",
  });

  useEffect(() => {
    fetch("http://localhost:3001/events")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched events:", data);
        setEvents(data);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const addEvent = (newEvent) => {
    fetch("http://localhost:3001/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((createdEvent) => setEvents([...events, createdEvent]));
  };

  const deleteEvent = (id) => {
    fetch(`http://localhost:3001/events/${id}`, { method: "DELETE" })
      .then(() => setEvents(events.filter((e) => e.id !== id)));
  };

  const updateEvent = (updatedEvent) => {
    fetch(`http://localhost:3001/events/${updatedEvent.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEvent),
    })
      .then((res) => res.json())
      .then((data) =>
        setEvents(events.map((e) => (e.id === data.id ? data : e)))
      );
    setEditingEvent(null);
  };

  // ✅ NEW: filteredEvents computed here
  const filteredEvents = events.filter((event) => {
    const matchTitle = event.title.toLowerCase().includes(filters.title);
    const matchLocation = event.location.toLowerCase().includes(filters.location);
    const matchDate = filters.date ? event.date === filters.date : true;
    return matchTitle && matchLocation && matchDate;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Event Manager</h1>

      <EventFilter filters={filters} setFilters={setFilters} />

      <EventForm
        onSubmit={addEvent}
        onUpdate={updateEvent}
        editingEvent={editingEvent}
      />

      <EventList
        events={filteredEvents}
        onDelete={deleteEvent}
        onEdit={setEditingEvent}
      />
    </div>
  );
}

export default App;
