import React, { useEffect, useState } from 'react'
import axiosClient from '../../../axios-client'
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';





export default function ListSubject() {

  const [subjectsList, setSubjectsList] = useState([]);
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messageSubjectNotFound, setMessageSubjectNotFound] = useState(false);


  const fetchList = () => {
    if (page === null) {
      setPage(1);
    }
    axiosClient.get('admin/subject/list', { params: { page: page } }).then(({ data }) => {
      setIsLoading(false);
      setSubjectsList(data.data);
      setPage(data.data.current_page);
    }).catch(err => {
      setIsLoading(false);
      const response = err.response;
      if (response) {

        if (response.status === 404) {
          setMessageSubjectNotFound(true);
        }


      }
    })
  };
  useEffect(() => fetchList(), []);

  function handleChange(event, value) {
    const page = value;
    setIsLoading(true);
    setPage(page);
    axiosClient.get('admin/subject/list', { params: { page: page } }).then(({ data }) => {
      setIsLoading(false);
      setSubjectsList(data.data);
      setPage(data.data.current_page);
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


  const deleteSubject = (idSubject) => {
    setIsLoading(true);
    axiosClient.get(`admin/subject/delete/${idSubject}`).then(({ data }) => {
      fetchList();
    }).catch(err => {
      setIsLoading(false);

      const response = err.response;
      console.log(response);
      if (response) {

        if (response.status === 422) {
          console.log("error when removing item");
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
    axiosClient.post('admin/subject/listbyKeyword', payload).then(({ data }) => {
      setIsLoading(false);
      console.log(data.data);
      setSubjectsList(data.data);
      setPage(data.data.current_page);
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




  return (
    <div class="p-4">
      <div className="flex flex-row justify-end mb-4 ">
      <Link to="/admin/subject/create" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Ajouter Matière</Link>
      </div>
      <div className="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-black dark:text-white">Liste des Matiéres</h1>

        <div className="flex w-1/3">
          <form className="block w-full">
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input onChange={search} type="search" id="default-search" class="block w-full py-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Entrer la matière" />

            </div>
          </form>
        </div>
      </div>



      {!isLoading ? (messageSubjectNotFound) ? <div>Subjects Not Found</div> :
        <div>
          {
            subjectsList.data.map(listItem => {
              return <div>
                <div class="w-full mt-8 py-5 drop-shadow-lg flex flex-col md:flex-row md:justify-between px-4 bg-white mb-4">
                  <div class="leftSide">
                    <div class="flex items-center h-full">
                      <div class="flex flex-col ml-4">
                        <h3 class="text-l font-semibold dark:text-white">{listItem.title}</h3>
                        {
                          listItem.classe &&
                          (<h6 class="text-xs md:text-sm text-gray-600 font-semibold dark:text-white">
                            {listItem.classe.name}
                          </h6>)
                        }




                      </div>
                    </div>
                  </div>
                  <div class="rightSide mt-6 md:mt-0">
                    <div class="flex flex-row space-x-2 items-center md:items-end">

                   <a onClick={() => deleteSubject(listItem.id)}
                        class="mt-2 cursor-pointer text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Delete
                      </a>

                    </div>
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
