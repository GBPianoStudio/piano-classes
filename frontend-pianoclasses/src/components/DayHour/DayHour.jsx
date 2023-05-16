import React  from 'react';
import '../../index.css';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import AddLesson from './AddLesson';
import ConfirmLesson from './ConfirmLesson';
import UpdateLesson from './UpdateLesson';
import { useRef } from 'react';
import moment from "moment";
import Swal from "sweetalert2";
import { getAxiosInstance } from '../../services/functions';

var instance = getAxiosInstance();
var passArray = {id:0, title: "", start:"", end:""};

const today = Date.now();
var minStart = moment(today).add(24, 'HH').toDate();
minStart = moment(minStart).format("YYYY-MM-DD HH:mm:ss");

function DayHour () {
    const calendarRef = useRef(null);
    const [events, setEvents] = useState([]);
    const [isAddOpen, setIsAddOpen] = useState(false);//add modal
    const [isConfirmOpen, setIsConfirmOpen] = useState(false); //confirm modal
    const [isUpdateOpen, setIsUpdateOpen] = useState(false); //update modal
    const [loadCalendar, setLoadCalendar] = useState(true);
   
    async function handleDatesSet() {
      if (loadCalendar===true) {
        const response = await instance.get(`/api/lessons`);
        setEvents(response.data);
        eventState(events);
        setLoadCalendar(false);
      }
      eventState(events);
    }

    function eventState (events) {
      for (let i = 0; i < events.length; i++) {
        events[i].editable=false;
        events[i].durationEditable=false;

        if (localStorage.role==="admin" || events[i].user_id===parseInt(localStorage.id)) {
          if (events[i].is_confirmed===1) {
            events[i].editable=true;
            events[i].durationEditable=false;
            events[i].backgroundColor='rgb(71, 71, 251)';//dark blue
          };
          if (events[i].is_confirmed===0) {
            events[i].editable=true;
            events[i].durationEditable=false;
            events[i].backgroundColor='#FA1E9A';  // pink
          };
        } else {
          events[i].title=""; 
          events[i].backgroundColor='#676060'; //grey
        };

      }
    }

    const openModal  = (info) => {
      const { start, end } = info;
      setEvents([
        ...events,
        {
          start,
          end,
        },
      ]);

      if (moment(start).format("YYYY-MM-DD HH:mm:ss") > minStart) {

        setIsAddOpen(true);
        passArray= {
          id: localStorage.getItem('id'), 
          title: localStorage.getItem('sname'), 
          start: moment(info.start).format("YYYY-MM-DD HH:mm:ss"), 
          end: moment(info.end).format("YYYY-MM-DD HH:mm:ss")
        }
        setLoadCalendar(true);
        setIsAddOpen(true)
      } else {
        setLoadCalendar(true);
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
    const onEventAdded = event => {

      event.start=moment(event.start).format("YYYY-MM-DD HH:mm:ss");
      event.end=moment(event.end).format("YYYY-MM-DD HH:mm:ss");
      handleEventAdd(event);

      let calendarApi = calendarRef.current.getApi()
      calendarApi.addEvent({
        event
      });

      setLoadCalendar(true);
    };
    
    async function handleEventAdd(data) {
      await instance.post(`/api/lessons`, data);

      Swal.fire({
        position: 'center',
        title: 'Lesson added',
        text: 'Thank you for adding a lesson! Please check your calendar in 24hrs to see if Gillian has confirmed the lesson.',
        confirmButtonText: 'OK',
        color: 'white', 
        background: '#676060', 
        confirmButtonColor: 'black', 
        customClass: {
          confirmButton: 'custom-button-class confirm-button'
        },
        buttonsStyling: false,
      }) 

      setLoadCalendar(true);
      passArray={id:0, title: "", start:"", end:""};

    };

    const handleSelect = (info) => {
      passArray= {id: info.event.id, title: info.event.title, start: moment(info.event.start).format("YYYY-MM-DD HH:mm:ss"), end: moment(info.event.end).format("YYYY-MM-DD HH:mm:ss")};
      setIsConfirmOpen(true);
      setLoadCalendar(true);
    };

    const changeLesson = (info) => {
      passArray= {id: info.event.id, title: info.event.title, start: moment(info.event.start).format("YYYY-MM-DD HH:mm:ss"), end: moment(info.event.end).format("YYYY-MM-DD HH:mm:ss")};
      setIsUpdateOpen(true);
      setLoadCalendar(true);
    };

    function onUpdateClose () {
      setLoadCalendar(true);
      setIsUpdateOpen(false);
    }
    function onConfirmClose () {
      setLoadCalendar(true);
      setIsConfirmOpen(false);
    }
    function onAddClose () {
      setLoadCalendar(true);
      setIsAddOpen(false);
    }

        return (
          <div className='calendar-container'>
            <div>
            <FullCalendar
            eventOverlap={false}
            eventDurationEditable={false}
            selectable
            select={openModal} //new function
            ref={calendarRef}
            plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
            defaultView= 'timeGridWeek'
            allDaySlot={false}
            contentHeight={650} //set for mobile view
            slotMinTime={"09:00:00"}
            slotMaxTime={"21:00:00"}
            slotDuration={"00:30:00"}
            hiddenDays={[0]} //hide Sunday
            slotEventOverlap={false}
              headerToolbar= {{
                left: 'prev,next,today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={events}
              eventClick={(event) => handleSelect(event)}
              eventAdd={event => handleEventAdd(event)}
              datesSet={() => handleDatesSet()}
              eventDrop={(info) => changeLesson((info))}
              updateSize={true}
            />
            </div>
            {isAddOpen && (
              <AddLesson isOpen={isAddOpen} onClose={() => onAddClose()} onEventAdded={event => onEventAdded(event)} calValues={passArray} />
            )}
            {isConfirmOpen && (           
              <ConfirmLesson isOpen={isConfirmOpen} onClose={() => onConfirmClose()} eValues={passArray} />
            )}
            {isUpdateOpen && (
              <UpdateLesson isOpen={isUpdateOpen} onClose={() => onUpdateClose()} eValues={passArray} />
            )}
          </div>
        );
      };


        
export default DayHour;