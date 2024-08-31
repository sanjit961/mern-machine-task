import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API calls

const CreateEmployee = () => {
  // State variables
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    designation: '',
    course: [],
    gender: '',
    image: null
  });

  const [errors, setErrors] = useState({});
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        course: checked ? [...prevState.course, value] : prevState.course.filter(item => item !== value)
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
    if (formData.course.length === 0) errors.course = 'At least one course must be selected';
    if (!formData.image) errors.image = 'Image is required';
    if (formData.image && !['image/png', 'image/jpeg'].includes(formData.image.type)) errors.image = 'Image must be a PNG or JPG file';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'course') {
        formData.course.forEach(course => formDataToSend.append('course', course));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      await axios.post('http://localhost:3000/api/users', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Employee created successfully');
      // Clear form after submission
      setFormData({
        name: '',
        email: '',
        mobileNumber: '',
        designation: '',
        course: [],
        gender: '',
        image: null
      });
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('Error creating employee');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{padding:"100px 0px 0px 0px"}}>Create Employee</h2>
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
        
        {/* Mobile */}
        <div style={styles.formGroup}>
          <label>Mobile No:</label>
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
            <label>
              <input
                type="checkbox"
                name="course"
                value="MCA"
                checked={formData.course.includes('MCA')}
                onChange={handleChange}
              />
              MCA
            </label>
            <label>
              <input
                type="checkbox"
                name="course"
                value="BCA"
                checked={formData.course.includes('BCA')}
                onChange={handleChange}
              />
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                name="course"
                value="BSC"
                checked={formData.course.includes('BSC')}
                onChange={handleChange}
              />
              BSC
            </label>
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
        <button type="submit" style={styles.button}>Submit</button>
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

export default CreateEmployee;
