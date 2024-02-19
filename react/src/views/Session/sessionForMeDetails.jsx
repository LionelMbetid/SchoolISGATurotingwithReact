import React, { useEffect, useState } from 'react'

import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '../../assets/icons/doneIcon.png';
import PendingIcon from '../../assets/icons/pendingIcon.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../context/ContextProvider';
import { useLocation } from 'react-router-dom';





export default function SessionForMeDetails() {

  const { user, setUser } = useStateContext();
  const [sessionsInfos, setSessionsInfos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let location = useLocation();
  const [messageUserNotFound, setMessageUserNotFound] = useState(false);

  useEffect(() => {

    const locationState = location.state;
    console.log(user.id);
    console.log(locationState.sessionId);
    axiosClient.get(`session/getSessionInfos/${locationState.sessionId}`).then(({ data }) => {
      setSessionsInfos(data.data);
      setIsLoading(false);


    }).catch(err => {
      setIsLoading(false);
      const response = err.response;
      if (response) {

        if (response.status === 404) {
          setMessageUserNotFound(true);
        }


      }
    })
  }, [user, location]);

  const getListTutor = (idSubject) => {

  }

  function search(e) {
    setMessageUserNotFound(false);
    const keyword = e.target.value;
    console.log(keyword);
    setIsLoading(true);
    axiosClient.get(`session/getSessionInfos/${locationState.sessionId}`).then(({ data }) => {

      const sessions = data.data;
      setIsLoading(false);
      setSessionsInfos(sessions.data);

      if (sessions.data.length === 0) {
        setMessageUserNotFound(true);
      }
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
  function handleChange(event, value) {
    const page = value;
    setIsLoading(true);
    axiosClient.get(`session/getSessionInfos/${locationState.sessionId}`).then(({ data }) => {
      setIsLoading(false);
      setSessionsInfos(data.data.data);
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




  return (
    <div class="p-4">
      <div className="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-black dark:text-white">Sessions Details :</h1>


      </div>



      {!isLoading ? (messageUserNotFound) ? <div>Error</div> :
        <div class="p-3">
          <div class="w-full drop-shadow-lg bg-white p-4">
            <h1 class="text-xl font-bold md:text-2xl">Session : <span class="text-gray-800 font-semibold">{sessionsInfos.title}</span></h1>
            <p class="text-sm text-gray-800 my-3">{sessionsInfos.description}</p>
            <div class="flex flex-col gap-y-2 md:flex-row md:items-center md:gap-x-2">
              <h1 class="text-sm font-bold text-gray-700 md:text-base">Par le tuteur :</h1>
              <a href="" class="block">
                <div class="flex flex-col self-center">
                  <h1 class="text-xs font-bold text-gray-900 md:text-sm">{sessionsInfos.student.name} | {sessionsInfos.student.email}</h1>
                </div>
              </a>
            </div>
            <div class="participants mt-5">
              <h1 class="text-sm font-bold text-gray-700 md:text-base mb-2">Les Participants :</h1>
              <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                {sessionsInfos.students.map((studentItem) => {

                  return (
                    <li class="flex items-center">
                      <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      {studentItem.name} | {studentItem.email}
                    </li>
                  )
                })}

              </ul>

            </div>
            <div class="infos mt-5">
              <div class="flex flex-col md:flex-row md:gap-x-8 md:justify-between flex-wrap">
                <div class="leftSide">
                  <div class="date block">
                    <h4 class="text-sm font-bold">Date Programmé :</h4>
                    <h6 class="text-Red text-sm font-bold mt-1">{sessionsInfos.dateBegin} | {sessionsInfos.timeBegin}</h6>
                  </div>
                  <div class="status mt-2">
                    <h4 class="text-sm font-bold">Status :</h4>
                    <div class="flex flex-row gap-x-1 mt-2">
                      <img src={sessionsInfos.status === "notYet" ? PendingIcon : DoneIcon} alt="status" class="h-4 w-4" />
                      {sessionsInfos.status === "notYet" ? (
                        <h6 class="text-xs md:text-sm text-red-800">en Attente</h6>
                      ) : <h6 class="text-xs md:text-sm text-green-800">Déja Passé</h6>}

                    </div>
                  </div>
                </div>
                <div class="rightSide mt-4 md:mt-0">

                </div>
              </div>
            </div>
          </div>
        </div>

        : <div className="flex mt-16 w-full items-center justify-center">
          <CircularProgress /></div>}
    </div>
  )
}

