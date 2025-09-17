import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Logout from './components/Logout';
import Home from './components/Home';
import Services from "./components/Services";
// import Error from "./components/Error";
import AdminLayouts from "./components/layouts/Admin-Layouts";
import AdminUsers from "./components/layouts/Admin-Users";
import AdminContacts from "./components/layouts/Admin-Contacts";
import AdminUpdate from "./components/layouts/Admin-Update";

const App = () => {


  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
       
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/service" element={<Services />} />
            {/* <Route default path="*" element={<Error />} /> */}

            <Route path="/admin" element={<AdminLayouts/>} >

              <Route path="users" element={<AdminUsers />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="users/:id/edit" element={<AdminUpdate /> } />

            </Route>

      </Routes>

    </BrowserRouter>
  );
};

export default App;
