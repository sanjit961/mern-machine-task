import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // State to store form values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handle form submission
  const handleLogin = (event) => {
    event.preventDefault();

    // Simple login validation (just for demonstration)
    if (username === '' || password === '') {
      alert('Please enter both username and password');
      return;
    }

    // Save username and password to localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    // Perform login logic here (e.g., call an API)
    console.log('Logging in with', { username, password });

    // Check if the credentials are correct (dummy check for demonstration)
    if (username === 'admin' && password === 'admin') {
      // Redirect to the dashboard page
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }

    // Reset form fields
    setUsername('');
    setPassword('');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login Page</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            placeholder="Enter your username"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

// Basic inline styles
const styles = {
  container: {
    width: '300px',
    margin: '200px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default Login;
