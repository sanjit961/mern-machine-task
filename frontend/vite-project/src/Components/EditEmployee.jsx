import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API calls
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate hooks

const EditEmployee = () => {
  const { id } = useParams(); // Get employee ID from URL parameters
  const navigate = useNavigate(); // Hook to navigate programmatically

  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    designation: '',
    course: [],  // Changed from string to array
    gender: '',
    image: null
  });
  
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    // Fetch employee data when the component mounts
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
        alert('Error fetching employee');
      }
    };
    fetchEmployee();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        course: checked
          ? [...prevState.course, value] // Add value to the array if checked
          : prevState.course.filter(course => course !== value) // Remove value from the array if unchecked
      }));
    } else if (type === 'file') {
      setFormData(prevState => ({
        ...prevState,
        image: files[0]
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  // Validate form data
  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.mobileNumber) errors.mobileNumber = 'Mobile number is required';
    if (!/^\d{10}$/.test(formData.mobileNumber)) errors.mobileNumber = 'Mobile number must be 10 digits';
    if (!formData.designation) errors.designation = 'Designation is required';
    if (!formData.gender) errors.gender = 'Gender is required';
    if (!formData.course.length) errors.course = 'At least one course must be selected';
    // if (formData.image && !['image/png', 'image/jpeg'].includes(formData.image.type)) errors.image = 'Image must be a PNG or JPG file';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // Ensure form validation passes before proceeding
  
    const formDataToSend = new FormData();
  
    // Append form data to FormData object
    Object.keys(formData).forEach(key => {
      if (key === 'image' && formData[key]) {
        // Only append image if a new file is selected (checking if the image field is not empty)
        formDataToSend.append(key, formData[key]);
      } else if (key === 'course') {
        // Append courses as multiple values
        formData[key].forEach(course => formDataToSend.append('course', course));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
  
    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/${id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (response.status === 200) {
        alert('Employee updated successfully!');
        navigate('/employee'); // Redirect or perform any additional actions after a successful update
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee. Please try again.');
    }
  };
  
  return (
    <div style={styles.container}>
      <h2 style={{padding:"100px 0px 0px 0px"}}>Edit Employee</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Name */}
        <div style={styles.formGroup}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.name && <p style={styles.error}>{errors.name}</p>}
        </div>
        
        {/* Email */}
        <div style={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}
        </div>
        
        {/* Mobile Number */}
        <div style={styles.formGroup}>
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.mobileNumber && <p style={styles.error}>{errors.mobileNumber}</p>}
        </div>
        
        {/* Designation */}
        <div style={styles.formGroup}>
          <label>Designation:</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.designation && <p style={styles.error}>{errors.designation}</p>}
        </div>
        
        {/* Gender */}
        <div style={styles.formGroup}>
          <label>Gender:</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
          {errors.gender && <p style={styles.error}>{errors.gender}</p>}
        </div>
        
         {/* Course */}
         <div style={styles.formGroup}>
          <label>Course:</label>
          <div>
            {['MCA', 'BCA', 'BSC'].map((course) => (
              <label key={course}>
                <input
                  type="checkbox"
                  name="course"
                  value={course}
                  checked={formData.course.includes(course)}
                  onChange={handleChange}
                />
                {course}
              </label>
            ))}
          </div>
          {errors.course && <p style={styles.error}>{errors.course}</p>}
        </div>
        
        {/* Image */}
        <div style={styles.formGroup}>
          <label>Image:</label>
          <input
            type="file"
            name="image"
            accept=".png, .jpg, .jpeg"
            onChange={handleChange}
            style={styles.input}
          />
          {errors.image && <p style={styles.error}>{errors.image}</p>}
        </div>
        
        {/* Submit Button */}
        <button type="submit" style={styles.button}>Update</button>
      </form>
    </div>
  );
};

// Basic inline styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
};

export default EditEmployee;
