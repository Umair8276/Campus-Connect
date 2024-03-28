import React, { useContext, useEffect } from 'react'
import { AppContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Slider from './../Components/Layout/Slider';
import Login from './../Pages/Login';

export const IsLoggedin = ({children}) => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate()
     if(!user || !user.role)
       return children;
    else{
       return <>You Already Logged In to the App
       <button onClick={() => navigate(-1)}>go back</button>
       </>
    }
}

export const FacultyAccess = ({children}) => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate()
    if(user && user.role == "faculty" ){
        return children;
    }
    else{
        return <>You Dont Have an Access
         <button onClick={() => navigate(-1)}>go back</button>
        </>
    }
}

export const StudentAccess = ({children}) => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate()
    if(user && user.role == "student"){
        return children;
    }
    else{
        return <>You Dont Have an Access
         <button onClick={() => navigate(-1)}>go back</button>
        </>
    }
}
export const ClerkAccess = ({children}) => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate()
    if(user && user.role == "clerk"){
        return children;
    }
    else{
        return <>You Dont Have an Access
         <button onClick={() => navigate(-1)}>go back</button>
        </>
    }
}

export const UserAuth = () => {
    const navigate = useNavigate();
    const { user } = useContext(AppContext);

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
