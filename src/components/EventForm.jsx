import React, { useState, useEffect } from "react";

function EventForm({ onSubmit, onUpdate, editingEvent }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDescription(editingEvent.description);
      setDate(editingEvent.date);
      setLocation(editingEvent.location);
    } else {
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
    }
  }, [editingEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = { title, description, date, location };
    if (editingEvent) {
      onUpdate({ ...eventData, id: editingEvent.id });
    } else {
      onSubmit(eventData);
    }
    setTitle("");
    setDescription("");
    setDate("");
    setLocation("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <button type="submit">
        {editingEvent ? "Update Event" : "Add Event"}
      </button>
    </form>
  );
}

export default EventForm;
