import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useRef, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import jwtDecode from "jwt-decode";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



export default function Login() {


  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [invalidMessageShow, setInvalidMessageShow] = useState(false);
  const [errorBlocked,setErrorBlocked] = useState(false);
  const { setUser, setToken, setRole } = useStateContext();

  const invalidDismiss = () => {
    setInvalidMessageShow(false);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(null);
    setIsAuthorized(null);
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post('login', payload).then(({ data }) => {
      console.log(data.authorisation);
      const decoded = jwtDecode(data.authorisation.token);
      setUser(data.user);
      setToken(data.authorisation.token);
      setRole(decoded.role);
    }).catch(err => {
      const response = err.response;
      if (response) {
        if (response.status === 422) {
          console.log("hello error");
          setErrors(response.data.errors);
        } else if (response.status === 404) {
          setErrorBlocked(true);
        } else {
          setIsAuthorized(false);
          setInvalidMessageShow(true);

        }


      }
    })
  }
  return (
    <div className="overflow-x-hidden">
      <div className="flex bg-white dark:bg-black w-screen items-center h-full min-h-screen">

        <form className="w-full px-10 py-10 md:w-1/2" onSubmit={onSubmit}>

          <div className="mb-4">
            <h1 className="block text-3xl mb-2 font-bold text-gray-900 dark:text-white">Se connecter</h1>
            <div className="h-1 w-32 bg-Red"></div>
          </div>
          {errorBlocked && <Stack sx={{ width: '100%' }} spacing={2} >
            <Alert severity="error" onClose={() => { setErrorBlocked(false) }}>accés interdit. Contactez l'admin pour plus d'infos</Alert>
          </Stack>}
          {errors && <div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Danger</span>
            <div>
              <span className="font-medium">you have some errors:</span>
              <ul className="mt-1.5 ml-4 list-disc list-inside">
                {Object.keys(errors).map(key => (
                  <li key={key}>{errors[key][0]}</li>
                ))}
              </ul>
            </div></div>}
          {(isAuthorized === false && invalidMessageShow == true) && <div id="alert-2" className="flex p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" onClick={invalidDismiss}>
            <svg ariaHidden="true" className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Info</span>
            <div className="ml-3 text-sm font-medium">
              username ou mot de passe invalide
            </div>
            <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>}


          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email
              :</label>
            <input ref={emailRef} type="text" id="email" name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com" />

            <p className="mt-2 text-xs text-red-600 dark:text-red-400"> </p>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de
              passe :</label>
            <input type="password" ref={passwordRef} id="password" name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <p className="mt-2 text-xs text-red-600 dark:text-red-400"> </p>

          </div>
          <button type="submit"
            className="text-white bg-Red hover:bg-darkishRed focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center dark:bg-Red dark:hover:bg-darkRed dark:focus:bg-darkishRed">Se
            connecter</button>
          <div className="flex mt-4">
            <div className="text-sm text-black dark:text-white">Vous ete pas Inscrit ?</div>
            <Link className="block ml-2 text-sm underline underline-offset-1 text-Red font-bold dark:text-lightRed" to="/signup">S'nscrire Maintenant</Link>
          </div>

        </form>
        <div className="w-0 h-0 md:w-1/2 md:h-full bg-picture-loginpage bg-cover fixed top-0 right-0">
          <div className="w-full h-full flex justify-center items-center backdrop-brightness-50">
          </div>
        </div>
      </div>
    </div>
  )
}
