import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API requests
import { useNavigate } from "react-router-dom";

const Employee = () => {
  const [employees, setEmployees] = useState([]); // State to store employee data
  const [filteredEmployees, setFilteredEmployees] = useState([]); // State to store filtered employee data
  const [error, setError] = useState(null); // State to store any errors
  const [count, setCount] = useState(0); // State to store employee count
  const [search, setSearch] = useState(''); // State to store search query
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Fetch employee data from API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users"); // Adjust the API endpoint as needed
        setEmployees(response.data);
        setFilteredEmployees(response.data); // Initialize filteredEmployees with fetched data
        setCount(response.data.length); // Update the count with the number of employees
      } catch (error) {
        setError("Failed to fetch employee data.");
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearch(query);

    // Filter employees based on the search query
    const filtered = employees.filter(employee =>
      employee.name.toLowerCase().includes(query.toLowerCase()) ||
      employee.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(filtered);
    setCount(filtered.length); // Update count based on filtered results
  };

  // Handle Edit action
  const handleEdit = (id) => {
    console.log("Edit employee with id:", id);
    navigate(`/edit-employee/${id}`); // Navigate to the EditEmployee page with the employee ID
  };

  // Handle Delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`); // Adjust the API endpoint as needed
      setEmployees(employees.filter((employee) => employee._id !== id)); // Update the state
      setFilteredEmployees(filteredEmployees.filter((employee) => employee._id !== id)); // Update filtered state
      setCount(filteredEmployees.length - 1); // Decrease the count
      alert("Employee deleted successfully");
    } catch (error) {
      setError("Failed to delete employee.");
      console.error("Error deleting employee:", error);
    }
  };

  // Handle Create Employee button click
  const handleCreateEmployee = () => {
    navigate("/create-employee"); // Navigate to the CreateEmployee page
  };

  return (
    <div style={styles.container} className="container">
      <h2>Employee List</h2>
      <div style={styles.header}>
        <div style={styles.countContainer}>
          <span style={styles.countText}>Employee Count: {count}</span>
        </div>
        <button onClick={handleCreateEmployee} style={styles.createButton}>
          Create Employee
        </button>
      </div>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
      </div>
      <table style={styles.table} className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td><img src={`http://localhost:3000/uploads/${employee.image}`} alt="Employee" style={styles.image} /></td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobileNumber}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course}</td> {/* Assuming course is an array */}
              <td>{new Date(employee.createdAt).toLocaleDateString()}</td> {/* Format date */}
              <td>
                <button onClick={() => handleEdit(employee._id)} style={styles.button}>Edit</button>
                <button onClick={() => handleDelete(employee._id)} style={styles.button}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Basic inline styles
const styles = {
  container: {
    padding: '100px 20px 20px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  createButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#28a745',
    color: '#fff',
  },
  countContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  countText: {
    fontSize: '18px',
    marginRight: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  button: {
    padding: '5px 10px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: '#fff',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
  searchContainer: {
    marginBottom: '20px',
  },
  searchInput: {
    padding: '10px',
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
  },
  image: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
};

export default Employee;
