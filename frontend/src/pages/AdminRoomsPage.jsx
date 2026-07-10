import { useEffect, useState } from 'react';
import RoomForm from '../components/RoomForm';
import {
  createAdminRoom,
  deleteAdminRoom,
  getAdminRooms,
  updateAdminRoom,
} from '../services/roomService';

function AdminRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function loadRooms() {
    try {
      const data = await getAdminRooms();
      setRooms(data);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  useEffect(() => {
    loadRooms();
  }, []);

  async function handleSubmit(payload) {
    setSaving(true);
    setError('');

    try {
      if (activeRoom) {
        await updateAdminRoom(activeRoom.id, payload);
      } else {
        await createAdminRoom(payload);
      }

      setActiveRoom(null);
      await loadRooms();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(roomId) {
    if (!window.confirm('Delete this room?')) {
      return;
    }

    try {
      await deleteAdminRoom(roomId);
      await loadRooms();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <div className="admin-grid">
      <RoomForm initialRoom={activeRoom} onSubmit={handleSubmit} submitting={saving} />

      <section className="card">
        <div className="card-row">
          <h2>Room list</h2>
          <button className="ghost-button" onClick={() => setActiveRoom(null)} type="button">
            New room
          </button>
        </div>

        {error ? <p className="error-text">{error}</p> : null}

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Status</th>
                <th>Bookings</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
                  <td>K{room.pricePerNight}</td>
                  <td>{room.status}</td>
                  <td>{room.bookingsCount}</td>
                  <td className="actions-cell">
                    <button className="text-button" onClick={() => setActiveRoom(room)} type="button">
                      Edit
                    </button>
                    <button
                      className="text-button danger-text"
                      onClick={() => handleDelete(room.id)}
                      type="button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminRoomsPage;
