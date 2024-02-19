import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/ContextProvider";

export default function SignUp() {
  const nameRef = useRef();
  const emailRef = useRef();
  const CINRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [errors, setErrors] = useState(null);
  const [messageRegistred, setMessageRegistred] = useState(null);
  const { setUser, setToken } = useStateContext();
  const onSubmit = (e) => {
    e.preventDefault();
    setMessageRegistred(false);
    setErrors(null);
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      CIN: CINRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: confirmPasswordRef.current.value,
    }
    //console.log(payload);
    axiosClient.post('signup', payload).then(({ data }) => {
      console.log(data);
      setMessageRegistred(true);
    }).catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
        console.log("hello error");
        setErrors(response.data.errors);
      }
    })
  }
  const messageRegistredDismiss = ()=>{
    setMessageRegistred(false);
  }
  return (
    <div className="overflow-x-hidden">
      <div className="flex bg-white dark:bg-black w-screen h-full min-h-screen">
        <form className="w-full py-12 px-10 md:w-1/2" onSubmit={onSubmit}>

          <div className="mb-4">
            <h1 className="block text-3xl mb-2 font-bold text-gray-900 dark:text-white">S'inscrire</h1>
            <div className="h-1 w-32 bg-Red"></div>

          </div>

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
          {messageRegistred && <div id="alert-border-3" className="flex p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800" onClick={messageRegistredDismiss}>
            <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <div className="ml-3 text-sm font-medium">
              Registred Succefully<Link href="#" className="font-semibold underline hover:no-underline" to="/Login">Login Now</Link>
            </div>
            <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-3" aria-label="Close">
              <span className="sr-only">Dismiss</span>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>}

          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username
              :</label>
            <input ref={nameRef} type="text" id="name" name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email
              :</label>
            <input ref={emailRef} type="text" id="email" name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <p className="mt-2 text-xs text-red-600 dark:text-red-400"></p>
          </div>
          <div className="mb-6">
            <label htmlFor="cin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CIN
              :</label>
            <input ref={CINRef} type="text" id="cin" name="cin"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: EEXXXXXX" />
            <p className="mt-2 text-xs text-red-600 dark:text-red-400"></p>
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">tel
              :</label>
            <input ref={phoneRef} type="text" id="phone" name="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0652336523" />
            <p className="mt-2 text-xs text-red-600 dark:text-red-400"></p>
          </div>
          <div className="mb-6">
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">addresse
              :</label>
            <input ref={addressRef} type="text" id="address" name="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <p className="mt-2 text-xs text-red-600 dark:text-red-400"></p>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de
              passe :</label>
            <input ref={passwordRef} type="password" id="password" name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

            <p className="mt-2 text-xs text-red-600 dark:text-red-400"></p>
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmer Mot de passe
              :</label>
            <input ref={confirmPasswordRef} type="password" id="confirmPassword" name="password_confirmation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

            <p className="mt-2 text-xs text-red-600 dark:text-red-400"></p>
          </div>
          <button type="submit"
            className="text-white bg-Red hover:bg-darkishRed focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center dark:bg-Red dark:hover:bg-darkRed dark:focus:bg-darkishRed">Sign
            Up</button>
          <div className="flex mt-4">
            <div className="text-sm text-black dark:text-white">Vous etes déja Inscrit ?</div>
            <Link className="block ml-2 text-sm underline underline-offset-1 text-Red font-bold dark:text-lightRed" to="/login">Se connecter</Link>
          </div>


        </form>
        <div className="w-0 h-0 md:w-1/2 md:h-full  bg-picture-loginpage bg-cover fixed top-0 right-0">
          <div className="w-full h-full flex justify-center items-center backdrop-brightness-50">
          </div>
        </div>
      </div>
    </div>
  )
}
