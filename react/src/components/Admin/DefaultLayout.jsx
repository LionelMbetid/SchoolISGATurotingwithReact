import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";



export default function DefaultAdmin() {
  const { user, role, token, setUser} = useStateContext()


  // useEffect(()=>{
  //   axiosClient.get('admin').then(({data})=>{
  //     console.log(data);
  //     setUser(data);
  //   })
  // },[]);

  if (!token || role !== "admin") {
    return <Navigate to="/admin/login"/>
  }
  return (
    <div>
      <Outlet />
    </div>
  )
}
