import React from 'react';
import UrlForm from '../components/UrlForm';

const Home = ({ user }) => {
  return (
    <div>
      <h1>URL Shortener</h1>
      <UrlForm user={user} />
    </div>
  );
};

export default Home;