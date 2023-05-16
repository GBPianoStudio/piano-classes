import React, {useState, useEffect} from "react";
import '../../index.css';
import moment from "moment";
import Swal from "sweetalert2";

const today = Date.now();
var minStart = moment(today).add(24, 'HH').toDate();
minStart = moment(minStart).format("YYYY-MM-DDTHH:mm");

export default function AddLesson ({isOpen, onClose, onEventAdded, calValues}) {
    
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    useEffect(() => {
        setTimeout(() => setStart(calValues.start), 1000);
        setTimeout(() => setEnd(calValues.end), 1000);
        setTimeout(() => setTitle(calValues.title), 1000);

    }, [calValues.start,calValues.end, calValues.title]); 
    
    function onSubmit(event) {
        event.preventDefault(); 

        if (moment(start).format("YYYY-MM-DD HH:mm:ss")>moment(minStart).format("YYYY-MM-DD HH:mm:ss")) {
            onEventAdded({
                user_id: localStorage.getItem('id'),
                title,
                start ,
                end
            })
            onClose();
        } else {
            Swal.fire({
                position: 'center',
                title: 'Lesson not booked',
                text: 'Sorry! You cannot book a lesson with less than 24hr notice.',
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

    const changeStart = (event) => {
        console.log(event);
        const value = event;        
        setTimeout(() => setStart(value), 1000);
    };

    const onChange = (event) => {
        const value = event.target.value;

        var newEnd = moment(start).add(value, 'm').toDate();
        newEnd = moment(newEnd).format("YYYY-MM-DD HH:mm:ss");
        
        setTimeout(() => setEnd(newEnd), 1000);
    };

    const handleClose = () => {
        onClose(true);
    };

    return (
    <div className="modal">
        <div className="modal-content">
          <span className="span-modal-close" onClick={handleClose}>&times;</span>
            <h2>Add a new lesson</h2>
            <form  className="add-event-modal" onSubmit={onSubmit}>
                <label>Student / Title</label>
                <input className="lesson-input" placeholder="Student's name" value={title} onChange={e => setTitle(e.target.value)} />
                <div> 
                    <label>Start Date and Time</label>
                    <input type="hidden" input className="lesson-input" value={ moment(start).format("YYYY-MM-DD HH:mm:ss")} onChange={e => setStart(e.target.value)} />
                    <input
                        id="studentsName"
                        type="datetime-local"
                        name="studentsName"
                        min={minStart}
                        className="lesson-input" 
                        value={start} 
                        step="60"
                        onChange={e => changeStart(e.target.value)} />
                </div>
                <div>
                    <label className="label-duration">Change the class duration: </label>
                    <select name="duration" id="duration" onChange={onChange} >
                        <option value="30">30 mins</option>
                        <option value="45">45 mins</option>
                        <option value="60">60 mins</option>
                    </select>
                </div>
                <div>
                    <label>End Time</label>
                    {end && <input placeholder="" className="lesson-input"  value={end} onChange={e => setEnd(e.target.value)} />}
                </div>
                <div className="modal-button-container">             
                    <button className="btn-modal" type="submit" >ADD</button>
                    <button className="btn-modal btn-cancel" type="reset" onClick={handleClose}>CANCEL</button>
                </div>
            </form>

        </div>
    </div>    

    )
}
