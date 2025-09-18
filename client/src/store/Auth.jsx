import {createContext, useContext, useState, useEffect} from 'react';
// import {axios} from 'axios';
// import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [token, settoken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [services, setServices] = useState([]);
    const authorizationToken = `Bearer ${token}`;

    const storetokenInLS = (serverToken) =>{
        settoken(serverToken);
        return localStorage.setItem("token", serverToken);
     };

    const isLoggedIn = !!token; 
    // console.log("isloggedin : ",isLoggedIn);

    
     const logOutUser = () =>{
        settoken("");
        return localStorage.removeItem("token");
    };

    const userAunthentication = async () => {

        try{
            
            const response = await fetch(`https://merngitproj.onrender.com/api/auth/user`,{
                method:"GET",
                headers:{
                    Authorization:authorizationToken,
                },
            });

            if (response.status === 200) {
                // console.log("User data", response);
                const data = await response.json();
                // console.log("User data", data.userData);
                setUser(data.userData);

            };

        }catch(error){
            console.log("Error fetching data ",error);
        }
    };


    // To fetch the services from database
    const getServices = async() => {

        try{

            const response = await fetch(`https://merngitproj.onrender.com/api/data/service`,{
                methos:"GET",
            });

            if(response.ok){
                const data = await response.json();
                // console.log("Services : ", data.msg);
                setServices(data.msg);
            };

        }catch(error){
            console.log("Services error : ", error);
        }

    };

    // JWT authentication
    useEffect(() => {
        
        getServices();
        userAunthentication();

    }, []);


    return <AuthContext.Provider value={{storetokenInLS, isLoggedIn, logOutUser, user, services, authorizationToken }} >
                {children}
            </AuthContext.Provider>;
};


export const useAuth = () => {

    const authContextValue = useContext(AuthContext);

    if(!authContextValue){
        throw new Error("useAuth used outside of a provider.");
    }

    return authContextValue;

};

