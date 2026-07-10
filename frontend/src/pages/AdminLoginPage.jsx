import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

function AdminLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'admin@lodgedesk.demo',
    password: 'admin123',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await login(formData);
      navigate('/admin/dashboard');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-wrapper">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Admin access</p>
        <h1>Sign in</h1>
        <p>Use the seeded demo credentials to access the dashboard.</p>

        <label>
          Email
          <input name="email" onChange={handleChange} type="email" value={formData.email} />
        </label>

        <label>
          Password
          <input
            name="password"
            onChange={handleChange}
            type="password"
            value={formData.password}
          />
        </label>

        {error ? <p className="error-text">{error}</p> : null}

        <button className="primary-button" disabled={submitting} type="submit">
          {submitting ? 'Signing in...' : 'Log in'}
        </button>
      </form>
    </section>
  );
}

export default AdminLoginPage;
