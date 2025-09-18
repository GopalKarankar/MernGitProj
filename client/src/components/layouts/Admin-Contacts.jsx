import React,{useEffect, useState} from 'react';
import { useAuth } from '../../store/Auth';
import { Link } from 'react-router-dom';


const AdminContacts = () => {
    
    const  {authorizationToken} = useAuth();

    const [contacts, setContacts] = useState([]);
    
    const getContactData = async () => {
        
        try{
                const response = await fetch(`https://merngitproj.onrender.com/api/admin/contacts`,{
                    method:"GET",
                    headers:{
                        Authorization:authorizationToken
                    }
                });

                const data = await response.json();
                
                setContacts(data);

            }catch(error){
            console.log(error);
        }

    }


    
    const deleteContact = async (id) => {

        try{

            const response = await fetch(`https://merngitproj.onrender.com/api/admin/contacts/delete/${id}`,{
                method:"DELETE",
                headers:{ 
                    Authorization:authorizationToken,
                },
            });

            const data = await response.json();

            if(response.ok){
                getContactData();
            }
            
            console.log("Delete msg : ",data);


        }catch(error){
            console.log(error);
        }


    }



    useEffect(() => {

        getContactData();

    },[]);

    
    console.log(contacts);


    

        return (
            <>
                            <div className='table table-responsive'>
                                <table className=''>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Update</th>
                                        <th>delete</th>
                                    </tr>

                                    {
                                        contacts.map((val)=>{
                                            return <>
                                            <tbody key={val._id}>
                                                <tr>

                                                    <td>{val._id}</td>
                                                    <td>{val.username}</td>
                                                    <td>{val.email}</td>

                                                    <td>
                                                            <Link to={`/admin/contacts/${val._id}/edit`} >Edit</Link>                                                            
                                                    </td>
                                                    
                                                    <td>
                                                        <button className='btn btn-danger' onClick={()=>{deleteContact(val._id)}} >Delete</button>
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

export default AdminContacts;
