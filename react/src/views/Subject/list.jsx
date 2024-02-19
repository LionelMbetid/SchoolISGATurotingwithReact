import React, { useEffect, useState } from 'react'

import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../context/ContextProvider';
import { Link } from 'react-router-dom';





export default function ListStudentSubjects() {

  const { user, setUser } = useStateContext();
  const [subjectsList, setSubjectsList] = useState([]);
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messageUserNotFound, setMessageUserNotFound] = useState(false);


  useEffect(() => {
    console.log(user.id);
    if (page === null) {
      setPage(1);
    }
    axiosClient.get(`subject/getAllSubjects/${user.id}`, { params: { page: page } }).then(({ data }) => {
      setIsLoading(false);
      setSubjectsList(data.data.data);
      setPage(data.data.current_page);
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

  function search(e) {
    setMessageUserNotFound(false);
    const keyword = e.target.value;
    console.log(keyword);
    setIsLoading(true);
    axiosClient.get(`subject/getAllSubjects/${user.id}/${keyword}`, { params: { page: page } }).then(({ data }) => {

      const subjects = data.data;
      setIsLoading(false);
      setSubjectsList(subjects.data);
      setPage(subjects.current_page);
      if (subjects.data.length === 0) {
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
    axiosClient.get(`subject/getAllSubjects/${user.id}`, { params: { page: page } }).then(({ data }) => {
      setIsLoading(false);
      setSubjectsList(data.data.data);
      setPage(data.data.current_page);
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
        <h1 class="text-2xl font-bold text-black dark:text-white">Liste des Matiéres</h1>

        <div className="flex w-1/3">
          <form className="block w-full">
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input onChange={search} type="search" id="default-search" class="block w-full py-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." />

            </div>
          </form>
        </div>
      </div>



      {!isLoading ? (messageUserNotFound) ? <div>Tutors Not Found</div> :
        <div>
          {
            subjectsList.map(listItem => {
              return <div key={listItem.id}>
                <div class="w-full mt-8 py-5 drop-shadow-lg flex flex-col md:flex-row md:justify-between md:items-center px-4 bg-white mb-4">
                  <div class="leftSide">
                    <div class="flex items-center h-full">
                      <div class="flex flex-col ml-4">
                        <h3 class="text-l font-semibold dark:text-white">{listItem.title}</h3>


                      </div>
                    </div>
                  </div>
                  <div class="rightSide mt-6 md:mt-0">
                    <Link to="/tutors/list/subject" state={{ subjectId: listItem.id,subjectName: listItem.title }} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Voir Tuteurs
                      <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </Link>
                  </div>

                </div>

              </div>
            })
          }
          <Pagination
            count={subjectsList.last_page}
            defaultPage={subjectsList.from}
            page={subjectsList.current_page}
            onChange={handleChange}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </div>

        : <div className="flex mt-16 w-full items-center justify-center">
          <CircularProgress /></div>}
    </div>
  )
}
