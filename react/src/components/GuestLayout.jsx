import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";


export default function GuestLayout() {
  const { token, role} = useStateContext()
  if (token && role === "student") {
    return <Navigate to="/sessionsForMe"/>
  }
  return (
    <>
        <Outlet/>
    </>
  )
}
