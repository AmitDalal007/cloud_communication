import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { TabPanel, TabView } from 'primereact/tabview';
// For Api
import { CustomerService } from '../service/CustomerService';
// import { Messages } from 'primereact/messages';

export const Contact = () => {

    // const message = useRef();

    const [contact, setContact] = useState({ fname: "", lname: "", email: "", whatsapp_number:"", phone_number: "", alt_phone_number: "" })

    const handleContact = async (e) => {
        e.preventDefault();
        const { fname, lname, email, whatsapp_number, phone_number, alt_phone_number } = contact;
        const name = fname + ' ' + lname

        const response = await fetch(`http://127.0.0.1:8000/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, whatsapp_number, phone_number, alt_phone_number })
        });
        console.log(response.status)
        const json = await response.json();
        console.log(json);
        // if(response.status === 201){
        //     document.getElementById("reset").click()
        //     message.current.show({ severity: 'success', content: 'Contact saved successfully', life: 3000 });
        // }
    }

    const onchange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }

    // For Contact List
    const [contactList, setContactList] = useState(null);

    useEffect(() => {
        const contactList = new CustomerService();
        contactList.getContact().then(data => { setContactList(data); });
    }, [])

    return (
        <div className="col-12 xl:col-12">
            <div className="card">
                <TabView>
                    <TabPanel header="Add Contact">
                        <div className="grid">
                            <div className="col-12">
                                <div className="card">
                                    {/* <Messages ref={message} /> */}
                                    {/* <h5>Contact</h5> */}
                                    <form onSubmit={handleContact}>
                                        <div className="p-fluid formgrid grid">
                                            <div className="field col-12 md:col-6">
                                                <label htmlFor="fname">Firstname</label>
                                                <InputText id="fname" type="text" name='fname' onChange={onchange} required />
                                            </div>
                                            <div className="field col-12 md:col-6">
                                                <label htmlFor="lname">Lastname</label>
                                                <InputText id="lname" type="text" name='lname' onChange={onchange} required />
                                            </div>
                                            <div className="field col-12 md:col-6">
                                                <label htmlFor="email">Email</label>
                                                <InputText id="email" type="email" name='email' onChange={onchange} required />
                                            </div>
                                            <div className="field col-12 md:col-6">
                                                <label htmlFor="wnumber">Whatsapp Number</label>
                                                <InputText id="wnumber" type="text" name='whatsapp_number' pattern="[1-9]{1}[0-9]{9}" onChange={onchange} required />
                                            </div>
                                            <div className="field col-12 md:col-6">
                                                <label htmlFor="pnumber">Phone Number</label>
                                                <InputText id="pnumber" type="text" name='phone_number' pattern="[1-9]{1}[0-9]{9}" onChange={onchange} required />
                                            </div>
                                            <div className="field col-12 md:col-6">
                                                <label htmlFor="apnumber">Alternate Phone Number</label>
                                                <InputText id="apnumber" type="text" name='alt_phone_number' pattern="[1-9]{1}[0-9]{9}" onChange={onchange} required />
                                            </div>
                                            <div className="col-12 md:col-3">
                                                <Button label="Save" type='submit' icon="pi pi-check" className="mr-2 mb-2 _dashbtn" />
                                            </div>

                                            <div className="col-12 md:col-3">
                                                <Button label="Cancel" id='reset' type='reset' icon="pi pi-times" className="p-button-secondary mr-2 mb-2" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel header="Contact List">
                    <div className="col-12 md:col-12">
                                <div className="card">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className='align-middle col-1'>ID</th>
                                                <th className='align-middle col-2'>Name</th>
                                                <th className='align-middle col-3'>Email</th>
                                                <th className='align-middle col-2'>Whatsapp Number</th>
                                                <th className='align-middle col-2'>Phone Number</th>
                                                <th className='align-middle col-2'>Alternate Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contactList && contactList.map((elem, i) => (
                                                <tr key={i}>
                                                    <td className="align-middle">{elem.id}</td>
                                                    <td className="align-middle">{elem.name}</td>
                                                    <td className="align-middle">{elem.email}</td>
                                                    <td className="align-middle">{elem.whatsapp_number}</td>
                                                    <td className="align-middle">{elem.phone_number}</td>
                                                    <td className="align-middle">{elem.alt_phone_number}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    )
}
