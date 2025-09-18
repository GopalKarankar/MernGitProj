import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {useAuth} from './../../store/Auth';


const AdminUpdate = () => {


    
                    const [data, setData] = useState({
                        username: '',
                        email: '',
                        isAdmin: '',
                        // password: ''
                    });    

                    const params = useParams();

                    const navigate = useNavigate();

                    const {authorizationToken} = useAuth();
                    

                            
                    useEffect(() => {
                        getSingleUserData();
                    },[params.id]);


                    // TO update the data
                    const getSingleUserData = async () => {

                        try{

                            const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`,{
                                method:"GET",
                                headers:{ 
                                    Authorization:authorizationToken,
                                },
                            });

                            const data = await response.json();

                            // if(response.ok){
                            //     getAllUsersData();
                            // }
                            
                            console.log("Admin update.jsx : ",data);
                            
                            setData(data);

                        }catch(error){
                            console.log(error);
                        }


                    }
                    


                    const onInputHandle = (e) =>{
    
                        let name = e.target.name;
                        let value = e.target.value;
                        // console.log(name, value);
    
                        setData({
                            ...data,
                            [name]:value,
                        });
    
                    };
    
                    const onSubmitHandle = async (e) =>{
    
                        e.preventDefault();
                        // console.log(data);
                        
                        try {
    
                            const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`,{
                                method:"PATCH",
                                headers:{                  
                                    "Content-Type":"application/json",                   
                                    Authorization:authorizationToken,
                                },
                                body:JSON.stringify(data),
                            });
    
                            console.log(response); 
    
                            if(response.ok){
    
                                const res_data = await response.json();
                                console.log("data res_data",res_data);
                                console.log("data res_data.token : ",res_data.token);
                                console.log(res_data.extraDetails);
                                // localStorage.setItem("loginToken",res_data.token);
                                // storetokenInLS(res_data.token);
    
                                setData({
                                    ...data,
                                    username:'',
                                    email: '',
                                    isAdmin: '',
                                });
 
                                navigate("/admin/users");
    
                            }
    
    
    
                        }catch(error){
                            console.log(error);
                        }
    
                    };



    
    return (
        <div>
            <form onSubmit={onSubmitHandle}>

                <label htmlFor="">Username</label>
                <input type="text"  name='username' value={data.username} onChange={onInputHandle}/>
                <br />

                {/* <label htmlFor="">Phone number</label>
                <input type="number"  name='phone' value={data.phone} onChange={onInputHandle}/>
                <br /> */}

                <label htmlFor="">Email</label>
                <input type="email"  name='email' value={data.email} onChange={onInputHandle}/>
                <br />

                <label htmlFor="">Admin status</label>
                <input type="text" name='isAdmin' value={data.isAdmin} onChange={onInputHandle}/>
                <br />

                <button type="Update">Update</button>
            </form>
        </div>
    );

}

export default AdminUpdate;
