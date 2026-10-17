// App.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:3000/api';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/auth/me`, { withCredentials: true })
      .then(res => { console.log('ME:', res.data); setUser(res.data.user); })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
    setUser(null);
  };

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      // axios nahi, seedha link / window.location
      <a href={`${API}/auth/google`}>
        <button>Continue with Google</button>
      </a>
    );
  }

  return (
    <div>
      <img src={user.avatar} width={60} referrerPolicy="no-referrer" />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}