import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { getRoomBySlug } from '../services/roomService';

function RoomDetailsPage() {
  const { slug } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadRoom() {
      try {
        const data = await getRoomBySlug(slug);
        setRoom(data);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }

    loadRoom();
  }, [slug]);

  if (loading) {
    return <p>Loading room details...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  if (!room) {
    return <p>Room not found.</p>;
  }

  return (
    <div className="details-grid">
      <section className="stack-md">
        <img className="details-image" src={room.imageUrl} alt={room.name} />
        <div className="card">
          <p className="eyebrow">{room.type}</p>
          <h1>{room.name}</h1>
          <p>{room.description}</p>
          <div className="meta-row">
            <span>K{room.pricePerNight}/night</span>
            <span>{room.capacity} guests</span>
            <span>{room.status}</span>
          </div>
          <ul className="amenities-list">
            {room.amenities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <BookingForm roomId={room.id} />
    </div>
  );
}

export default RoomDetailsPage;
