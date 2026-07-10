import { useEffect, useState } from 'react';
import StatsCard from '../components/StatsCard';
import { getDashboardStats } from '../services/dashboardService';

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (requestError) {
        setError(requestError.message);
      }
    }

    loadStats();
  }, []);

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  if (!stats) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="stack-lg">
      <section className="stats-grid">
        <StatsCard label="Total rooms" value={stats.totalRooms} />
        <StatsCard label="Total bookings" value={stats.totalBookings} />
        <StatsCard label="Pending bookings" value={stats.pendingBookings} />
        <StatsCard label="Occupancy rate" value={`${stats.occupancyRate}%`} />
      </section>

      <section className="card">
        <div className="card-row">
          <h2>Recent bookings</h2>
          <p>{stats.approvedBookings} approved bookings</p>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Guest</th>
                <th>Room</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.guestName}</td>
                  <td>{booking.room?.name}</td>
                  <td>{booking.status}</td>
                  <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
