import React, { useContext, useEffect } from 'react'
import { AppContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Slider from './../Components/Layout/Slider';
import Login from './../Pages/Login';

export const UserAuth = () => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();
   
    return(
        <>
           {
           user.role == "faculty"
                ?
                <Slider role="facultyMenu"/>
                :
                user.role == "clerk"
                ?
                <Slider role="clerkMenu"/>
                :
                user.role == "Admin"
                ?
                <Slider role="adminMenu"/>
                :
                user.role=="student"
                ?
                <Slider role="studentMenu"/>
                :
                <Login/>

            

           }
        </>
    )

}
