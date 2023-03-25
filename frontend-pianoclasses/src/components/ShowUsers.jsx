import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import '../styles/showUsers.css';


const endpoint = 'http://localhost:8000/api';


const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const response = await axios.get(`${endpoint}/users`);
    setUsers(response.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`${endpoint}/users/${id}`);
    getAllUsers();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewName(user.contact_name);
    setNewEmail(user.email);
  };

  const handleSave = async () => {
    await axios.put(`${endpoint}/users/${editingUser.id}`, {
      contact_name: newName,
      email:newEmail,
      is_authorised: editingUser.is_authorised,
    });
    setEditingUser(null);
    setNewName('');
    setNewEmail('');
    getAllUsers();
  };
  
  const handleCancel = () => {
    setEditingUser(null);
    setNewName('');
    setNewEmail('');
  };

const getUserDetails = async (id) => {
  const response = await axios.get(`${endpoint}/users/${id}`);
  setSelectedUser(response.data);
  setShowModal(true);
};

const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
};

return (
    <div>
      <h1 className="h1-users">Users</h1>
      

      <div className="container">

      <div className="tableUsers"></div>

      <table className="table">
        <thead className="head">
          <tr>
              {/* <th>Name Parent´s</th> */}
              <th>Student</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Authorized User</th>
                <th>Management</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>

              <td>
              <p>
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                ) : (
                  user.contact_name
                )}
              </p>
              </td>
              <td><p>
              {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                ) : (
                  user.email
                )}
              
              </p>
              </td>
              <td>
                    <p>{user.phone_number}</p>
                </td>
              <td>
                <p>{user.is_authorised ? 'Yes' : 'No'}</p>
              </td>
              {/* <td>
                    <input type="checkbox" className="Checkbox" id={`user-${user.id}`} />
                </td> */}
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <div>
                    <button

                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button

                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      // className="btn btn-warning me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      // className="btn btn-danger"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
              <td>
                    <button value="details" onClick={() => getUserDetails(user.id)}>
                    Details
                    </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
     
  
     {showModal && (
         <div className="modal">
         <div className="modal-content">
             <span className="close" onClick={closeModal}>
    //         &times;
             </span>
             <div>
    //         <h2>User Details</h2>
    //         <p>Name parent's: {selectedUser.contact_name}</p>
    //         <p>Student: {selectedUser.student_name}</p>
    //         <p>Email: {selectedUser.email}</p>
    //         <p>Phone: {selectedUser.phone_number}</p>
    //         <p>Date of birth: {selectedUser.date_of_birth}</p>
    //         <p>Candidate number: {selectedUser.candidate_number}</p>
             </div>
         </div>
         </div>
     )}  

    </div>
  );
};

export default ShowUsers;