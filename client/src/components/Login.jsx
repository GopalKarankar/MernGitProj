import React from 'react';
import { useState }  from 'react';
import {useAuth} from './../store/Auth';
import { useNavigate } from "react-router-dom";


const Login = () => {

    const navigate = useNavigate();
    
    const [user, setuser] = useState({
        email: '',
        password: '',
    });

    const onInputHandle = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        // console.log(name, value);
        setuser({
            ...user,
            [name]:value,
        });
    }

    const {storetokenInLS} = useAuth();

    const onSubmitHandle = async (e) =>{
        
        e.preventDefault();
        console.log(user);
        
        try {

            const response = await fetch(`https://merngitproj.onrender.com/api/auth/login`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user),
            });

            console.log(response);

            if(response.ok){

                const res_data = await response.json();
                console.log("Login res_data",res_data);

                // localStorage.setItem("loginToken",res_data.token);
                
                storetokenInLS(res_data.token);

                setuser({
                    ...user,
                    email: '',
                    password:'',
                });

                navigate("/");                            


            }else{

                alert("Invalid credentials.");
                
            }

        }catch(error){
            console.log(error);
        }

    }

    return (
        <div>
            <form action="" onSubmit={onSubmitHandle}>

                {/* <label htmlFor="">Username</label>
                <input type="text"  name='username' value={user.username} onChange={onInputHandle}/>
                <br /> */}
                
                <label htmlFor="">Email</label>
                <input type="email"  name='email' value={user.email} onChange={onInputHandle}/>
                <br />

                <label htmlFor="">Password</label>
                <input type="text"  name='password' value={user.password} onChange={onInputHandle}/>
                <br />

                {/* <label htmlFor="">Email</label>
                <input type="text"  name='isAdmin' value={user.isAdmin} onChange={onInputHandle}/>
                <br /> */}

                <button type="submit">Submit</button>


            </form>
        </div>
    );
}

export default Login;
