import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";


export default function GuestAdmin() {
  const { token, role} = useStateContext()
  if (token && role === "admin") {
    return <Navigate to="/admin/student/list"/>
  }
  return (
    <>
        <Outlet/>
    </>
  )
}
