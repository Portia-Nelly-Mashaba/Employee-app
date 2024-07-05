import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import Modals from './Modals';

function MyRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/add" element={ <EmployeeForm />}/>
            <Route path="/list" element={<EmployeeList />}/>
            <Route path="/edit" element={<Modals />}/>
        </Routes>
    );
}

export default MyRouter
