import React, {useEffect, useState } from 'react'
import { getAllUsers, deleteUser, getUser} from '../services/Api';
import Authorizer from './AuthorizerUser';
import UserDetails from './UserDetails';
import ModalButton from './ModalButton';
import Swal from 'sweetalert2';
import '../styles/showUsers.css';


const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadUsers();
    }, []);
    
    const loadUsers = async () => {
    const allUsers = await getAllUsers();
    setUsers(allUsers);
    };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
    };
    
    const getUserDetails = async (id) => {
    const userDetails = await getUser(id);
    setSelectedUser(userDetails);
    setShowModal(true);
    };

  const handleEdit = () => {
       window.location.href = `/EditUsers/${selectedUser.id}`;
    };

  const handleDelete = async (id) => {
    // await deleteUser(id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this user.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      confirmButtonColor: '#01FDFD',
      cancelButtonColor: '#676060'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteUser(id);
        if (response.errors) {
          setErrors(response.errors);
        } else {
          Swal.fire({
            title: 'Success!',
            text: 'User was successfully deleted.',
            icon: 'success',
            confirmButtonText: 'OK',
            iconColor:'white',
            color: 'white',
            background: '#676060',
            confirmButtonColor: '#01FDFD',
          });
          setErrors('');
          loadUsers();
        }
      }
    });
  };

 return ( 
    <div>
      <h1 className="users">USERS</h1>
      <div className="container">
        <div className="tableUsers">
          <table className="table">
            <thead className="head">
              <tr>
                <th>Student</th>
                <th>Contact</th>
                <th className='AU'>AU</th>
                <th className='Mgn'>Management</th>
              </tr>
            </thead>
            <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.student_name}</td>
                <td>{user.email}</td>
                 <td>
                    <Authorizer user={user} />
                  </td>
                  <td>
                  <ModalButton onClick={() => getUserDetails(user.id)}>Details</ModalButton>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedUser && showModal && (
          <UserDetails
            user={selectedUser}
            closeModal={closeModal}
            handleEdit={handleEdit}
            deleteUser={() => handleDelete()}
          />
        )}
      </div>
    </div>
  );
};

export default ShowUsers;
