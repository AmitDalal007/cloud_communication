import React, { useState } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { RadioButton } from 'primereact/radiobutton'
import logo from '../images/logo-img.png'
import $ from 'jquery'

const Signup = () => {
    const [radioValue, setRadioValue] = useState(null);

    $(document).ready(function () {

        var current_fs, next_fs, previous_fs; //fieldsets
        var opacity;
        
        $(".next").click(function () {
        
            current_fs = $(this).parent();
            next_fs = $(this).parent().next();
        
            //Add Class Active
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        
            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({ opacity: 0 }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;
        
                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    next_fs.css({ 'opacity': opacity });
                },
                duration: 600
            });
        });
        
        $(".previous").click(function () {
        
            current_fs = $(this).parent();
            previous_fs = $(this).parent().prev();
        
            //Remove class active
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
        
            //show the previous fieldset
            previous_fs.show();
        
            //hide the current fieldset with style
            current_fs.animate({ opacity: 0 }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;
        
                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    previous_fs.css({ 'opacity': opacity });
                },
                duration: 600
            });
        });
        
        $('.radio-group .radio').click(function () {
            $(this).parent().find('.radio').removeClass('selected');
            $(this).addClass('selected');
        });
        
        $(".submit").click(function () {
            return false;
        })
        
        });

    return (
        <>
            <div className="container-fluid" id="grad1">
                <div className="row justify-content-center mt-0">
                    <div className="col-11 col-sm-9 col-md-10 col-lg-6 text-center p-0 mt-3 mb-2">
                        <img src={logo} alt="" className='_signimg img-fluid' />
                        <div className="card card1 px-0 pt-5 pb-5 mt-0 mb-3">
                            <h2><strong>Sign Up Your User Account</strong></h2>
                            <p>Fill all form field to go to next step</p>
                            <div className="row">
                                <div className="col-md-12 mx-0">
                                    <form id="msform">
                                        {/* <!-- progressbar --> */}
                                        <ul id="progressbar">
                                            <li className="active" id="account"><strong>Account</strong></li>
                                            <li id="personal"><strong>Personal</strong></li>
                                            <li id="payment"><strong>Payment</strong></li>
                                        </ul>
                                        {/* <!-- fieldsets --> */}
                                        <fieldset>
                                            <div className="card d-flex align-items-center justify-content-center">
                                                <h5>Account Information</h5>

                                                <div className="grid mt-4">
                                                    <div className="col-12 md:col-6 px-5">
                                                        <div className="field-radiobutton px-5">
                                                            <RadioButton inputId="option1" name="option" value="Organization" checked={radioValue === 'Organization'} onChange={(e) => setRadioValue(e.value)} />
                                                            <label htmlFor="option1" className='pt-2' >Organization</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 md:col-6 px-5">
                                                        <div className="field-radiobutton px-5">
                                                            <RadioButton inputId="option2" name="option" value="Root User" checked={radioValue === 'Root User'} onChange={(e) => setRadioValue(e.value)} />
                                                            <label htmlFor="option2" className='pt-2' >Root User</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {radioValue === null ? <Button type="button" label="Next" disabled className="mr-2 mb-2 _sfnbtn next" /> :
                                                <Button type="button" label="Next" className="mr-2 mb-2 _sfnbtn next" />}
                                        </fieldset>
                                        <fieldset>
                                            {radioValue === 'Organization' ? <div className="card" >
                                                <h5>Personal Information</h5>
                                                <div className="field">
                                                    <label htmlFor="oname">Organization Name</label>
                                                    <InputText id="oname" name="oname" type="text" required />
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="oid">Organization Id</label>
                                                    <InputText id="oid" name="oid" type="text" required />
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="uname">Username</label>
                                                    <InputText id="uname" name="uname" type="text" required />
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="password">Password</label>
                                                    <InputText id="password" name="password" type="password" required />
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="fname">First Name</label>
                                                    <InputText id="fname" name="fname" type="text" required />
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="lname">Last Name</label>
                                                    <InputText id="lname" name="lname" type="text" required />
                                                </div>
                                            </div> : <div className="card">
                                                <h5>Personal Information</h5>
                                                <div className="field">
                                                    <label htmlFor="uname">Username</label>
                                                    <InputText id="uname" name="uname" type="text" required />
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="password">Password</label>
                                                    <InputText id="password" name="password" type="password" required />
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="fname">First Name</label>
                                                    <InputText id="fname" name="fname" type="text" required />
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="lname">Last Name</label>
                                                    <InputText id="lname" name="lname" type="text" required />
                                                </div>
                                            </div>}



                                            <Button type="button" label="Previous" className="previous p-button-secondary mr-2 mb-2" />
                                            <Button type="button" label="Next" className="mr-2 mb-2 _sfnbtn next" />
                                        </fieldset>
                                        <fieldset>
                                            <div className="card">
                                                <h5>Payment Information</h5>
                                                <div className="radio-group">
                                                    <div className='radio' data-value="credit">
                                                        <img src="https://i.imgur.com/XzOzVHZ.jpg" alt="" width="200px" height="100px" />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="chname">Card Holder Name*</label>
                                                    <InputText id="chname" name="chname" type="text" required />
                                                </div>
                                                <div className="grid">
                                                    <div className="col-9">
                                                        <div className="field">
                                                            <label htmlFor="cardno">Card Number*</label>
                                                            <InputText id="cardno" name="cardno" type="text" required />
                                                        </div>
                                                    </div>
                                                    <div className="col-3">
                                                        <div className="field">
                                                            <label htmlFor="cvc">CVC*</label>
                                                            <InputText id="cvc" name="cvc" type="text" placeholder="***" required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-3">
                                                        <label className="pay">Expiry Date*</label>
                                                    </div>
                                                    <div className="col-9">
                                                        <select className="list-dt" id="month" name="expmonth" required>
                                                            <option defaultValue>Month</option>
                                                            <option>January</option>
                                                            <option>February</option>
                                                            <option>March</option>
                                                            <option>April</option>
                                                            <option>May</option>
                                                            <option>June</option>
                                                            <option>July</option>
                                                            <option>August</option>
                                                            <option>September</option>
                                                            <option>October</option>
                                                            <option>November</option>
                                                            <option>December</option>
                                                        </select>
                                                        <select className="list-dt" id="year" name="expyear" required>
                                                            <option defaultValue>Year</option>
                                                            <option>2021</option>
                                                            <option>2022</option>
                                                            <option>2023</option>
                                                            <option>2024</option>
                                                            <option>2025</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <Button type="button" label="Previous" className="previous p-button-secondary mr-2 mb-2" />
                                            <Button type="submit" label="Submit" className="mr-2 mb-2 _sfnbtn" />
                                        </fieldset>
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

export default Signup
