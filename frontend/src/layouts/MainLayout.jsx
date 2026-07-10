import { Link, NavLink, Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <Link className="brand" to="/">
          LodgeDesk
        </Link>

        <nav className="main-nav">
          <NavLink to="/">Rooms</NavLink>
          <NavLink to="/admin/login">Admin</NavLink>
        </nav>
      </header>

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
