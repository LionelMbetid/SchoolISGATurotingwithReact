import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  role:null,
  setUser: ()=>{},
  setToken: ()=>{},
  setRole: ()=>{}
})
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [role, _setRole] = useState(localStorage.getItem('ROLE_USER'));
  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }
  const setRole = (role) => {
    _setRole(role);
    if (role) {
      localStorage.setItem('ROLE_USER', role);
    } else {
      localStorage.removeItem('ROLE_USER');
    }
  }
  return (
    <StateContext.Provider value={{
     user,
     token,
     role,
     setUser,
     setToken,
     setRole
    }}>
      {children}
    </StateContext.Provider>
  )
}
export const useStateContext = ()=> useContext(StateContext);
