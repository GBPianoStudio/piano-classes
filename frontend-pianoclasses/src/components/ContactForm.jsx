import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import '../index.css';
import Swal from 'sweetalert2'


const ContactForm = () =>{
  const [state, handleSubmit] = useForm("mrgvaaln");
if (state.succeeded) {
    Swal.fire({
        position: 'center',
        title: 'Email sent',
        text: 'Thank you! Please wait for Gillian to contact you.',
        confirmButtonText: 'OK',
        color: 'white', 
        background: '#676060', 
        confirmButtonColor: 'black', 
        customClass: {
          confirmButton: 'custom-button-class confirm-button'
        },
        buttonsStyling: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          window.location = "/";
          }
        }
      ); 

}
        
    return (
    <>
    <h1 className='h1-contact'>CONTACT ME</h1>
        <form onSubmit={handleSubmit} className='contact-form'>
                <div className='contact-form-contact'>
                    <label className="contact-label" htmlFor="nombre">
                    Contact's name/ Parent's name *
                    </label>
                    <input
                        id="nombre"
                        type="nombre" 
                        name="nombre"
                        placeholder="Name"
                    />
                    <ValidationError 
                        prefix="Nombre" 
                        field="nombre"
                        errors={state.errors}
                    />
                </div>

                <div className='contact-form-contact'>
                    <label htmlFor="email">
                        Email *
                    </label>
                    <input
                        id="email"
                        type="email" 
                        name="email"
                        placeholder="Email"
                    />
                    <ValidationError 
                        prefix="Email" 
                        field="email"
                        errors={state.errors}
                    />
                </div>
            
                <div className='contact-form-contact'>
                <label>Message *</label>
                    <textarea 
                        rows="9"
                        id="message"
                        name="message"
                        placeholder='Write your message here...'
                        />
                    <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                    />
                </div>

                <div className="contact-btn">
                    <button className='contact-form-button' type='submit'>SEND</button>
                    <button className='contact-form-button btn-cancel'  type='reset'>CANCEL</button>
                </div>
        </form>
    </>
    );
}

export default ContactForm


