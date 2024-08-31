import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom

// Import your logo image (replace 'logo.png' with your logo file path)
import logo from './logo.png';

const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Check if the user is logged in by checking local storage
  const isLoggedIn = localStorage.getItem('username') && localStorage.getItem('password');
  const username = localStorage.getItem('username'); // Retrieve the username

  // Logout handler
  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('username');
    localStorage.removeItem('password');

    // Redirect to the login page
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      {/* Container for the navbar content */}
      <div style={styles.navContent}>
        {/* Logo */}
        <div style={styles.logoContainer}>
          <img src={logo} alt="Logo" style={styles.logo} />
        </div>

        {/* Show navigation links only if the user is logged in */}
        {isLoggedIn && (
          <ul style={styles.navLinks}>
            <li style={styles.navItem}>
              <Link to="/" style={styles.link}>Home</Link> {/* Home now points to the Login page */}
            </li>
            <li style={styles.navItem}>
              <Link to="/employee" style={styles.link}>Employee List</Link>
            </li>
            {/* Display logged-in user's name */}
            {username && (
              <li style={styles.navItem}>
                <span style={styles.username}>{username}</span>
              </li>
            )}
            <li style={styles.navItem}>
              <button onClick={handleLogout} style={styles.linkButton}>Logout</button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

// Basic inline styles for the Navbar
const styles = {
  navbar: {
    backgroundColor: '#007BFF',
    color: '#fff',
    position: 'fixed', // Makes the navbar static at the top
    width: '100%',
    top: 0,
    zIndex: 1000, // Ensures the navbar stays on top of other content
    padding: '10px 0', // Added padding to navbar for spacing
  },
  navContent: {
    display: 'flex',
    alignItems: 'center', // Align items to the center horizontally
    padding: '0 20px', // Adjusted padding for content spacing
    justifyContent: 'space-between', // Space between logo and nav links
  },
  logoContainer: {
    marginBottom: '0', // Removed margin to align with nav links
  },
  logo: {
    height: '40px', // Adjust the size of the logo
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '30px', // Increased gap for more spacing between links
    margin: 0,
    padding: 0,
    alignItems: 'center', // Align items vertically in the center
  },
  navItem: {
    margin: '0 10px', // Added margin to each nav item for better spacing
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
  },
  username: {
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  linkButton: {
    color: '#fff',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    textDecoration: 'underline',
  },
};

export default Navbar;
