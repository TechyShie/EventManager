import React, { useState, useEffect } from "react";

function EventForm({ onSubmit, onUpdate, editingEvent }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    banner: "" // 🆕
  });

  useEffect(() => {
    if (editingEvent) {
      setFormData(editingEvent);
    }
  }, [editingEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      onUpdate(formData);
    } else {
      onSubmit(formData);
    }
    setFormData({ title: "", date: "", location: "", description: "", banner: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} required />
      <input name="date" type="date" value={formData.date} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      <input name="banner" placeholder="Banner Image URL" value={formData.banner} onChange={handleChange} />
      <button type="submit">{editingEvent ? "Update Event" : "Add Event"}</button>
    </form>
  );
}

export default EventForm;
