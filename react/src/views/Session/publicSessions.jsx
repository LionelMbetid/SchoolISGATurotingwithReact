import React, { useEffect, useState } from 'react'

import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '../../assets/icons/doneIcon.png';
import PendingIcon from '../../assets/icons/pendingIcon.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../context/ContextProvider';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';






export default function PublicSessions() {

  const { user, setUser } = useStateContext();
  const [sessionsList, setSessionsList] = useState([]);
  //const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messageUserNotFound, setMessageUserNotFound] = useState(false);
  const [messageJoinedSession,setMessageJoinedSession] = useState(false);



  useEffect(() => {
    console.log(user.id);
    // if (page === null) {
    //   setPage(1);
    // }
    axiosClient.get(`session/getPublicSessions/${user.id}`).then(({ data }) => {
      setIsLoading(false);
      setSessionsList(data.data);
      //setPage(data.data.current_page);
    }).catch(err => {
      setIsLoading(false);
      const response = err.response;
      if (response) {

        if (response.status === 404) {
          setMessageUserNotFound(true);
        }


      }
    })
  }, [user]);


  const getListTutor = (idSubject) => {

  }

  const joinSession = (idSession)=>{

    setIsLoading(true);

    axiosClient.get(`session/joinSession/${user.id}/${idSession}`).then(({ data }) => {
      setIsLoading(false);
      setMessageJoinedSession(true);
      //setPage(data.data.current_page);
    }).catch(err => {
      setIsLoading(false);
      const response = err.response;
      if (response) {

        if (response.status === 404) {
          setMessageUserNotFound(true);
        }


      }
    })
  }

  // function search(e) {
  //   setMessageUserNotFound(false);
  //   const keyword = e.target.value;
  //   console.log(keyword);
  //   setIsLoading(true);
  //   axiosClient.get(`session/getSessionsForMe/${user.id}/${keyword}`, { params: { page: page } }).then(({ data }) => {

  //     const sessions = data.data;
  //     setIsLoading(false);
  //     setSessionsList(sessions.data);
  //     setPage(sessions.current_page);
  //     if (sessions.data.length === 0) {
  //       setMessageUserNotFound(true);
  //     }
  //   }).catch(err => {

  //     setIsLoading(false);
  //     const response = err.response;
  //     if (response) {
  //       if (response.status === 404) {
  //         setMessageUserNotFound(true);
  //       }


  //     }
  //   })
  // }
  // function handleChange(event, value) {
  //   const page = value;
  //   setIsLoading(true);
  //   axiosClient.get(`session/getSessionsForMe/${user.id}`, { params: { page: page } }).then(({ data }) => {
  //     setIsLoading(false);
  //     setSessionsList(data.data.data);
  //     setPage(data.data.current_page);
  //   }).catch(err => {
  //     setIsLoading(false);
  //     const response = err.response;
  //     if (response) {
  //       if (response.status === 404) {
  //         setMessageUserNotFound(true);
  //       }


  //     }
  //   })
  // }




  return (

    <div class="p-4">
      { messageJoinedSession && <Stack sx={{ width: '100%' }} spacing={2} >
        <Alert severity="success" onClose={() => { setMessageJoinedSession(false)}}>Tu as entré aà cette session avec succés</Alert>
      </Stack>}
      <div className="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-black dark:text-white">Public Sessions</h1>

        {/* <div className="flex w-1/3">
          <form className="block w-full">
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-SSgray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input onChange={search} type="search" id="default-search" class="block w-full py-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Search Mockups, Logos..." />

            </div>
          </form>
        </div> */}
      </div>



      {!isLoading ? (messageUserNotFound || sessionsList.length === 0) ? <div>Sessions Not Found</div> :
        <div>
          {
            sessionsList.map(listItem => {
              return <div class="w-full drop-shadow-lg flex flex-col md:flex-row md:justify-between py-2 px-4 bg-white mb-4">
              <div class="leftSide">
                  <div class="flex items-center h-full">
                      <div class="flex flex-col ml-4">
                          <h3 class="text-l font-semibold dark:text-white">{listItem.title}</h3>
                          <h6 class="text-xs md:text-sm text-gray-600 font-semibold dark:text-white">{listItem.student.name}
                          </h6>
                          <h6 class="text-xs md:text-sm font-semibold mt-2 dark:text-white">Matiére : <span
                                  class="text-gray-600">{listItem.subject_session.title}</span> </h6>
                          <h6 class="text-xs md:text-sm font-semibold mt-2 dark:text-white">Nombre de Participant :
                              <span class="text-Red">{listItem.students_count}</span></h6>
                          <h6 class="text-xs md:text-sm font-semibold mt-1 dark:text-white">Place restant : <span
                                  class="text-Red">{listItem.nbrStudents - listItem.students_count}</span></h6>
                      </div>
                  </div>
              </div>
              <div class="rightSide mt-6 md:mt-0">
                  <div class="flex flex-col items-center md:items-end p-2">
                      <div class="text-xs md:text-sm font-semibold text-gray-700">Date Programmé : <span
                              class="text-Red text-xs">{listItem.dateBegin}{listItem.timeBegin}</span></div>
                      <div class="flex flex-row gap-x-1 mt-2">
                          <img src={PendingIcon} alt="enAttente" class="h-4 w-4"/>
                          <h6 class="text-xs md:text-sm text-gray-800">en Attente</h6>
                      </div>
                      <Link onClick={()=>joinSession(listItem.id)}
                          class="mt-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                          Join
                          <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd"
                                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                  clip-rule="evenodd"></path>
                          </svg>
                      </Link>
                  </div>
              </div>

          </div>
            })
          }
        </div>

        : <div className="flex mt-16 w-full items-center justify-center">
          <CircularProgress /></div>}
    </div>
  )
}
