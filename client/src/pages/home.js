import React, { useEffect, useState } from "react";
import Axios from 'axios';
import './home.css';


function Home() {

    var [contatos, setContatos] =  useState([]);
    const [display, setDisplay] = useState('none');
    const [title, setTitle] = useState('');
    const [buttonCall, setButtonCall] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactId, setContactId] = useState('');
    const options = {
        headers: {"token": sessionStorage.getItem("token") }
    }

    useEffect(() => {
        getContacts()
    },  [])

    const getContacts = () => {
        Axios.get('http://localhost:3001/contacts', options)
        .then((response) => {
            setContatos(response.data)
        })
        .catch(error => console.log(error))
    }

    const showModal = (id, name, phone) => {
        setContactName(name)
        setContactPhone(phone)
        setContactId(id)

        if (name !== '') {
            setTitle('Edit')
            setButtonCall('edit')
        }
        else
            setTitle('New Contact')
        
        setDisplay('block');
    }

    const saveContact = () => {

        if (buttonCall === '') {
            Axios.post('http://localhost:3001/contacts', {
                name: contactName, 
                phone: contactPhone
            }, options).then((response) => {
                if(response.status === 200) {
                    alert('Contact saved')
                    setDisplay('none')
                    getContacts()
                } else 
                    alert(response.data.statusText)              
            })
            .catch(error => console.log(error));
        } else {
            Axios.put('http://localhost:3001/contacts', {
                id: contactId,
                name: contactName, 
                phone: contactPhone
            }, options).then((response) => {
                if(response.status === 200) {
                    alert('Contact saved')
                    setDisplay('none')
                    getContacts()
                } else 
                    alert(response.data.statusText)  
            })
            .catch(error => console.log(error));
        }
    }


    return (
        <div className="registration">
            <h1>Phone list</h1>

            <div className="contatos">
            <button className='button-newcontact' title='New contact' onClick={() => showModal('', '', '')}>New</button>
                <>
                {contatos.map((el) => {
                   return <div key={el.id} className="contactDiv">
                    <h3 className="contactName">{el.name}</h3>
                    <button className="buttonEdit" title="Change values" onClick={(e) => showModal(el.id, el.name, el.phone)}>Edit</button>
                    <p className="contactPhone">{el.phone}</p>
                    <div className="line"></div>
                   </div> 
                })}
                </>
            </div>

            {/* Modal */}
            <div id="myModal" className="modal" style={{'display': display}}>
                <div className="modal-content">
                    <span className="close" title="Close" onClick={() => setDisplay('none')}>&times;</span>

                    <div>
                        <h1>{title}</h1>
                    </div>

                    <div>
                        <input value={contactName} className='sign-up-input' type="text" placeholder="Name..." onChange={(e) => {
                            setContactName(e.target.value)}}/>
                    </div>

                    <div>
                        <input value={contactPhone} className='sign-up-input' type="tel" placeholder="Phone..." onChange={(e) => {
                            setContactPhone(e.target.value)}}/>
                    </div>

                    <button className='button-register' title='Save changes' onClick={() => saveContact()}>Save</button>

                </div>
          </div>
        </div>
    )
}

export default Home;