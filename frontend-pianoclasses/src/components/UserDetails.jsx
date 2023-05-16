import React from 'react';

const UserDetails = ({ user, closeModal, handleEdit, deleteUser }) => {
  const { contact_name, email, student_name, candidate_number, phone_number, date_of_birth,  } = user;

  return (
    
    <div className="modal">
      <div className="modal-content">
        <span className="span-modal-close" onClick={closeModal}>&times;</span>
        <div>
          <h2>User Details</h2>
          <div className="div-modal-text">
            <p className="p-modal-text">Parent/Contact:</p>
            <p> {contact_name}</p>
          </div>
          <div className="div-modal-text">
            <p className="p-modal-text">Student:</p>
            <p> {student_name}</p>
          </div>
          <div className="div-modal-text">
            <p className="p-modal-text">Email:</p>
            <p> {email}</p>
          </div>
          <div className="div-modal-text">
            <p className="p-modal-text">Phone:</p>
            <p> {phone_number}</p>
          </div>
          <div className="div-modal-text">
            <p className="p-modal-text">Date of birth:</p>
            <p> {date_of_birth}</p>
          </div>
          <p>Candidate number: {candidate_number}</p>
          <div className='modal-button-container'>
            <button className='btn-modal' onClick={handleEdit}>EDIT</button>
            <button className='btn-modal btn-delete' onClick={deleteUser}>DELETE</button>
          </div>
        </div>        
      </div>
    </div>
  );
};

export default UserDetails;