import React from "react";

function EventFilter({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value.toLowerCase(),
    }));
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        name="title"
        placeholder="Search by title"
        onChange={handleChange}
        style={{ marginRight: "10px" }}
      />
      <input
        type="date"
        name="date"
        onChange={handleChange}
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        name="location"
        placeholder="Filter by location"
        onChange={handleChange}
      />
    </div>
  );
}

export default EventFilter;
