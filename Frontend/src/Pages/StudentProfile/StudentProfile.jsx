import React, { useContext } from 'react'
import "./style.css"
import { AppContext } from '../../Context/AuthContext'

const StudentProfile = () => {
  const {user} = useContext(AppContext)
  return (
    <>
      <h1 style={{marginBottom:"1rem"}}>Your Profile</h1>
    <div className='stContainer'>
       <div className="cont">

        <div className="input">
          <h4>First Name : </h4>
          <p style={{fontSize:"18px",textAlign:"center"}}>{user.firstName}</p>
        </div>
        <div className="input">
          <h4>Last Name : </h4>
          <p style={{fontSize:"18px",textAlign:"center"}}>{user.lastName}</p>
        </div>
        <div className="input">
          <h4>branch : </h4>
          <p style={{fontSize:"18px",textAlign:"center"}}>{user.branch}</p>
        </div>
        <div className="input">
          <h4>Class : </h4>
          <p style={{fontSize:"18px",textAlign:"center"}}> {user.stu_class}</p>
        </div>
        <div className="input">
          <h4>Address : </h4>
          <p style={{fontSize:"18px",textAlign:"center"}}> {user.address}</p>
        </div>
        <div className="input">
          <h4>State : </h4>
          <p style={{fontSize:"18px",textAlign:"center"}}>{user.state}</p>
        </div>
        <div className="input">
          <h4>City : </h4>
          <p style={{fontSize:"18px",textAlign:"center"}}>{user.city}</p>
        </div>
        <div className="input">
          <h4>District : </h4>
          <p style={{fontSize:"18px",textAlign:"center"}}>{user.district}</p>
        </div>
        <div className="input">
          <h4>Start Year : </h4>
          <p style={{fontSize:"18px",textAlign:"center"}}>{user.startYear}</p>
        </div>
        <div className="input">
          <h4>Graduation Year : </h4>
          <p style={{fontSize:"18px",textAlign:"center"}}>{user.endYear}</p>
        </div>
        <div className="input">
          <h4>Total Fees : </h4>
          <p style={{fontSize:"18px",textAlign:"center"}}>{user.totalFees}</p>
        </div> 
        <div className="input">
          <h4>Fees Paid : </h4>
          <p style={{fontSize:"18px",textAlign:"center"}}>{user.feesPaid}</p>
        </div>
        <div className="input">
          <h4>Mobile No : </h4>
          <p style={{fontSize:"18px",textAlign:"center"}}>{user.mobileNo}</p>
        </div>
        <div className="input">
          <h4>Roll No : </h4>
          <p style={{fontSize:"18px",textAlign:"center"}}>{user.rollNo}</p>
        </div>
        <div className="input">
          <h4>Sem : </h4>
          <p style={{fontSize:"18px",textAlign:"center"}}>{user.currentSem}</p>
        </div>
        <div className="input">
          <h4>Old Email : </h4>
          <p style={{fontSize:"18px",textAlign:"center"}}>{user.oldEmail}</p>
        </div>
        <div className="input">
          <h4>New Email : </h4>
          <p style={{fontSize:"18px",textAlign:"center"}}>{user.newEmail}</p>
        </div>
       

       </div>

    </div>
    </>
  )
}

export default StudentProfile