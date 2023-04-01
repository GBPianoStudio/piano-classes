import React, {useEffect} from "react";
import '../../index.css';
import moment from "moment";
import { getAxiosInstance } from '../../services/functions';
import Swal from "sweetalert2";

var instance = getAxiosInstance();
var showConfirmed = 0;
var userID = 0;

export default function ConfirmLesson ({isOpen, onClose, eValues}) {

    useEffect(() => {
        async function fetchData() {
        try {
            // const response = await axios.get(`/api/objects/${id}`);`/api/login`
            const response = await instance.get(`/api/lesson/${eValues.id}`);
            showConfirmed = response.data.is_confirmed;
            userID = response.data.user_id;
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
        await instance.delete(`/api/lesson/${eValues.id}`);
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
    };

    const handleClose = () => {
        onClose();
    };

  return (
        <div className="modal">
            <div className="modal-content">
              <h1>Lesson details</h1>
              <div>Student: {eValues.title}</div>
              <div>Date: {moment(eValues.start).format("ddd")} {moment(eValues.start).format("Do MMM YYYY")} </div>
              <div>Start Time: {moment(eValues.start).format("HH:mm")}</div>
              <div>End Time: {moment(eValues.end).format("HH:mm")}</div>
              {showConfirmed === 0 ?
              <div>Confirmed: No</div>
              :
              <div>Confirmed: Yes</div>
              }
              {localStorage.role === 'admin' && showConfirmed === 0 ?

                <div>
                  <div className="modal-buttons">Do you want to confirm or delete this lesson? </div>
                  <div className="modal-buttons">
                    <button className="confirm-buttons" onClick={deleteLesson}>DELETE</button> 
                    <button  className="confirm-buttons" onClick={handleClose}>CANCEL</button>
                    <button className="confirm-buttons" onClick={handleConfirm}>CONFIRM</button> 
                  </div>
                </div> 
                :
                <div className="modal-buttons">
                  <button className="confirm-buttons" onClick={handleClose}>OK</button> 
                </div>
              }

            </div>
            </div>
  )
}
