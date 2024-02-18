import React, { useEffect, useReducer, useState } from "react";
import {Reducer} from "../Reducers/Reducer";

export const AppContext = React.createContext({});

export const AppProvider = ({children}) => {
  const initialState = {
    user: [],
  };
  
  let userInfo = JSON.parse(localStorage.getItem("loginUser"));
  const [state, dispatch] = useReducer(Reducer, userInfo);
  const [role,setRole] = useState("/login")
  const [attendancePercentage,setAttendancePercentage] = useState("")

  useEffect(() => {
    localStorage.setItem("loginUser", JSON.stringify(state));
  }, [state]);

    return(
        <AppContext.Provider value={{...state,dispatch,role,setRole,attendancePercentage,setAttendancePercentage}}>
          {children}
        </AppContext.Provider>
    )
}