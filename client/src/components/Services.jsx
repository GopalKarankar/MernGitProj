import React from 'react';
import {useAuth} from './../store/Auth';

const Services = () => {

    const {services} = useAuth();
    
    console.log(services);

    return (
        <div>

            <h1>Services</h1>

            <div className="container">
                <div className="row">
                    {services.map((val)=>{
                        return <>
                        <hr />

                        <div className="col-md-4" key={val._id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{val.service}</h5>
                                    <p className="card-text">{val.price}</p>
                                    <p className="card-text">{val.description}</p>
                                    <p className="card-text">{val.provider}</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <br /><br />

                        </>;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Services;
