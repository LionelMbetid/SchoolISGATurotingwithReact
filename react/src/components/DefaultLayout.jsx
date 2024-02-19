import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";



export default function DefaultLayout() {
  const { user, role, token, setUser} = useStateContext()


  useEffect(()=>{
    axiosClient.get('user').then(({data})=>{
      console.log(data);
      setUser(data);
    })
  },[]);
  console.log(token);
  console.log(role);
  if (!token || role !== "student") {
    return <Navigate to="/login"/>
  }
  return (
    <div>
      <Outlet />
    </div>
  )
}
