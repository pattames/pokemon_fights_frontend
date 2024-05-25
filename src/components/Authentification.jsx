import { useState } from 'react';
import MainContent from './MainContent';  

const Authentication = ({ onAuthenticate }) => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleAuthenticate = () => {
    if (username.trim() !== '') {
      onAuthenticate(username);
    } else {
      alert('Please enter a username');
    }
  };

  return (
    <div>
      <h2>Authentication</h2>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={handleUsernameChange}
      />
      <button onClick={handleAuthenticate}>Submit</button>
{/*       {username.trim() !== '' && <MainContent username={username} />}  */}
    </div>
  );
};

export default Authentication;