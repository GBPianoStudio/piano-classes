import React, {useEffect} from "react";
import '../../index.css';
import moment from "moment";
import { getAxiosInstance } from '../../services/functions';
import Swal from "sweetalert2";

let instance = getAxiosInstance();
let showConfirmed = 0;
let userID = 0;

export default function ConfirmLesson ({isOpen, onClose, eValues}) {

    useEffect(() => {
        async function fetchData() {
          try {
              const response = await instance.get(`/api/lesson/${eValues.id}`);
              showConfirmed = response.data.is_confirmed;
              userID = response.data.user_id;
              console.log(response.data.is_confirmed);
          } catch (error) {
              console.error(error);
          }
        }
        fetchData();
    });


    const handleConfirm = async (id) => {
        try {
            const result = await instance.put(`/api/lesson/${eValues.id}`, {
                user_id: userID,
                title:eValues.title,
                start:eValues.start,
                end:eValues.end,
                is_confirmed: 1,
                });
            console.log(result);
            console.log(instance);
          } catch (error) {
            console.error(error);
          }
        onClose();
        Swal.fire({
          position: 'center',
          title: 'Lesson confirmed',
          text: 'You have successfully confirmed the lesson.',
          confirmButtonText: 'OK',
          color: 'white', 
          background: '#676060', 
          confirmButtonColor: 'black', 
          customClass: {
            confirmButton: 'custom-button-class confirm-button'
          },
          buttonsStyling: false,
        }) 
    };

    const deleteLesson = async (id) => {
      Swal.fire({
        title: 'Delete Lesson',
        text: "Are you sure you want to delete this lesson?", 
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
          const response = await instance.delete(`/api/lesson/${eValues.id}`);
          if (response.errors) {
          } else {
            onClose();
            Swal.fire({
                  position: 'center',
                  title: 'Lesson deleted',
                  text: 'You have successfully deleted the lesson.',
                  confirmButtonText: 'OK',
                  color: 'white', 
                  background: '#676060', 
                  confirmButtonColor: 'black', 
                  customClass: {
                    confirmButton: 'custom-button-class confirm-button'
                  },
                  buttonsStyling: false,
            }) 
          }
        }
      });
    };

    const handleClose = () => {
        onClose();
    };

  return (
        <div className="modal">
            <div className="modal-content">
              <span className="span-modal-close" onClick={handleClose}>&times;</span>
              <h2>Lesson details</h2>
              <div>
                <div className="div-modal-text">
                  <p className="p-modal-text">Student:</p>
                  <p> {eValues.title}</p>
                </div>
                <div className="div-modal-text">
                  <p className="p-modal-text">Date:</p>
                  <p> {moment(eValues.start).format("ddd")} {moment(eValues.start).format("Do MMM YYYY")}</p>
                </div>
                <div className="div-modal-text">
                  <p className="p-modal-text">Start Time:</p>
                  <p>{moment(eValues.start).format("HH:mm")}</p>
                </div>
                <div className="div-modal-text">
                  <p className="p-modal-text">End Time:</p>
                  <p> {moment(eValues.end).format("HH:mm")}</p>
                </div>
                <div className="div-modal-text">
                  <p className="p-modal-text">Student:</p>
                  <p> {eValues.title}</p>
                </div>

                {showConfirmed === 0 ?
                <div className="div-modal-text">
                <p className="p-modal-text">Confirmed:</p>
                <p>No</p>
                </div>
                :
                <div className="div-modal-text">
                <p className="p-modal-text">Confirmed: </p>
                <p>Yes</p>
                </div>
                }
              </div>             

              {localStorage.role === 'admin' && showConfirmed === 0 ?

                <div>
                  <p>Do you want to confirm or delete this lesson? </p>
                  <div className="modal-button-container">
                    <button className="btn-modal" onClick={handleConfirm}>CONFIRM</button> 
                    <button className="btn-modal btn-delete" onClick={deleteLesson}>DELETE</button> 
                  </div>
                </div> 
                :
                <div className="modal-button-container">
                  <button className="btn-modal" onClick={handleClose}>OK</button> 
                </div>
              }

            </div>
        </div>
  )
}
