import React from 'react';

const Dashboard = () => {
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1>Dashboard</h1>
      </header>
      
      {/* Main Content */}
      <main style={styles.main}>
        <h2>Welcome Admin</h2>
      </main>
    </div>
  );
};

// Basic inline styles
const styles = {
  container: {
    textAlign: 'center', // Center-aligns all text in the container
  },
  header: {
    backgroundColor: '#007BFF', // Header background color
    color: '#fff', // Header text color
    padding: '20px', // Padding for header
    marginTop:"100px"
  },
  main: {
    marginTop: '50px', // Space between header and main content
    fontSize: '24px', // Font size for "Welcome Admin"
    color: '#333', // Text color for main content
  },
};

export default Dashboard;
