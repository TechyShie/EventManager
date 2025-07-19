import './App.css';
import React, { useState, useEffect } from "react";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import EventFilter from "./components/EventFilter";

function App() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [filters, setFilters] = useState({
    title: "",
    date: "",
    location: "",
  });

  const API_URL = "https://68767f48814c0dfa653c51c0.mockapi.io/api/v1/events";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setEvents)
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const addEvent = (newEvent) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((createdEvent) => {
        setEvents([...events, createdEvent]);
        setShowForm(false);
      });
  };

  const deleteEvent = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setEvents(events.filter((e) => e.id !== id)));
  };

  const updateEvent = (updatedEvent) => {
    fetch(`${API_URL}/${updatedEvent.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEvent),
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(events.map((e) => (e.id === data.id ? data : e)));
        setEditingEvent(null);
        setShowForm(false);
      });
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const filteredEvents = events.filter((event) => {
    const matchTitle = event.title.toLowerCase().includes(filters.title.toLowerCase());
    const matchLocation = event.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchDate = filters.date ? event.date === filters.date : true;
    return matchTitle && matchLocation && matchDate;
  });

  return (
    <div className="app">
      <h1 className="event-header">Event Manager</h1>
      <EventFilter filters={filters} setFilters={setFilters} />
      <button onClick={() => {
        setEditingEvent(null);
        setShowForm((prev) => !prev);
      }}>
        {showForm ? "Close Form" : "Create New Event"}
      </button>
      {showForm && (
        <EventForm
          onSubmit={addEvent}
          onUpdate={updateEvent}
          editingEvent={editingEvent}
        />
      )}
      <EventList
        events={filteredEvents}
        onDelete={deleteEvent}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
