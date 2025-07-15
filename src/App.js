import React, { useState, useEffect } from "react";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import EventFilter from "./components/EventFilter";

function App() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const [filters, setFilters] = useState({
    title: "",
    date: "",
    location: "",
  });

  // ✅ Base API URL (MockAPI)
  const API_URL = "https://68767f48814c0dfa653c51c0.mockapi.io/api/v1/events";

  // Fetch events on load
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched events:", data);
        setEvents(data);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  // Add new event
  const addEvent = (newEvent) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((createdEvent) => setEvents([...events, createdEvent]));
  };

  // Delete event
  const deleteEvent = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setEvents(events.filter((e) => e.id !== id)));
  };

  // Update event
  const updateEvent = (updatedEvent) => {
    fetch(`${API_URL}/${updatedEvent.id}`, {
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

  // Filtered events based on filters state
  const filteredEvents = events.filter((event) => {
    const matchTitle = event.title.toLowerCase().includes(filters.title.toLowerCase());
    const matchLocation = event.location.toLowerCase().includes(filters.location.toLowerCase());
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
