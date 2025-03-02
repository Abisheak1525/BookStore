import React, { useState, useEffect } from 'react';
import './UserTable.css';
import AdminSidebar from '../AdminModule/AdminSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Ensure axios is installed

const UserTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9001/user-management');
      setUserData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [searchTerm]);

  const handleFilter = () => {
    const filtered = userData.filter(user => {
      const firstName = user.firstName ? user.firstName.toLowerCase() : '';
      const lastName = user.lastName ? user.lastName.toLowerCase() : '';
      const email = user.email ? user.email.toLowerCase() : '';
      const phoneNo = user.phoneNo ? user.phoneNo.toLowerCase() : '';
  
      return (
        firstName.includes(searchTerm.toLowerCase()) ||
        lastName.includes(searchTerm.toLowerCase()) ||
        email.includes(searchTerm.toLowerCase()) ||
        phoneNo.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredData(filtered);
  };
  
  const handleReset = () => {
    setSearchTerm('');
    setFilteredData(userData); 
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:9001/user-management/${userId}`);
      setFilteredData(filteredData.filter(user => user.user_id !== userId));
      setUserData(userData.filter(user => user.user_id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleEdit = (userId) => {
    console.log(`Edit user with ID: ${userId}`);
  };

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <div className="user-table-container">
          <input
            type="text"
            placeholder="Search by name/email/phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={handleFilter} className="filter-button">Filter</button>
          <button onClick={handleReset} className="reset-button">Reset</button>
          <table className="user-table">
            <thead className='text-white'>
              <tr>
                <th style={{backgroundColor: "#122c6f"}}>ID</th>
                <th style={{backgroundColor: "#122c6f"}}>First Name</th>
                <th style={{backgroundColor: "#122c6f"}}>Last Name</th>
                <th style={{backgroundColor: "#122c6f"}}>Email</th>
                <th style={{backgroundColor: "#122c6f"}}>Phone</th>
                <th style={{backgroundColor: "#122c6f"}}>City</th>
                <th style={{backgroundColor: "#122c6f"}}>State</th>
                <th style={{backgroundColor: "#122c6f"}}>Postcode</th>
                <th style={{backgroundColor: "#122c6f"}}>Country</th>
                <th style={{backgroundColor: "#122c6f"}}>Profile Picture</th>
                <th style={{backgroundColor: "#122c6f"}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNo}</td>
                  <td>{user.city}</td>
                  <td>{user.state}</td>
                  <td>{user.pincode}</td>
                  <td>{user.country}</td>
                  <td>
                    <img src={user.profilePic} alt={`${user.firstName} ${user.lastName}`} style={{width: '50px', height: '50px'}} />
                  </td>
                  <td className="actions">
                    <button className="action-button view" onClick={() => handleView(user)}>
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="action-button edit" onClick={() => handleEdit(user.user_id)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="action-button delete" onClick={() => handleDelete(user.user_id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showModal && selectedUser && (
            <div className="modal" onClick={handleCloseModal}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close" onClick={handleCloseModal}>&times;</span>
                <h2>User Details</h2>
                <p><strong>First Name:</strong> {selectedUser.firstName}</p>
                <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Phone:</strong> {selectedUser.phoneNo}</p>
                <p><strong>City:</strong> {selectedUser.city}</p>
                <p><strong>State:</strong> {selectedUser.state}</p>
                <p><strong>Postcode:</strong> {selectedUser.pincode}</p>
                <p><strong>Country:</strong> {selectedUser.country}</p>
                <p><strong>Profile Picture:</strong></p>
                <img src={selectedUser.profilePic} alt={`${selectedUser.firstName} ${selectedUser.lastName}`} style={{width: '100px', height: '100px'}} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTable;
