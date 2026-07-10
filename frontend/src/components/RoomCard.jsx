import { Link } from 'react-router-dom';

function RoomCard({ room }) {
  return (
    <article className="card room-card">
      <img className="room-card-image" src={room.imageUrl} alt={room.name} />
      <div className="card-body">
        <div className="card-row">
          <h3>{room.name}</h3>
          <span className="price">K{room.pricePerNight}/night</span>
        </div>
        <p>{room.shortDescription}</p>
        <div className="meta-row">
          <span>{room.type}</span>
          <span>{room.capacity} guests</span>
          <span>{room.status}</span>
        </div>
        <Link className="primary-button" to={`/rooms/${room.slug}`}>
          View details
        </Link>
      </div>
    </article>
  );
}

export default RoomCard;
