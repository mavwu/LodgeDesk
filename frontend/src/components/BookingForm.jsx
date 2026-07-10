import { useState } from 'react';
import { createBooking } from '../services/bookingService';

const initialState = {
  guestName: '',
  guestEmail: '',
  guestPhone: '',
  checkInDate: '',
  checkOutDate: '',
  guestsCount: 1,
  specialRequest: '',
};

function BookingForm({ roomId }) {
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');

    try {
      await createBooking({
        ...formData,
        roomId,
      });
      setMessage('Booking request sent successfully.');
      setFormData(initialState);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="card booking-form" onSubmit={handleSubmit}>
      <h3>Request this room</h3>

      <div className="form-grid">
        <label>
          Full name
          <input name="guestName" onChange={handleChange} required value={formData.guestName} />
        </label>

        <label>
          Email
          <input
            name="guestEmail"
            onChange={handleChange}
            required
            type="email"
            value={formData.guestEmail}
          />
        </label>

        <label>
          Phone
          <input name="guestPhone" onChange={handleChange} required value={formData.guestPhone} />
        </label>

        <label>
          Number of guests
          <input
            min="1"
            name="guestsCount"
            onChange={handleChange}
            required
            type="number"
            value={formData.guestsCount}
          />
        </label>

        <label>
          Check-in
          <input
            name="checkInDate"
            onChange={handleChange}
            required
            type="date"
            value={formData.checkInDate}
          />
        </label>

        <label>
          Check-out
          <input
            name="checkOutDate"
            onChange={handleChange}
            required
            type="date"
            value={formData.checkOutDate}
          />
        </label>
      </div>

      <label>
        Special request
        <textarea
          name="specialRequest"
          onChange={handleChange}
          rows="4"
          value={formData.specialRequest}
        />
      </label>

      {message ? <p className="success-text">{message}</p> : null}
      {error ? <p className="error-text">{error}</p> : null}

      <button className="primary-button" disabled={submitting} type="submit">
        {submitting ? 'Sending...' : 'Submit booking request'}
      </button>
    </form>
  );
}

export default BookingForm;
