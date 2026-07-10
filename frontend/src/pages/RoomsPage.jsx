import { useEffect, useState } from 'react';
import RoomCard from '../components/RoomCard';
import { getRooms } from '../services/roomService';

function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadRooms() {
      try {
        const data = await getRooms();
        setRooms(data);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }

    loadRooms();
  }, []);

  return (
    <div className="stack-lg">
      <section className="hero-banner">
        <p className="eyebrow">Lodge booking demo</p>
        <h1>Simple room browsing and admin management for a small lodge.</h1>
        <p>
          Guests can browse rooms and request bookings. Admins can log in, manage rooms,
          review bookings, and update statuses from one dashboard.
        </p>
      </section>

      {loading ? <p>Loading rooms...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}

      <section className="room-grid">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </section>
    </div>
  );
}

export default RoomsPage;
