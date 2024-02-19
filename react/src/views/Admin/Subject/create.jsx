import React, { useEffect, useRef, useState } from 'react'
import axiosClient from '../../../axios-client';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from 'react-router-dom';




export default function CreateSubject() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const classidRef = useRef();
  const navigate = useNavigate();

  const [errors, setErrors] = useState(null);
  const [successCreate, setSuccessCreate] = useState(false);


  const onSubmit = (e) => {
    e.preventDefault();
    let title = titleRef.current.value;
    let description = descriptionRef.current.value;
    setErrors(null);
    if (!description) {
      description = null;
    }
    const payload = {
      title: title,
      description: description,
    }
    axiosClient.post('/admin/subject/create', payload).then(({ data }) => {
	    navigate('/admin/subject/list');
    }).catch(err => {
      const response = err.response;
      if (response) {
        if (response.status === 422) {
          console.log("hello error");
          setErrors(response.data.errors);
        }


      }
    })
  }
  return (
    <div className="mt-6">
      <div className="text-2xl font-bold">Ajouter Matière:</div>

      <form className="mt-4" onSubmit={onSubmit}>
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
        <div class="mb-6">
          <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre</label>
          <input ref={titleRef} type="text" id="title" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" />
        </div>
        <div class="mb-6">
          <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">description (Optionel):</label>
          <input ref={descriptionRef} type="description" id="description" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
        </div>

        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
      </form>

    </div>
  )
}
