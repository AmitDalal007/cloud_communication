// eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { ProgressBar } from 'primereact/progressbar';
import { CustomerService } from '../service/CustomerService';
import { Button } from 'primereact/button';
import { TabPanel, TabView } from 'primereact/tabview';
import { Dropdown } from 'primereact/dropdown';


const Dashboard = () => {
    const [prompt, setPrompt] = useState(null);
    const [leads, setLeads] = useState(null);
    const [campaign, setCampaign] = useState(null);



    useEffect(() => {
        const customer = new CustomerService();
        customer.getPrompt().then(data => { setPrompt(data); });
    }, [])

    const handleClick = (id) => {
        console.log(id);
    }

    const handleClick2 = (id) => {
        console.log(id);
    }

    // For Prompt End

    // For Lead Management Start
    useEffect(() => {
        const leadsData = new CustomerService();
        leadsData.getLead().then(data => { setLeads(data); });
    }, [])

    const [leadData, setLeadData] = useState({ file: "" })
    // const [test,setTest] = useState();
    const handleLeads = async (e) => {
        e.preventDefault();
        const { csvFile } = leadData;
        const formData = new FormData();
        formData.append("file", csvFile);
        console.log(formData);
        const response = await fetch(`http://127.0.0.1:8000/upload/`, {
            method: 'POST',
            body: formData,
            // body: {
            //     mode: "formdata",
            //     formdata: [
            //        {
            //           key: "file",
            //           type: "file",
            //           value: {csvFile}
            //        }
            //     ]
            // },
            headers: {
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                'Connection': 'keep-alive',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': '*/*',
                'Content-Length': '<calculated when request is sent>'
            },
            // body: formData
            // body: new FormData({'files': csvFile})
            // body: JSON.stringify({ csvFile })
        });
        const json = await response.json();
        console.log(json);
    }


    const onchange2 = (e) => {
        // let file = e.target.files
        // console.log(file)
        // let reader = new FileReader();
        // reader.readAsDataURL(file[0])
        // console.log(reader)
        // console.log(e.target.name)
        // setLeadData({ ...leadData, [e.target.name]: e.target.value })
        console.log(e.target.files[0])
        setLeadData({ ...leadData, [e.target.name]: e.target.files[0] })
    }

    const handleClick3 = (id) => {
        console.log(id);
    }
    // For Lead Management End

    // For Settings start
    const [dropdownValue, setDropdownValue] = useState(null);

    const dropdownValues = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    // For Settings End

    // For Campaign Start
    useEffect(() => {
        const campaignData = new CustomerService();
        campaignData.getCampaign().then(data => { setCampaign(data); });
    }, [])

    const [campaignData, setCampaignData] = useState({ campaign_name: "", api_based_url: "", calling_hours: "", retry_count: "" })
    const handleCampaign = async (e) => {
        e.preventDefault();
        const { campaign_name, api_based_url, calling_hours, retry_count } = campaignData;

        const response = await fetch(`http://127.0.0.1:8000/api/campaigns`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ campaign_name, api_based_url, calling_hours, retry_count })
        });
        const json = await response.json();
        console.log(json);
    }

    const onchange = (e) => {
        setCampaignData({ ...campaignData, [e.target.name]: e.target.value })
    }
    // For Campaign End

    return (

        // <div className="grid">
        <div className="col-12 xl:col-12">
            <div className="card">
                <TabView>
                    <TabPanel header="Prompt">
                        <div className="grid">
                            <div className="col-12 xl:col-6">
                                <div className="card">
                                    <h2 className="card-title">Upload Prompt</h2>
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="file_name" className="form-label">File Name</label>
                                            <input type="text" className="form-control" id="file_name" name="file_name" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">Upload File</label>
                                            <input className="form-control" type="file" id="formFile" name="formFile" />
                                        </div>
                                        <button type="submit" className="btn _dashbtn">Save</button>
                                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                    </form>
                                </div>
                            </div>

                            <div className="col-12 xl:col-6">
                                <div className="card">
                                    <h2 className="card-title">Text To Speech</h2>
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="file_name" className="form-label">File Name</label>
                                            <input type="text" className="form-control" id="file_name" name="file_name" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="textarea" className="form-label">Textarea</label>
                                            <textarea className="form-control" id="textarea" name="textarea" rows="1"></textarea>
                                        </div>
                                        <button type="submit" className="btn _dashbtn">Save</button>
                                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                    </form>
                                </div>
                            </div>

                            <div className="col-12 xl:col-12">
                                <div className="card">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className='align-middle col-2'>ID</th>
                                                <th className='align-middle col-2'>Prompt Name</th>
                                                <th className='align-middle col-2'>Download File</th>
                                                <th className='align-middle col-2'>Prompt Duration (in sec)</th>
                                                <th className='align-middle col-2'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {prompt && prompt.map((elem, i) => (
                                                <tr key={i}>
                                                    <td className="align-middle">{elem.id}</td>
                                                    <td className="align-middle">{elem.prompt_name}</td>
                                                    <td className="align-middle"><Button type="button" icon="pi pi-download" className="p-button-secondary" id={elem.id} onClick={() => { handleClick2(elem.id) }}></Button></td>
                                                    <td className="align-middle">{elem.prompt_duration}</td>
                                                    <td className="align-middle"><Button type="button" icon="pi pi-trash" className="p-button-danger" id={elem.id} onClick={() => { handleClick(elem.id) }}></Button></td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel header="Lead Management">
                        <div className="grid">
                            <div className="col-12 xl:col-6">
                                <div className="card">
                                    <h2 className="card-title">Upload CSV File</h2>
                                    <form onSubmit={handleLeads} encType='multipart/form-data'>
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">Choose CSV File</label>
                                            <input className="form-control" onChange={onchange2} type="file" id="formFile" name="file" required />
                                        </div>
                                        <button type="submit" className="btn _dashbtn">Upload File</button>
                                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                    </form>
                                </div>
                            </div>

                            <div className="col-12 md:col-12">
                                <div className="card">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className='align-middle col-2'>ID</th>
                                                <th className='align-middle col-2'>Lead Name</th>
                                                <th className='align-middle col-2'>Lead Status</th>
                                                <th className='align-middle col-2'>Progress</th>
                                                <th className='align-middle col-2'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {leads && leads.map((elem, i) => (
                                                <tr key={i}>
                                                    <td className="align-middle">{elem.id}</td>
                                                    <td className="align-middle">{elem.lead_name}</td>
                                                    <td className="align-middle">{elem.lead_status}</td>
                                                    <td className="align-middle"><ProgressBar value={elem.progress} showValue={false} /></td>
                                                    <td className="align-middle"><label className="switch">
                                                        <input type="checkbox" id={elem.id} onClick={() => { handleClick3(elem.id) }} />
                                                        <span className="slider round"></span>
                                                    </label></td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel header="Settings">
                        <div className="grid">
                            <div className="col-12">
                                <div className="card">
                                    <form>
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-6">
                                                <h5>Choose Lead</h5>
                                                <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Choose Lead" />
                                            </div>

                                            <div className="col-12 md:col-6">
                                                <h5>Value 1</h5>
                                                <InputText value="1000" placeholder="Username" />
                                            </div>

                                            <div className="col-12 md:col-6">
                                                <h5>Choose Prompt</h5>
                                                <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Choose Prompt" />
                                            </div>

                                            <div className="col-12 md:col-6">
                                                <h5>Value 2</h5>
                                                <InputText value="1000" placeholder="Username" />
                                            </div>

                                            <div className="col-12 md:col-12">
                                                <h5>
                                                    Duration of total calls required 24 hours
                                                </h5>
                                            </div>

                                            <div className="col-12 md:col-6">
                                                <h5>From</h5>
                                                <InputText id="name1" type="time" />
                                            </div>

                                            <div className="col-12 md:col-6">
                                                <h5>To</h5>
                                                <InputText id="name1" type="time" />
                                            </div>

                                            <div className="col-12 md:col-4">
                                                <Button label="Min. Channel Size 10" className="p-button-secondary mr-2 mb-2" />
                                            </div>

                                            <div className="col-12 md:col-4">
                                                <Button label="Recommended Channel Size 15" className="p-button-secondary mr-2 mb-2" />
                                            </div>

                                            <div className="col-12 md:col-4">
                                                <Button label="Max. Channel Size 20" className="p-button-secondary mr-2 mb-2" />
                                            </div>

                                            <div className="col-12 md:col-12">
                                                {/* <div className="card"> */}
                                                <h5>
                                                    Estimated calls thrown in selected duration 24.
                                                </h5>

                                                {/* <Messages ref={message} /> */}
                                                {/* </div> */}
                                            </div>

                                            <div className="grid col-12">
                                                <div className="col-12 md:col-3">
                                                    <Button label="Fixed" type='input' className="p-button-rounded p-button-secondary mr-2 mb-2" />
                                                </div>

                                                <div className="col-12 md:col-3">
                                                    <Button label="Shared" className="p-button-rounded p-button-secondary mr-2 mb-2" />
                                                    {/* <Button label="Shared" onClick={addErrorMessage} className="p-button-rounded p-button-secondary mr-2 mb-2" /> */}
                                                </div>
                                            </div>

                                            <div className="col-12 md:col-3">
                                                <Button label="Save" icon="pi pi-check" className="mr-2 mb-2 _dashbtn" />
                                            </div>

                                            <div className="col-12 md:col-3">
                                                <Button label="Cancel" type='reset' icon="pi pi-times" className="p-button-secondary mr-2 mb-2" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel header="Campaign">
                        <div className="grid">
                            <div className="col-12">
                                <div className="card">
                                    <form onSubmit={handleCampaign} >
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-6">
                                                <h5>Campaign Name</h5>
                                                <InputText id="campaign_name" name='campaign_name' onChange={onchange} type="text" required />
                                            </div>

                                            <div className="col-12 md:col-6">
                                                <h5>API Based URL</h5>
                                                <InputText id='api_based_url' name='api_based_url' onChange={onchange} type="text" required />
                                            </div>

                                            <div className="col-12 md:col-6">
                                                <h5>Calling Hours</h5>
                                                <InputText id="calling_hours" name='calling_hours' onChange={onchange} type="text" required />
                                            </div>

                                            <div className="col-12 md:col-6">
                                                <h5>Retry Count</h5>
                                                <InputText id="retry_count" name='retry_count' onChange={onchange} type="text" required />
                                            </div>

                                            <div className="col-12 md:col-3">
                                                <Button label="Save" type='submit' icon="pi pi-check" className="mr-2 mb-2 _dashbtn" />
                                            </div>

                                            <div className="col-12 md:col-3">
                                                <Button type='reset' label="Cancel" icon="pi pi-times" className="p-button-secondary mr-2 mb-2" />
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
                                                <th className='align-middle col-2'>Campaign ID</th>
                                                <th className='align-middle col-2'>Campaign Name</th>
                                                <th className='align-middle col-2'>API Based URL</th>
                                                <th className='align-middle col-2'>Calling Hours</th>
                                                <th className='align-middle col-2'>Retry Count</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {campaign && campaign.map((elem, i) => (
                                                <tr key={i}>
                                                    <td className="align-middle">{elem.id}</td>
                                                    <td className="align-middle">{elem.campaign_name}</td>
                                                    <td className="align-middle">{elem.api_based_url}</td>
                                                    <td className="align-middle">{elem.calling_hours}</td>
                                                    <td className="align-middle">{elem.retry_count}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </div>


        // </div>
    );
}

export default Dashboard

