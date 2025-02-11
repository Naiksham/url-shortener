import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Analytics = ({ alias, user }) => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`/api/analytics/${alias}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setAnalytics(response.data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
      }
    };

    if (alias) fetchAnalytics();
  }, [alias, user]);

  if (!analytics) return <p>Loading analytics...</p>;

  return (
    <div>
      <h3>Analytics for {alias}</h3>
      <p>Total Clicks: {analytics.totalClicks}</p>
      <p>Unique Users: {analytics.uniqueUsers}</p>
      <h4>Clicks by Date:</h4>
      <ul>
        {analytics.clicksByDate.map((item, index) => (
          <li key={index}>
            {item.date}: {item.clicks} clicks
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Analytics;