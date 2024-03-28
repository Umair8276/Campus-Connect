import React, { useEffect, useReducer, useState } from "react";
import {Reducer} from "../Reducers/Reducer";

export const AppContext = React.createContext({});

export const AppProvider = ({children}) => {
  const initialState = {
    user: [],
  };
  
  let userInfo = JSON.parse(localStorage.getItem("loginUser"));
  const index = localStorage.getItem("index");
  const [state, dispatch] = useReducer(Reducer, userInfo);
  const [role,setRole] = useState("/login")
  const [presentStudent,setPresentStudent] = useState([])
  const [absentStu,setAbsentStu] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);


  useEffect(() => {
    localStorage.setItem("loginUser", JSON.stringify(state));
  }, [state]);


  useEffect(() => {
    localStorage.setItem("index",selectedIndex);
  }, [selectedIndex]);

    return(
        <AppContext.Provider value={{...state,dispatch,role,setRole,presentStudent,setPresentStudent,absentStu,setAbsentStu,selectedIndex,setSelectedIndex}}>
          {children}
        </AppContext.Provider>
    )
}