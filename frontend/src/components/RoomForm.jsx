import { useEffect, useState } from 'react';

const emptyRoom = {
  name: '',
  slug: '',
  type: 'Standard',
  pricePerNight: '',
  capacity: 1,
  status: 'AVAILABLE',
  imageUrl: '',
  shortDescription: '',
  description: '',
  amenities: '',
};

function RoomForm({ initialRoom, onSubmit, submitting }) {
  const [formData, setFormData] = useState(emptyRoom);

  useEffect(() => {
    if (!initialRoom) {
      setFormData(emptyRoom);
      return;
    }

    setFormData({
      ...initialRoom,
      amenities: initialRoom.amenities.join(', '),
    });
  }, [initialRoom]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      ...formData,
      amenities: formData.amenities
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    });
  }

  return (
    <form className="card room-form" onSubmit={handleSubmit}>
      <h3>{initialRoom ? 'Edit room' : 'Add room'}</h3>

      <div className="form-grid">
        <label>
          Room name
          <input name="name" onChange={handleChange} required value={formData.name} />
        </label>

        <label>
          Slug
          <input name="slug" onChange={handleChange} required value={formData.slug} />
        </label>

        <label>
          Room type
          <input name="type" onChange={handleChange} required value={formData.type} />
        </label>

        <label>
          Price per night
          <input
            min="0"
            name="pricePerNight"
            onChange={handleChange}
            required
            type="number"
            value={formData.pricePerNight}
          />
        </label>

        <label>
          Capacity
          <input
            min="1"
            name="capacity"
            onChange={handleChange}
            required
            type="number"
            value={formData.capacity}
          />
        </label>

        <label>
          Status
          <select name="status" onChange={handleChange} value={formData.status}>
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="OCCUPIED">OCCUPIED</option>
            <option value="MAINTENANCE">MAINTENANCE</option>
          </select>
        </label>
      </div>

      <label>
        Image URL
        <input name="imageUrl" onChange={handleChange} value={formData.imageUrl} />
      </label>

      <label>
        Short description
        <input
          name="shortDescription"
          onChange={handleChange}
          required
          value={formData.shortDescription}
        />
      </label>

      <label>
        Full description
        <textarea
          name="description"
          onChange={handleChange}
          required
          rows="4"
          value={formData.description}
        />
      </label>

      <label>
        Amenities
        <input
          name="amenities"
          onChange={handleChange}
          placeholder="Wi-Fi, Balcony, Desk"
          value={formData.amenities}
        />
      </label>

      <button className="primary-button" disabled={submitting} type="submit">
        {submitting ? 'Saving...' : initialRoom ? 'Update room' : 'Create room'}
      </button>
    </form>
  );
}

export default RoomForm;
