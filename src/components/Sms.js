import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { TabPanel, TabView } from 'primereact/tabview';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
// For Api
import { CustomerService } from '../service/CustomerService';
import axios from 'axios'

export const Sms = () => {

    // For Post template data
    const [template, setTemplate] = useState({ template_name: "", template_text: "" })

    const handleTemplate = async (e) => {
        e.preventDefault();
        const { template_name, template_text } = template;

        const response = await fetch(`http://127.0.0.1:8000/api/template`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ template_name, template_text })
        });
        const json = await response.json();
        console.log(json);
    }

    const onchange = (e) => {
        setTemplate({ ...template, [e.target.name]: e.target.value })
    }

    // For Get Template List
    const [templateList, setTemplateList] = useState(null);

    useEffect(() => {
        const templateList = new CustomerService();
        templateList.getTemplate().then(data => { setTemplateList(data); });
    }, [])

    // For Edit template
    const [displayBasic, setDisplayBasic] = useState(false);
    const [temp, setTemp] = useState({ template_name: "", template_text: "" });

    const basicDialogFooter = <Button type="button" label="Dismiss" onClick={() => setDisplayBasic(false)} icon="pi pi-check" className="p-button-secondary visually-hidden" />;

    const handleClick = async (id) => {
        setDisplayBasic(true);
        const fetchdata = templateList[id];
        console.log("fetchdata :", fetchdata);
        setTemp(fetchdata);
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        const { template_name, template_text } = temp;

        const response = await fetch(`http://127.0.0.1:8000/api/template/${temp.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ template_name, template_text })
        });
        console.log(response)
        const json = await response.json();
        console.log(json);
    }

    const onchange2 = (e) => {
        setTemp({ ...temp, [e.target.name]: e.target.value })
    }

    // For Deleteion
    const [displayConfirmation, setDisplayConfirmation] = useState(false);

    const handleClick2 = (id)=>{
        setDisplayConfirmation(true)
        const fetchdata = templateList[id];
        setTemp(fetchdata);
    }

    const handleDelete = async()=>{
        const response = await axios.delete(`http://127.0.0.1:8000/api/template/${temp.id}`);
        console.log(response)
        const json = await response.data;
        setDisplayConfirmation(false)
        return json;
    }

    const confirmationDialogFooter = (
        <>
            <Button type="button" label="No" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} className="p-button-secondary" /> 
            {/* p-button-text */}
            <Button type="button" label="Yes" icon="pi pi-check" onClick={handleDelete} className="_dashbtn" autoFocus />
        </>
    );
    

    return (
        <div className="col-12 xl:col-12">
            <div className="card">
                <TabView>
                    <TabPanel header="Template">
                        <div className="grid">
                            <div className="col-12 xl:col-6">
                                <div className="card">
                                    <form onSubmit={handleTemplate}>
                                        <div className="p-fluid formgrid grid">
                                            <div className="field col-12">
                                                <label htmlFor="templateName">Template Name</label>
                                                <InputText id="template_name" type="text" name='template_name' onChange={onchange} required />
                                            </div>
                                            <div className="field col-12">
                                                <label htmlFor="template">Template</label>
                                                <InputTextarea id="template_text" type="text" name='template_text' onChange={onchange} rows="3" required />
                                            </div>
                                            <div className="col-12 md:col-6">
                                                <Button label="Save" type='submit' icon="pi pi-check" className="mr-2 mb-2 _dashbtn" />
                                            </div>

                                            <div className="col-12 md:col-6">
                                                <Button label="Cancel" id='reset' type='reset' icon="pi pi-times" className="p-button-secondary mr-2 mb-2" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="col-12 md:col-12">
                                <div className="card">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className='align-middle col-2'>ID</th>
                                                <th className='align-middle col-3'>Template Name</th>
                                                <th className='align-middle col-5'>Template Text</th>
                                                <th className='align-middle col-2'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {templateList && templateList.map((elem, i) => (
                                                <tr key={i}>
                                                    <td className="align-middle">{elem.id}</td>
                                                    <td className="align-middle">{elem.template_name}</td>
                                                    <td className="align-middle">{elem.template_text}</td>
                                                    <td className="align-middle">
                                                        <Button type="button" icon="pi pi-pencil" className="_dashbtn mx-1" id={elem.id} onClick={() => { handleClick(i) }}></Button>
                                                        <Button type="button" icon="pi pi-trash" className="p-button-danger mx-1" id={elem.id} onClick={() => { handleClick2(i) }}></Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                                <Dialog header="Edit Template" visible={displayBasic} style={{ width: '30vw' }} modal footer={basicDialogFooter} onHide={() => setDisplayBasic(false)}>
                                    <form onSubmit={handleEdit}>
                                        <div className="p-fluid formgrid grid">
                                            <div className="field col-12">
                                                <label htmlFor="templateName">Template Name</label>
                                                <InputText id="template_name" type="text" value={temp.template_name} name='template_name' onChange={onchange2} required />
                                            </div>
                                            <div className="field col-12">
                                                <label htmlFor="template">Template</label>
                                                <InputTextarea id="template_text" type="text" value={temp.template_text} name='template_text' onChange={onchange2} rows="3" required />
                                            </div>
                                            <div className="col-12 md:col-6">
                                                <Button label="Save" type='submit' icon="pi pi-check" className="mr-2 mb-2 _dashbtn" />
                                            </div>

                                            <div className="col-12 md:col-6">
                                                <Button label="Cancel" onClick={() => setDisplayBasic(false)} icon="pi pi-times" className="p-button-secondary mr-2 mb-2" />
                                            </div>
                                        </div>
                                    </form>
                                </Dialog>

                                <Dialog header="Confirmation" visible={displayConfirmation} onHide={() => setDisplayConfirmation(false)} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
                                    <div className="flex align-items-center justify-content-center">
                                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                        <span>Are you sure you want to delete?</span>
                                    </div>
                                </Dialog>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel header="tab">

                    </TabPanel>
                </TabView>
            </div>
        </div>
    )
}
