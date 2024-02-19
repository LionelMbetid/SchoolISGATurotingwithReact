import React, { useEffect, useState } from 'react'
import axiosClient from '../../../axios-client'
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';





export default function ListStudentControl() {

  const [studentsList, setStudentsList] = useState([]);
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messageUserNotFound, setMessageUserNotFound] = useState(false);


 const fetchList = () => {
  if(page === null){
    setPage(1);
  }
  axiosClient.get('admin/student/list',{ params: { page: page } }).then(({ data }) => {
    setIsLoading(false);
    setStudentsList(data.data);
    setPage(data.data.current_page);
  }).catch(err => {
    setIsLoading(false);
    const response = err.response;
    if (response) {

      if(response.status === 404){
        setMessageUserNotFound(true);
      }


    }
  })
};
  useEffect(()=>fetchList(), []);

  function handleChange(event, value) {
    const page = value;
    setIsLoading(true);
    setPage(page);
    axiosClient.get('admin/student/list', { params: { page: page } }).then(({ data }) => {
      setIsLoading(false);
      setStudentsList(data.data);
      setPage(data.data.current_page);
    }).catch(err => {
      setIsLoading(false);
      const response = err.response;
      if (response) {

        if(response.status === 404){
          setMessageUserNotFound(true);
        }


      }
    })
  }


  const editStudentStatus = ($idUser,$status) => {
    setIsLoading(true);
    const payload = {
       idUser : $idUser,
       status :$status
    }
    axiosClient.post('admin/student/editStatus', payload).then(({ data }) => {
      fetchList();
    }).catch(err => {
      setIsLoading(false);

      const response = err.response;
      console.log(response);
      if (response) {

        if(response.status === 404){
          setMessageUserNotFound(true);
        }


      }
    })
  }

  function search(e) {
    const keyword = e.target.value;
    setIsLoading(true);
    const payload = {
       keyword: keyword
    }
    axiosClient.post('admin/student/listbyKeyword', payload).then(({ data }) => {
      setIsLoading(false);
      setStudentsList(data.data);
      setPage(data.data.current_page);
    }).catch(err => {
      setIsLoading(false);
      const response = err.response;
      if (response) {
        if(response.status === 404){
          setMessageUserNotFound(true);
        }


      }
    })
  }




  return (
    <div class="p-4">
      <div className="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-black dark:text-white">Liste de Etudiants</h1>

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



      {!isLoading ? (messageUserNotFound) ? <div>Users Not Found</div> :
        <div>
          {
            studentsList.data.map(listItem => {
              return <div>
                <div class="w-full mt-8 py-5 drop-shadow-lg flex flex-col md:flex-row md:justify-between px-4 bg-white mb-4">
                  <div class="leftSide">
                    <div class="flex items-center h-full">
                      <div class="flex flex-col self-center">
                        <div
                          class="flex items-center justify-center w-14 h-14 rounded-full bg-cover bg-center bg-no-repeat bg-blue-600">
                          <div className="text-white font-bold text-lg">{listItem.name.charAt(0)}</div>
                        </div>

                      </div>
                      <div class="flex flex-col ml-4">
                        <h3 class="text-l font-semibold dark:text-white">{listItem.name}</h3>
                        <h6 class="text-xs md:text-sm text-gray-600 font-semibold dark:text-white">
                          {listItem.email}
                        </h6>
                        {
                          listItem.subjects.length > 0 && <h6 class="text-xs md:text-sm font-semibold mt-2  dark:text-white"> <span className="mr-2">Matiére Enseigné :</span>
                            {listItem.subjects.map((item) => {
                              return (<span
                                class="text-gray-600 mr-2">{item.title}</span>);
                            })

                            }
                          </h6>
                        }


                      </div>
                    </div>
                  </div>
                  <div class="rightSide mt-6 md:mt-0">
                    <div class="flex flex-col items-center md:items-end">
                      {listItem.status === "active" ? <a onClick={() => editStudentStatus(listItem.id, listItem.status)}
                        class="mt-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Désactiver
                      </a> : <a href="#" onClick={() => editStudentStatus(listItem.id, listItem.status)}
                        class="mt-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Activer
                      </a>}

                    </div>
                  </div>

                </div>

              </div>
            })
          }
          <Pagination
            count={studentsList.last_page}
            defaultPage={studentsList.from}
            page={studentsList.current_page}
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
