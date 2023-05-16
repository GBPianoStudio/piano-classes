import React, {useEffect, useState } from 'react'
import { getAllUsers, deleteUser, getUser} from '../services/Api';
import { getAxiosInstance } from '../services/functions';
import UserDetails from './UserDetails';
import ModalButton from './ModalButton';
import Swal from 'sweetalert2';
import '../../src/styles/showUsers.css';

var instance = getAxiosInstance();
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
       window.location.href = `/ToUpdate/${selectedUser.id}`;
    };

  const handleDelete = async (id) => {
    Swal.fire({

      title: 'Delete User',
      text: "Are you sure you want to delete this user?", 
      showCancelButton: true, 
      cancelButtonText: 'NO, CANCEL',
      confirmButtonText: 'YES, DELETE!',
      color: 'white', 
      background: '#676060', 
      confirmButtonColor: 'black', 
      cancelButtonColor:'#F15A5A',
      customClass: {
        confirmButton: 'custom-button-class confirm-button',
        cancelButton: 'custom-button-class cancel-button'
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteUser(id);
        if (response.errors) {
          setErrors(response.errors);
        } else {
          Swal.fire({
            title: 'Success!',
            text: 'User was successfully deleted.',
            confirmButtonText: 'OK',
            color: 'white',
            background: '#676060',
            confirmButtonColor: 'black',
            customClass: {
              confirmButton: 'custom-button-class confirm-button'
            },
            buttonsStyling: false,
          });
          loadUsers();
          closeModal();
        }
      }
    });
  };

const handleCheckboxChange = async(id) => {
  try {

      Swal.fire({
        title: 'Authorise User',
        text: "Are you sure you want to authorise this user?", 
        showCancelButton: true, 
        cancelButtonText: 'NO, CANCEL',
        confirmButtonText: 'YES, AUTHORISE!',
        color: 'white', 
        background: '#676060', 
        confirmButtonColor: 'black', 
        cancelButtonColor:'#F15A5A',
        customClass: {
          confirmButton: 'custom-button-class confirm-button',
          cancelButton: 'custom-button-class cancel-button'
        },
        buttonsStyling: false,
    })
      .then(async (result) => {
      if (result.isConfirmed) {
        const response = await instance.put(`/api/users/${id}/authorize`, {
        });
        console.log(response.data);
        console.log(response.status);
        if (response.status === 200) {
          loadUsers();
          Swal.fire({
            title: 'Success!',
            text: 'User was successfully authorised.',
            confirmButtonText: 'OK',
            color: 'white',
            background: '#676060',
            confirmButtonColor: 'black',
            customClass: {
              confirmButton: 'custom-button-class confirm-button'
            },
            buttonsStyling: false,
          });
        } else {
          console.log(response);
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
  loadUsers();
}
  loadUsers();
 return ( 
    <>
      <h1 className="users">USERS</h1>
      <div id='container-father'>
      <div className="container">
        <div className="tableUsers">
          <table className="table">
            <thead className="head">
              <tr className="tr-user-table">
                <th>Student</th>
                <th className='AU'>AU</th>
                <th className='Mgn'></th>
              </tr>
            </thead>
            <tbody>
            {users.map((user) => (
              <tr className="tr-user-table" key={user.id}>
                <td>{user.student_name}</td>
                 <td>
                    { user.is_authorised === 1 ?
                    <input className="form-check-input" type="checkbox" value={user.id} id="flexCheckCheckedDisabled" checked disabled />
                    :
                    <input className="form-check-input" type="checkbox" value={user.id} id="flexCheckDefault" onChange={e=>handleCheckboxChange(user.id)} ></input>
                    }
                  </td>
                  <td>
                  <ModalButton onClick={() => getUserDetails(user.id)}>Details</ModalButton>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        
        {selectedUser && showModal && (
          <UserDetails
            user={selectedUser}
            closeModal={closeModal}
            handleEdit={handleEdit}
            deleteUser={() => handleDelete(selectedUser.id)}
          />
        )}
      </div>

      {errors && <p>{errors}</p>}
    </>
  );
};

export default ShowUsers;
