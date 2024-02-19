import React, { useEffect, useRef, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../context/ContextProvider';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

export default function AddTutorSubject() {

  const { user } = useStateContext();

  const [isLoading, setIsLoading] = useState(true);
  const [subjectsListNotUser, setSubjectsListNotUser] = useState([]);
  const [subjectsListUser, setSubjectsListUser] = useState([]);
  const [isOpenSuccessMessage,setIsOpenSuccessMessage] = useState(false);


  const niveauRef = useRef();
  const subjectIdRef = useRef();

  const onSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const payload = {
      idUser: user.id,
      niveau: niveauRef.current.value,
      subjectId: subjectIdRef.current.value
    }
    axiosClient.post("tutor/addSubjectToUser", payload).then(({ data }) => {
      getSubjectsNotOfTutor();
      setIsLoading(false);
      setIsOpenSuccessMessage(true);

    }).catch(err => {
      const response = err.response;
      if (response) {
        if (response.status === 422) {
          console.log("no data found");
        }
      }
    });
  }


  const getSubjectsNotOfTutor = () =>  {
    axiosClient.get(`tutor/getSubjectsNotOfTutor/${user.id}`).then(({ data }) => {
      console.log(data);
      setIsLoading(false);
      setSubjectsListNotUser(data.subjectsNotTutor);
      setSubjectsListUser(data.subjectsTutor);
    }).catch(err => {
      setIsLoading(false);
      const response = err.response;
      if (response) {

        if (response.status === 404) {
          setMessageSubjectNotFound(true);
        }


      }
    })
  }

  const deleteSubjectTutor = (idSubject)=>{
    setIsOpenSuccessMessage(false);
    setIsLoading(true);
    axiosClient.get(`subject/deleteSubjectTutor/${user.id}/${idSubject}`).then(({ data }) => {
      console.log(data);
      getSubjectsNotOfTutor();
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
      const response = err.response;
      if (response) {

        if (response.status === 404) {
          setMessageSubjectNotFound(true);
        }


      }
    })
  }


  useEffect(getSubjectsNotOfTutor, [user]);



  return (
    <>
     {
       isOpenSuccessMessage && <Stack sx={{ width: '100%' }} spacing={2}>
       <Alert onClose={() => { setIsOpenSuccessMessage(false); }}>Tu as ajouté la matiére avec succés</Alert>
     </Stack >
     }

    {
      isLoading?
        <div className = "flex mt-16 w-full items-center justify-center">
        < CircularProgress />
      </div >
      : (subjectsListNotUser != [] && subjectsListUser != []) &&
    <div className="flex flex-col spac-x-0 space-y-6 md:flex-row md:space-x-6 md:space-y-0 mt-6">
      <div className="w-1/2">
        <div className="text-2xl font-bold">Ajouter Matière:</div>

        <form className="mt-4" onSubmit={onSubmit}>

          <div class="mb-6">

            <label for="subject"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject:</label>
            <select id="subject" ref={subjectIdRef} name="subjectid"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
              {
                subjectsListNotUser.map((item) => {
                  return (
                    <option value={item.id}>{item.title}</option>
                  )
                })
              }



            </select>
          </div>
          <div class="mb-6">

            <label for="niveau"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Niveau:</label>
            <select id="niveau" ref={niveauRef} name="niveau"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
              <option value="moyen">moyen</option>
              <option value="avance">avancé</option>
            </select>
          </div>

          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ajouter Matiére</button>
        </form>

      </div>
      <div className="w-1/2">
        <div className="font-semibold text-xl">list de matiere de cet étudiants</div>

        <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700 mt-6">

          {
            subjectsListUser.map((item) => {
              return (
                <li key={item.id} class="py-3 sm:py-4 flex justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="flex-1 min-w-0">
                      <p class="text-lg font-medium text-gray-700 truncate dark:text-white">
                        {item.title}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button onClick={()=>deleteSubjectTutor(item.id)}><CloseIcon className="text-red-600 font-bold cursor-pointer"/></button>
                  </div>
                </li>
              )
            })
          }




        </ul>

      </div>
    </div>

}
  </>
)
}
