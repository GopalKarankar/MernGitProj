import React,{useEffect, useState} from 'react';
import { useAuth } from '../../store/Auth';
import {Link} from 'react-router-dom';

const AdminUsers = () => {

    const [users, setUsers] = useState([]);

    const {authorizationToken} = useAuth();


    // TO delete the user
    const getAllUsersData = async () => {

        try{
           
            const response = await fetch("http://localhost:5000/api/admin/users",{
                method:"GET",
                headers:{ 
                    Authorization:authorizationToken,
                },
            });

            const data = await response.json();
            
            console.log("Admin users : ",data);

            setUsers(data);


        }catch(error){
            console.log(error);
        }

    };

    useEffect(() => {
        getAllUsersData();
    },[users._id]);


    const deleteUser = async (id) => {

        try{

            const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`,{
                method:"DELETE",
                headers:{ 
                    Authorization:authorizationToken,
                },
            });

            const data = await response.json();

            if(response.ok){
                getAllUsersData();
            }
            
            console.log("Delete msg : ",data);


        }catch(error){
            console.log(error);
        }


    }


        return (
            <>
                            <div className='table table-responsive'>
                                <table className=''>
                                    <thead>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Update</th>
                                        <th>delete</th>
                                    </thead>

                                    {
                                        users.map((val)=>{
                                            return <>
                                            <tbody key={val._id}>
                                                <tr>

                                                    <td>{val._id}</td>
                                                    <td>{val.username}</td>
                                                    <td>{val.email}</td>
                                                    <td>{JSON.stringify(val.isAdmin)}</td>
                                                    
                                                    <td>
                                                        <Link to={`/admin/users/${val._id}/edit`} >Edit</Link>
                                                    </td>

                                                    <td>
                                                        <button className='btn btn-danger' onClick={()=>{deleteUser(val._id)}} >Delete</button>
                                                    </td>

                                                </tr>
                                            </tbody>

                        </>
                    })
                }                                
                                </table>
                            </div>

            </>
        );

}

export default AdminUsers;
