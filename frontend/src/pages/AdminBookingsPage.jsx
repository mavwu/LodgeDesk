import { useEffect, useState } from 'react';
import BookingStatusSelect from '../components/BookingStatusSelect';
import { getAdminBookings, updateBookingStatus } from '../services/bookingService';

function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  async function loadBookings() {
    try {
      const data = await getAdminBookings();
      setBookings(data);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function handleStatusChange(bookingId, status) {
    try {
      const updated = await updateBookingStatus(bookingId, status);
      setBookings((current) =>
        current.map((booking) => (booking.id === bookingId ? updated : booking))
      );
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <section className="card">
      <div className="card-row">
        <h2>Booking management</h2>
        <p>{bookings.length} booking requests</p>
      </div>

      {error ? <p className="error-text">{error}</p> : null}

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Guest</th>
              <th>Room</th>
              <th>Dates</th>
              <th>Guests</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>
                  <strong>{booking.guestName}</strong>
                  <div>{booking.guestEmail}</div>
                  <div>{booking.guestPhone}</div>
                </td>
                <td>{booking.room?.name}</td>
                <td>
                  {new Date(booking.checkInDate).toLocaleDateString()} to{' '}
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </td>
                <td>{booking.guestsCount}</td>
                <td>
                  <BookingStatusSelect booking={booking} onChange={handleStatusChange} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminBookingsPage;
