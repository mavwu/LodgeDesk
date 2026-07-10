import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { clearSession, getStoredAdmin } from '../services/authService';

function AdminLayout() {
  const navigate = useNavigate();
  const admin = getStoredAdmin();

  function handleLogout() {
    clearSession();
    navigate('/admin/login');
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <p className="eyebrow">Signed in as</p>
          <h2>{admin?.name || 'Admin'}</h2>
          <p>{admin?.email}</p>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/rooms">Rooms</NavLink>
          <NavLink to="/admin/bookings">Bookings</NavLink>
        </nav>

        <button className="ghost-button" onClick={handleLogout} type="button">
          Log out
        </button>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
