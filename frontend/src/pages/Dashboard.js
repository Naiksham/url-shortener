import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Analytics from '../components/Analytics';

const Dashboard = ({ user }) => {
  const [urls, setUrls] = useState([]);
  const [selectedAlias, setSelectedAlias] = useState('');

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get('/api/analytics/overall', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUrls(response.data.urls);
      } catch (err) {
        console.error('Error fetching URLs:', err);
      }
    };

    fetchUrls();
  }, [user]);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Your Short URLs</h2>
      <ul>
        {urls.map((url) => (
          <li key={url.shortUrl} onClick={() => setSelectedAlias(url.customAlias)}>
            {url.shortUrl} - {url.totalClicks} clicks
          </li>
        ))}
      </ul>
      {selectedAlias && <Analytics alias={selectedAlias} user={user} />}
    </div>
  );
};

export default Dashboard;