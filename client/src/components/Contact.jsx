import React from 'react';
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import {useAuth} from './../store/Auth';

const Contact = () => {

                // const navigate = useNavigate();

                const [contact, setContact] = useState({
                    username: '',
                    email: '',
                    message: '',
                    // password: ''
                });

                const [userData, setUserData] = useState(true);

                const {user, storetokenInLS} = useAuth();

                if (userData && user) {
                    
                    setContact({
                        username: user.username,
                        email: user.email,
                        message: user.isAdmin,
                    });

                    setUserData(false);
                }


                const onInputHandle = (e) =>{

                    let name = e.target.name;
                    let value = e.target.value;
                    // console.log(name, value);

                    setContact({
                        ...contact,
                        [name]:value,
                    });

                };

                const onSubmitHandle = async (e) =>{

                    e.preventDefault();
                    console.log(contact);
                    
                    try {

                        const response = await fetch("http://localhost:5000/api/form/contact",{
                            method:"POST",
                            headers:{"Content-Type":"application/json"},
                            body:JSON.stringify(contact),
                        });

                        console.log(response); 

                        if(response.ok){

                            const res_data = await response.json();
                            console.log("contact res_data",res_data);
                            console.log("contact res_data.token : ",res_data.token);
                            console.log(res_data.extraDetails);
                            // localStorage.setItem("loginToken",res_data.token);
                            storetokenInLS(res_data.token);

                            setContact({
                                ...contact,
                                username:'',
                                email: '',
                                message: '',
                            });

                        }

                        // navigate("/Login");


                    }catch(error){
                        console.log(error);
                    }

                };

    return (
        <div>
            <form action="" onSubmit={onSubmitHandle}>

                <label htmlFor="">Username</label>
                <input type="text"  name='username' value={contact.username} onChange={onInputHandle}/>
                <br />

                {/* <label htmlFor="">Phone number</label>
                <input type="number"  name='phone' value={contact.phone} onChange={onInputHandle}/>
                <br /> */}

                <label htmlFor="">Email</label>
                <input type="email"  name='email' value={contact.email} onChange={onInputHandle}/>
                <br />

                <label htmlFor="">Message</label>
                <input type="text" name='message' value={contact.message} onChange={onInputHandle}/>
                <br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Contact;
