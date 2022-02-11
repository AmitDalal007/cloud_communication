// import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import logo from '../images/logo-img.png'


const Login = () => {

    const [credentials, setCredentials] = useState({ username: "", password: "" })
    let history = useHistory();
    const host = "https://login1.free.beeceptor.com";

    const handleLogin = async (e) => {
        e.preventDefault();
        // const response = await axios.post(('https://login1.free.beeceptor.com'), {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ username: credentials.username, password: credentials.password })
        // });
        const response = await fetch(`${host}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: credentials.username, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            console.log("Logged in successfully");
            history.push("/");

        }
        else {
            console.log("Invalid Credentials");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="layout-wrapper layout-static layout-static-sidebar-inactive layout-theme-light">
                <div className="layout-main-container2">
                    <div className="layout-main">
                        <div className="container-fluid d-flex justify-content-center align-items-center">
                            <div className="col-11 col-sm-11 col-md-11 col-lg-6">
                                <div className="text-center mb-4">
                                    <img src={logo} alt="" className='_signimg img-fluid' />
                                </div>
                                <div className="card">
                                    <h2 className=" mb-3"><strong>Login</strong></h2>
                                    <form onSubmit={handleLogin} id="msform">
                                        <div className="field">
                                            <label htmlFor="username">Username</label>
                                            <InputText id="username" name="username" type="text" value={credentials.username} onChange={onChange} required />
                                        </div>
                                        <div className="field">
                                            <label htmlFor="password">Password</label>
                                            <InputText id="password" name="password" type="password" value={credentials.password} onChange={onChange} required />
                                        </div>
                                        <Button type="submit" label="Login" className="mr-2 mb-2 _sfnbtn" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
